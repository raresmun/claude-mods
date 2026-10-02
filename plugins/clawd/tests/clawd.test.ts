import { expect, mock, test } from 'claude-code/testing'

import {
  BREAK_STYLES,
  CHEER_STYLES,
  draw,
  OOPS_STYLES,
  POPCORN_AFTER,
  ROWS,
  step,
  THINK_STYLES,
  WORK_STYLES,
  workFor,
  type Scene,
} from '../hooks/clawd'

const SESSION = { surface: 'terminal', isInteractive: true, cwd: '/work' } as const
const VIEWPORT = { columns: 120, rows: 40, isFullscreen: true } as const

const SPINNER = {
  plugin: 'clawd',
  surface: 'terminal',
  component: 'Spinner',
  requestId: 'main',
  viewport: VIEWPORT,
  props: { word: 'Sauteing', message: null, suffix: '…', mode: 'thinking' },
} as const

const closingLine = (requestId: string) =>
  ({
    plugin: 'clawd',
    surface: 'terminal',
    component: 'TurnDuration',
    requestId,
    viewport: VIEWPORT,
    props: { word: 'Baked', durationMs: 3000 },
  }) as const

/** Stands for the engine: its own thinking line and closing line, as plain text. */
const ENGINE = (_$: unknown, e: { component: string }) => ({
  type: 'Text' as const,
  children: [e.component === 'Spinner' ? '✻ Sauteing…' : '✻ Baked for 3s'],
})

const BLOCKS = [0x2580, 0x2584, 0x2588, 0x258c, 0x2590, 0x2596, 0x2597, 0x2598, 0x2599, 0x259a, 0x259b, 0x259c, 0x259d, 0x259e, 0x259f]
const HEADPHONES = [0x4c6fd0]
const printable = (point: number) => point === 0x20 || BLOCKS.includes(point)

/** A frame's cells, after checking it holds exactly columns × ROWS of them. */
function cellsOf(cells: string, columns: number): { point: number; fg: number; bg: number }[] {
  const bytes = atob(cells)
  expect(bytes.length).toBe(columns * ROWS * 12)
  const word = (at: number) =>
    (bytes.charCodeAt(at) | (bytes.charCodeAt(at + 1) << 8) | (bytes.charCodeAt(at + 2) << 16) | (bytes.charCodeAt(at + 3) << 24)) >>> 0
  const out: { point: number; fg: number; bg: number }[] = []
  for (let i = 0; i < bytes.length; i += 12) out.push({ point: word(i), fg: word(i + 4), bg: word(i + 8) })
  return out
}

const wearsHeadphones = (cells: string, columns: number) =>
  cellsOf(cells, columns).some(cell => HEADPHONES.includes(cell.fg) || HEADPHONES.includes(cell.bg))

test('Clawd stands beside the thinking line, which the engine still draws', async ($, on) => {
  on('ui.render', ENGINE)
  const ui = await $.ui.mount(SPINNER)
  const stage = await ui.find({ key: 'stage' })
  expect(stage?.type).toBe('Raster')
  expect(stage?.props.rows).toBe(ROWS)
  expect(stage?.props.columns).toBe(20)
  expect((await ui.find({ text: '✻ Sauteing…' })) !== undefined).toBe(true)
  const cells = cellsOf(String(stage?.props.cells), 20)
  expect(cells.every(cell => printable(cell.point))).toBe(true)
  expect(cells.some(cell => BLOCKS.includes(cell.point))).toBe(true)
})

test('a narrow terminal and the desktop get the line alone', async ($, on) => {
  on('ui.render', ENGINE)
  const narrow = await $.ui.mount({ ...SPINNER, viewport: { ...VIEWPORT, columns: 60 } })
  expect(await narrow.find({ key: 'stage' })).toBe(undefined)
  expect((await narrow.find({ text: '✻ Sauteing…' })) !== undefined).toBe(true)
  const desktop = await $.ui.mount({ ...SPINNER, surface: 'desktop' })
  expect(await desktop.find({ key: 'stage' })).toBe(undefined)
})

