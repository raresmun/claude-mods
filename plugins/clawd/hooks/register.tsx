import type { EngineInterface, Register, RenderElement, RenderInputOf } from 'claude-code'

import {
  BREAK_STYLES,
  CHEER_STYLES,
  draw,
  lengthOf,
  MIN_COLUMNS,
  OOPS_STYLES,
  PLAY_STYLES,
  ROWS,
  step,
  THINK_STYLES,
  workFor,
  type Mode,
  type Scene,
  type Style,
} from './clawd'

// Milliseconds between frames, by the Motion setting.
const TICK_MS: Record<string, number> = { calm: 160, normal: 100, lively: 70 }
const LONG_TURN_MS = 60_000
// A long turn's thinking takes a break (coffee, a nap, a song...) this far in, then every so often after.
const BREAK_AFTER_MS = 30_000
const BREAK_GAP_MS = 25_000
// Waiting on subagents, a new game every so often, and every few seconds a look at which of them still run.
const GAME_TICKS = 200
const ROLL_CALL_TICKS = 30
const STAGE_COLUMNS = 20
// Room kept for the engine's own line (the thinking line, the turn's closing line) beside Clawd.
const LINE_COLUMNS = 52

const pick = <T,>(choices: readonly T[]): T | undefined => choices[Math.floor(Math.random() * choices.length)]

/** A fresh act for a mode that has a choice of them; for a game, another than the one just played. */
const styleFor = (mode: Mode, current?: Style): Style | undefined =>
  mode === 'think'
    ? pick(THINK_STYLES)
    : mode === 'oops'
      ? pick(OOPS_STYLES)
      : mode === 'cheer'
        ? pick(CHEER_STYLES)
        : mode === 'break'
          ? pick(BREAK_STYLES)
          : mode === 'play'
            ? pick(PLAY_STYLES.filter(game => game !== current))
            : undefined

/** The calls the animation makes, each spelled on a hook's `$` so the engine reads them off the source. */
function bind($: EngineInterface) {
  return {
    blit: (requestId: string, cells: string) => void $.ui.blit({ requestId, key: 'stage', cells }).catch(() => undefined),
    every: (ms: number, fn: () => void) => $.clock.every(ms, fn),
    redraw: () => $.ui.invalidate('ui.render'),
    /** Whether Claude Code's own Reduce motion setting is on, as its /config row says. */
    isMotionReduced: async () => (await $.config.list()).some(row => row.key === 'prefersReducedMotion' && row.value === true),
    /** The ids of the session's subagents still running. */
    subagents: async () => (await $.agent.list()).filter(agent => agent.status === 'running').map(agent => agent.id),
  }
}

/** Clawd's stage beside the engine's own line, which it draws as before. */
function besideLine(
  $: EngineInterface,
  e: RenderInputOf<'Spinner', 'terminal'> | RenderInputOf<'TurnDuration', 'terminal'>,
  line: RenderElement,
  columns: number,
  cells: string,
): RenderElement {
  const { Box, Raster } = $.ui.resolve(e)
  return (
    <Box flexDirection="row" alignItems="center">
      {line}
      <Box marginLeft={2} flexShrink={0}>
        <Raster key="stage" columns={columns} rows={ROWS} cells={cells} />
      </Box>
    </Box>
  )
}