test("only the latest turn's closing line keeps Clawd", async ($, on) => {
  mock.clock(on)
  on('ui.render', ENGINE)
  on('ui.blit', () => ({ value: {} }))
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  await $.session.start(SESSION)
  const older = await $.ui.mount(closingLine('older'))
  expect(await older.find({ key: 'stage' })).toBe(undefined)

  await $.turn.start({ text: 'go', turnId: 't1' })
  await $.turn.complete({ answer: 'ok', durationMs: 3000, isAborted: false, turnId: 't1', reason: 'answer' })
  const latest = await $.ui.mount(closingLine('latest'))
  expect((await latest.find({ key: 'stage' })) !== undefined).toBe(true)

  await $.turn.start({ text: 'again', turnId: 't2' })
  expect(await latest.find({ key: 'stage' })).toBe(undefined)
})

test('a closing line drawn before the turn has ended still gets Clawd', async ($, on) => {
  mock.clock(on)
  on('ui.render', ENGINE)
  on('ui.blit', () => ({ value: {} }))
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  await $.session.start(SESSION)
  await $.turn.start({ text: 'go', turnId: 't1' })
  const line = await $.ui.mount(closingLine('early'))
  expect(await line.find({ key: 'stage' })).toBe(undefined)

  await $.turn.complete({ answer: 'ok', durationMs: 3000, isAborted: false, turnId: 't1', reason: 'answer' })
  expect((await line.find({ key: 'stage' })) !== undefined).toBe(true)
})

const MODES = [
  ['think', THINK_STYLES],
  ['work', WORK_STYLES],
  ['oops', OOPS_STYLES],
  ['cheer', CHEER_STYLES],
  ['break', BREAK_STYLES],
] as const

const POSES: Pick<Scene, 'mode' | 'style'>[] = [
  { mode: 'idle' },
  ...MODES.flatMap(([mode, styles]) => styles.map((style): Pick<Scene, 'mode' | 'style'> => ({ mode, style }))),
]

test('every pose draws printable cells of the right size', () => {
  for (const columns of [14, 20]) {
    for (const pose of POSES) {
      for (const frame of [0, 1, 2, 5, 9, 11, 15, 23]) {
        for (const x of [0, 20, columns]) {
          for (const headphones of [false, true]) {
            const scene: Scene = { ...pose, frame, x, dir: frame % 2 ? 1 : -1, headphones }
            expect(cellsOf(draw(scene, columns), columns).every(cell => printable(cell.point))).toBe(true)
          }
        }
      }
    }
  }
})

test('every act of a mode looks different from the others', () => {
  for (const [mode, styles] of MODES) {
    const looks = new Set<string>(
      styles.map((style: NonNullable<Scene['style']>) =>
        [0, 2, 5, 9, 12].map(frame => draw({ mode, style, frame, x: 8, dir: 1, headphones: false }, 20)).join(),
      ),
    )
    expect(looks.size).toBe(styles.length)
  }
})

test('each tool and command gets its own act', () => {
  const heads = () => 0.1
  const tails = () => 0.9
  const bash = (command: string) => workFor('Bash', { command })
  expect(bash('git push origin main')).toBe('rocket')
  expect(bash('git commit -m "fix"')).toBe('box')
  expect(bash('npm install react')).toBe('box')
  expect(bash('bun test')).toBe('clipboard')
  expect(bash('rm -rf dist')).toBe('trash')
  expect(bash('docker compose up')).toBe('whale')
  expect(bash('curl -s https://example.com')).toBe('globe')
  expect(bash('npm run build')).toBe('tinker')
  expect(bash('sleep 5')).toBe('snooze')
  expect(bash('ls -la')).toBe('run')
  expect(bash('git push --force origin main')).toBe('boom')
  expect(bash('sudo lsof -i :3000')).toBe('disguise')
  expect(bash('git log --oneline -5')).toBe('log')
  expect(bash('git blame src/app.ts')).toBe('blame')
  expect(bash('git pull --rebase')).toBe('tug')
  expect(bash('git merge main')).toBe('merge')
  expect(bash('git checkout -b feature')).toBe('branch')
  expect(bash('brew install jq')).toBe('brew')
  expect(bash('ping -c 1 example.com')).toBe('pingpong')
  expect(bash('top -l 1')).toBe('spintop')
  expect(bash('man grep')).toBe('manual')
  expect(bash('yes | npm init')).toBe('nod')
  expect(bash('tar -czf out.tgz dist')).toBe('squish')
  expect(bash('cat README.md')).toBe('cat')
  expect(bash('echo done')).toBe('echo')
  expect(bash('ls ~/Desktop')).toBe('run') // no top hiding in desktop, nor a cat in concatenate
  expect(bash('npm run concatenate')).toBe('run')
  expect(workFor('Edit', {}, heads)).toBe('type')
  expect(workFor('Edit', {}, tails)).toBe('pencil')
  expect(workFor('Read', {}, tails)).toBe('book')
  expect(workFor('Grep', {}, tails)).toBe('dig')
  expect(workFor('WebSearch', {})).toBe('globe')
  expect(workFor('TodoWrite', {})).toBe('clipboard')
  expect(workFor('Agent', {})).toBe('buddy')
  expect(workFor('mcp__tilsio__query', {}, tails)).toBe('tinker')
})

test('a command that runs and runs brings out the popcorn', () => {
  const running: Scene = { mode: 'work', style: 'run', frame: POPCORN_AFTER - 1, x: 4, dir: 1, headphones: false }
  expect(step(running, 20).style).toBe('popcorn')
  expect(step({ ...running, frame: 10 }, 20).style).toBe('run')
})

test('the headphones show only when Clawd wears them', () => {
  const scene: Scene = { mode: 'think', frame: 0, x: 10, dir: 1, headphones: false }
  expect(wearsHeadphones(draw(scene, 20), 20)).toBe(false)
  expect(wearsHeadphones(draw({ ...scene, headphones: true }, 20), 20)).toBe(true)
})

test('tool calls go through untouched, failures included', async ($, on) => {
  mock.clock(on)
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('tool.call', (_$, e) =>
    String(e.tool) === 'Bash' ? { result: { stdout: 'hi' }, text: 'hi' } : { result: null, text: 'nope', isError: true },
  )
  await $.session.start(SESSION)
  await $.turn.start({ text: 'go', turnId: 't1' })
  expect((await $.tool.call({ tool: 'Bash', command: 'echo hi' })).text).toBe('hi')
  expect((await $.tool.call({ tool: 'Read', file_path: '/work/ünï.ts' })).text).toBe('nope')
})

test('Clawd animates through a turn, then stands still with no timer left', async ($, on) => {
  const clock = mock.clock(on)
  let blits = 0
  let last = ''
  on('ui.blit', (_$, e) => {
    blits += 1
    if ('cells' in e) last = e.cells
    return { value: {} }
  })
  on('ui.render', ENGINE)
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  await $.session.start(SESSION)

  await $.turn.start({ text: 'go', turnId: 't1' })
  await $.ui.mount(SPINNER)
  await clock.advance(1000)
  expect(blits >= 10).toBe(true)
  expect(wearsHeadphones(last, 20)).toBe(false) // a short turn: no headphones yet

  await $.turn.complete({ answer: 'ok', durationMs: 1000, isAborted: false, turnId: 't1', reason: 'answer' })
  await $.ui.mount(closingLine('line-1'))
  await clock.advance(2000) // the jump plays out beside the closing line
  const settled = blits
  await clock.advance(10_000)
  expect(blits).toBe(settled)
})