export const register: Register = (on, options) => {
  // The settings in /config; a change there reloads the module with the new values.
  const motion = typeof options.motion === 'string' ? options.motion : 'normal'
  const puns = options.puns !== false
  const breaks = options.breaks !== false
  const stays = options.idle !== 'hide'
  let isStill = motion === 'still'

  let scene: Scene = { mode: 'idle', frame: 0, x: 2, dir: 1, headphones: false }
  let engine: ReturnType<typeof bind> | undefined
  // The line Clawd stands beside now: the turn's thinking line, then the line that closes it.
  let stage: { requestId: string; columns: number } | undefined
  let spinnerId: string | undefined // the main thread's thinking line: the first one a turn draws
  let lineId: string | undefined // the latest turn's closing line
  let earlyLine: string | undefined // a closing line drawn before its turn's end was heard
  let isLineDue = false // a turn has ended and its closing line is yet to be drawn
  const seenLines = new Set<string>()
  let timer: { cancel: () => void } | undefined
  let startedAt: number | undefined
  let endedAt: number | undefined
  let nextBreakAt: number | undefined
  let failures = 0 // tool calls failed in a row; the second one flips the table
  const running = new Map<string | symbol, Style>()
  const gang = new Set<string>() // the subagents running, a buddy each

  // The headphones go on once a turn has run for a minute, and come off when it ends.
  const dressed = (): Scene => ({
    ...scene,
    headphones: startedAt !== undefined && endedAt === undefined && Date.now() - startedAt >= LONG_TURN_MS,
    buddies: gang.size,
  })
  const paint = () => {
    if (stage && engine) engine.blit(stage.requestId, draw(dressed(), stage.columns))
  }
  // Idle runs no timer: one last still frame, and a redraw so a remounted line shows it too.
  const settle = () => {
    timer?.cancel()
    timer = undefined
    paint()
    engine?.redraw()
  }
  // A turn over with subagents still running, he plays with them rather than standing idle.
  const isPlaytime = () => stays && endedAt !== undefined && gang.size > 0
  const rest = (): void => (isPlaytime() ? become('play') : settle())
  const tick = () => {
    scene = step(scene, stage?.columns ?? STAGE_COLUMNS)
    if (scene.mode === 'idle') return rest()
    if (scene.mode === 'think' && nextBreakAt !== undefined && Date.now() >= nextBreakAt) {
      nextBreakAt = Date.now() + BREAK_GAP_MS + Math.random() * BREAK_GAP_MS
      return become('break', undefined, 'think')
    }
    if (scene.mode === 'play' && scene.frame % ROLL_CALL_TICKS === 0) void rollCall()
    if (scene.mode === 'play' && scene.frame >= GAME_TICKS) return become('play')
    paint()
  }
  // An act with no style named picks one of its mode's at random, afresh every time.
  const become = (mode: Mode, style?: Style, then?: 'think' | 'idle'): void => {
    // A game starts from the stage's left edge, and he stays there once it is over.
    const place = mode === 'play' ? { x: 0, dir: 1 as const } : {}
    scene = { ...scene, ...place, mode, style: style ?? styleFor(mode, scene.style), frame: 0, then }
    // Held still, a timed act never plays out by ticks: it goes straight to what follows.
    if (isStill && lengthOf(scene) !== undefined) {
      const after = then ?? 'idle'
      scene = { ...scene, mode: after, style: after === 'think' ? 'bubble' : undefined, then: undefined }
    }
    if (scene.mode === 'idle') return rest()
    if (!isStill && !timer && engine) timer = engine.every(TICK_MS[motion] ?? 100, tick)
    paint()
  }
  // A buddy has come or gone: the first to turn up while Claude waits starts a game, the last to go ends it.
  const regroup = () => {
    if (scene.mode === 'idle' && isPlaytime()) become('play')
    else if (scene.mode === 'play' && gang.size === 0) become('idle')
    else paint()
  }
  // Which subagents still run, by the engine's own list: it also catches one stopped before it could finish.
  const rollCall = async () => {
    try {
      const ids = await engine?.subagents()
      if (!ids) return
      gang.clear()
      for (const id of ids) gang.add(id)
      regroup()
    } catch {}
  }

  /** Seats Clawd beside this line, when the terminal has room for both. */
  const seat = (e: { requestId: string; viewport?: { columns: number } }) => {
    const columns = Math.min(STAGE_COLUMNS, (e.viewport?.columns ?? 0) - LINE_COLUMNS)
    stage = columns >= MIN_COLUMNS ? { requestId: e.requestId, columns } : undefined
    return stage
  }

  on('session.start', ($, e, next) => {
    engine = bind($)
    return next(e)
  })

  on('turn.start', async ($, e, next) => {
    engine ??= bind($)
    try {
      isStill = motion === 'still' || (await engine.isMotionReduced())
    } catch {}
    startedAt = Date.now()
    endedAt = undefined
    nextBreakAt = breaks ? startedAt + BREAK_AFTER_MS : undefined
    failures = 0
    running.clear()
    spinnerId = undefined
    lineId = undefined // the last turn's closing line lets go of Clawd
    earlyLine = undefined
    isLineDue = false
    engine.redraw()
    become('think')
    return next(e)
  })

  // Clawd only watches: the call goes on untouched, and nothing after it can throw.
  on('tool.call', async ($, e, next) => {
    if (e.agentId !== undefined) return next(e)
    const id = e.tool_use_id ?? Symbol('call')
    try {
      const style = workFor(String(e.tool), e as Record<string, unknown>, Math.random, { puns })
      running.set(id, style)
      become('work', style)
    } catch {}
    const result = await next(e)
    try {
      running.delete(id)
      const latest = [...running.values()].pop()
      const failed = result.deny !== undefined || result.isError === true
      failures = failed ? failures + 1 : 0
      if (latest) become('work', latest)
      else if (failed) become('oops', failures >= 2 ? 'tableflip' : undefined, 'think')
      else become('think')
    } catch {}
    return result
  })

  on('turn.complete', ($, e, next) => {
    if (e.agentId !== undefined) {
      // A subagent is done: its buddy leaves the game.
      try {
        if (gang.delete(e.agentId)) regroup()
      } catch {}
      return next(e)
    }
    endedAt = Date.now()
    nextBreakAt = undefined
    running.clear()
    // The closing line may be drawn before this event or after it.
    if (earlyLine !== undefined) lineId = earlyLine
    else isLineDue = true
    earlyLine = undefined
    // Set to hide, he leaves with the thinking line: no cheer nobody would see.
    if (!stays || e.reason === 'aborted') become('idle')
    else if (e.reason === 'answer') become('cheer', undefined, 'idle')
    else become('oops', undefined, 'idle')
    void rollCall() // the subagents still out, to play with once the cheer is over
    engine?.redraw()
    return next(e)
  })

  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    const line = await next(e)
    if (e.surface !== 'terminal') return line
    spinnerId ??= e.requestId
    const seated = e.requestId === spinnerId ? seat(e) : undefined
    return seated ? besideLine($, e, line, seated.columns, draw(dressed(), seated.columns)) : line
  })

  on('ui.render', { component: 'TurnDuration' }, async ($, e, next) => {
    const line = await next(e)
    if (e.surface !== 'terminal' || !stays) return line
    if (!seenLines.has(e.requestId)) {
      if (isLineDue) {
        lineId = e.requestId
        isLineDue = false
      } else if (startedAt !== undefined && endedAt === undefined) {
        earlyLine = e.requestId
      }
    }
    seenLines.add(e.requestId)
    const seated = e.requestId === lineId ? seat(e) : undefined
    return seated ? besideLine($, e, line, seated.columns, draw(dressed(), seated.columns)) : line
  })
}
