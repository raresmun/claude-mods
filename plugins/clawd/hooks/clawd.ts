// Clawd, the Claude mascot, as pixel art in quadrant cells, the glyphs the Claude
// Code logo is drawn in: each cell is 2×2 pixels, so a stage of `columns` × ROWS
// cells is 2 * columns pixels wide and 2 * ROWS tall.

export const THINK_STYLES = [
  'bubble',
  'pace',
  'look',
  'scratch',
  'tap',
  'bulb',
  'juggle',
  'duck',
  'peekaboo',
  'hiccup',
  'sneeze',
] as const
export const WORK_STYLES = [
  'walk',
  'run',
  'type',
  'pencil',
  'scan',
  'book',
  'magnify',
  'dig',
  'globe',
  'clipboard',
  'buddy',
  'tinker',
  'rocket',
  'box',
  'trash',
  'whale',
  'snooze',
  'popcorn',
  'cat',
  'log',
  'brew',
  'branch',
  'pingpong',
  'spintop',
  'manual',
  'disguise',
  'boom',
  'blame',
  'echo',
  'nod',
  'squish',
  'tug',
  'merge',
] as const
export const OOPS_STYLES = ['flash', 'sweat', 'facepalm', 'dizzy', 'tableflip', 'raincloud', 'faceplant'] as const
export const CHEER_STYLES = [
  'hop',
  'wave',
  'spin',
  'dance',
  'flex',
  'heart',
  'confetti',
  'bow',
  'fireworks',
  'trophy',
  'shades',
  'disco',
  'moonwalk',
] as const
export const BREAK_STYLES = [
  'coffee',
  'yawn',
  'stretch',
  'nap',
  'snack',
  'music',
  'phone',
  'plant',
  'ball',
  'fishing',
] as const
export const PLAY_STYLES = ['catch', 'stadium', 'conga', 'highfive', 'pyramid'] as const

export type WorkStyle = (typeof WORK_STYLES)[number]
export type Style =
  | (typeof THINK_STYLES)[number]
  | WorkStyle
  | (typeof OOPS_STYLES)[number]
  | (typeof CHEER_STYLES)[number]
  | (typeof BREAK_STYLES)[number]
  | (typeof PLAY_STYLES)[number]
export type Mode = 'idle' | 'think' | 'work' | 'oops' | 'cheer' | 'break' | 'play'

export type Scene = {
  mode: Mode
  /** Which of the mode's acts plays. */
  style?: Style
  /** Ticks since the act began. */
  frame: number
  /** Clawd's left edge, in pixels. */
  x: number
  dir: 1 | -1
  /** Worn once a turn has run long. */
  headphones: boolean
  /** Subagents running, each a buddy to play with while Claude waits on them. */
  buddies?: number
  /** Where a timed act (an error, a cheer, a break) goes once it has played. */
  then?: 'think' | 'idle'
}

export const ROWS = 2
export const MIN_COLUMNS = 14
/** Ticks a plain command runs before Clawd fetches popcorn to watch it. */
export const POPCORN_AFTER = 80

const WIDTH = 10
const STAND = [1, 3, 6, 8]
const STRIDE = [2, 4, 5, 7]
const TAP = [1, 3, 6]
// The offset at which `at` puts a prop just past Clawd's arm: the acts lay their props out from it.
const REACH = 12

const NONE = -1
const DEFAULT = 0x01000000
const ORANGE = 0xd97757
const RED = 0xe5484d
const EYE = 0x1a1a1a
const WHITE = 0xffffff
const CUP = 0x4c6fd0
const CLOUD = 0xe8e8e8
const METAL = 0x8a8f98
const GLOW = 0x7ac7ff
const DUST = 0x6e6e6e
const SPARK = 0xf5c542
const MUTED = 0x808080
const MUG = 0xf2efe9
const STEAM = 0xbdbdbd
const YELLOW = 0xffd84d
const BULB = 0x9a9a9a
const PENCIL = 0xf2c14e
const LEAD = 0x3a3a3a
const INK = 0x6e8bd9
const PAGE = 0xf5f1e6
const SPINE = 0xb08350
const COVER = 0x6b7078
const GLASS = 0x9ad1ff
const HANDLE = 0x7a5a3a
const SHOVEL = 0xb0b4ba
const DIRT = 0x7a5232
const SEA = 0x3f7fd9
const LAND = 0x5cc46a
const CHECK = 0x46c35a
const BOX = 0xc89a5b
const TAPE = 0x8a6a3a
const ROCKET = 0xeeeeee
const FLAME = 0xff8c2a
const WHALE = 0x3f7fd9
const SPOUT = 0x9ad1ff
const SWEAT = 0x7ac7ff
const HEART = 0xff5a7a
const TROPHY = 0xf5c542
const ZZZ = 0xcfcfcf
const COOKIE = 0xc8955a
const NOTE = 0xcfcfcf
const PHONE = 0x2a2a2a
const SCREEN = 0x7ac7ff
const POT = 0xb5653a
const PLANT = 0x5cc46a
const WATER = 0x7ac7ff
const BALL = 0xe5484d
const KERNEL = 0xfff3c4
const CAT = 0x6b7078
const LOG = 0x8b5a2b
const LOG_DARK = 0x6b4220
const RING = 0xd2a46c
const COFFEE = 0x6b4423
const SHADES = 0x111111
const STACHE = 0x3a2a1a
const SMOKE = 0x9a9a9a
const ROPE = 0xd2b48c
const ROPE_DARK = 0xa8865c
const BLUE = 0x4c9ae5
const TABLE = 0x8b5a2b
const RAINCLOUD = 0x8a8f98
const RAIN = 0x7ac7ff
const FISH = 0xb8c4cc
const BOOT = 0x5a3a1a
const LINE = 0xcfcfcf
const BALLS = [0xe5484d, 0x4c9ae5, 0x5cc46a]
const CONFETTI = [0xe5484d, 0x4c9ae5, 0x5cc46a, 0xf5c542, 0xff5a7a, 0x7ac7ff]
const FIREWORK = [0xf5c542, 0xff5a7a, 0x7ac7ff, 0x5cc46a]
const RAINBOW = [0xe5484d, 0xff8c2a, 0xf5c542, 0x5cc46a, 0x4c9ae5, 0x9b6bd9]
const BOOM = [0xff5a2a, 0xffd84d, 0xff8c2a]
const FADE = [0xe8e8e8, 0xa8a8a8, 0x6e6e6e]
const TEAM = [0x5aa0f0, 0x62c97a, 0xa77be0, 0xf06aa0, 0x56c8c8] // a colour for each buddy's seat

// The glyph for each set of lit quarters: top-left 1, top-right 2, bottom-left 4, bottom-right 8.
const QUADRANTS = [
  0x20, 0x2598, 0x259d, 0x2580, 0x2596, 0x258c, 0x259e, 0x259b, 0x2597, 0x259a, 0x2590, 0x259c, 0x2584, 0x2599, 0x259f,
  0x2588,
]

/** How Clawd holds himself in one frame. */
type Pose = {
  shift: number // pixels sideways
  lift: number // pixels up; below zero he crouches
  look: number // where his eyes turn: -1 left, 0 ahead, 1 right
  eyesUp: boolean
  eyesShut: boolean
  near: number // the arm on the props' side: -1 raised, 0 at rest, 1 lowered
  far: number // the other arm
  legs: readonly number[]
  body: number
  mouth: boolean
  cups: boolean // ear cups on, however long the turn
  squeeze: number // pixels pressed in from each side
}

type Cue = {
  frame: number
  side: 1 | -1
  dir: 1 | -1
  buddies: number // seated beside him for a game, as many as the stage has room for
  width: number // the stage's, in pixels
}

type Stage = Cue & {
  /** A prop's pixel, `offset` pixels out from Clawd's left edge on the side with room. */
  at: (offset: number, y: number, color: number) => void
  /** A pixel anywhere on the stage. */
  put: (x: number, y: number, color: number) => void
  /** Clawd's left edge this frame. */
  x: number
}

/** One thing Clawd does: his pose, the props around him, how long it plays, how fast he moves. */
type Act = {
  length?: number
  speed?: number // pixels a tick; under 1, one pixel every other tick
  pose?: (cue: Cue) => Partial<Pose>
  props?: (stage: Stage) => void
}

const REST: Pose = {
  shift: 0,
  lift: 0,
  look: 0,
  eyesUp: false,
  eyesShut: false,
  near: 0,
  far: 0,
  legs: STAND,
  body: ORANGE,
  mouth: false,
  cups: false,
  squeeze: 0,
}

const cycle = <T>(items: readonly T[], i: number): T => items[((i % items.length) + items.length) % items.length] as T

const walking = (speed: number): Act => ({
  speed,
  pose: ({ frame, dir }) => ({ look: dir, legs: (speed < 1 ? Math.floor(frame / 2) : frame) % 2 ? STRIDE : STAND }),
})

/** Zs drifting up from a sleeping head. */
const zzz = ({ at, frame }: Stage) => {
  for (const phase of [0, 6]) {
    const t = Math.floor(((frame + phase) % 12) / 3)
    at(12 + t, 3 - t, ZZZ)
  }
}

const laptop = ({ at, frame }: Stage) => {
  for (let o = 13; o <= 18; o++) at(o, 3, METAL)
  for (const y of [1, 2]) at(18, y, METAL)
  if (frame % 4 < 2) at(17, 1, GLOW)
}

/** A cat, its ears at `o`; walking, or sat with its tail swishing. */
const cat = ({ at, frame }: Stage, o: number, isWalking: boolean) => {
  for (const dx of [0, 2]) at(o + dx, 1, CAT)
  for (let dx = 0; dx <= 5; dx++) at(o + dx, 2, CAT)
  for (const dx of isWalking && frame % 2 ? [1, 4] : [0, 2, 5]) at(o + dx, 3, CAT)
  at(o + 6, frame % 4 < 2 ? 1 : 2, CAT)
}

// A game is played from the stage's left edge, a buddy for each subagent seated in a row beside Clawd.
const SEAT = WIDTH + 2 // the first buddy's left edge, clear of Clawd's hand
const PITCH = 5 // a buddy is 4 pixels wide, with a pixel between neighbours
const PASS = 6 // ticks a throw takes, hand to hand

const seat = (i: number) => SEAT + PITCH * i

/** How many buddies a stage this many pixels wide has seats for. */
const seatsFor = (width: number) => Math.min(TEAM.length, Math.floor((width - SEAT - 4) / PITCH) + 1)

/** Step `k` of `steps` on the way from `from` to `to`, to the nearest pixel. */
const along = (from: number, to: number, k: number, steps: number) => Math.round(from + ((to - from) * k) / steps)

/**
 * A subagent as a mini Clawd in its seat's colour: its body on row `y`, its legs below. No eye:
 * mid-hop, its cell would show the eye's colour over half the body.
 */
const mini = (put: Stage['put'], x: number, y: number, i: number, isStepping = false) => {
  const color = cycle(TEAM, i)
  for (let dx = 0; dx < 4; dx++) put(x + dx, y, color)
  for (const dx of isStepping ? [1, 2] : [0, 3]) put(x + dx, y + 1, color)
}

/** The buddies in their seats, all but the one who is up. */
const seated = (put: Stage['put'], buddies: number, away?: number) => {
  for (let i = 0; i < buddies; i++) if (i !== away) mini(put, seat(i), 2, i)
}

/** A throw down the line of players, Clawd first, then back up it: who throws, who catches, ticks into the throw. */
const passOf = (frame: number, players: number) => {
  const throws = 2 * Math.max(1, players - 1)
  const k = Math.floor(frame / PASS) % throws
  const isDown = k < throws / 2
  const from = isDown ? k : throws - k
  return { from, to: isDown ? from + 1 : from - 1, t: frame % PASS }
}

/** The player the wave lifts now: down the line two ticks apiece, back up it, then a breather; -1 for nobody. */
const crestOf = (frame: number, players: number) => {
  const lap = 2 * players
  const t = frame % (2 * lap + 6)
  return t < lap ? Math.floor(t / 2) : t < 2 * lap ? players - 1 - Math.floor((t - lap) / 2) : -1
}

/** Clawd's left edge at the head of a conga line that dances across the stage and comes round again. */
const congaX = (frame: number, buddies: number, width: number) =>
  ((Math.floor(frame / 2) + WIDTH) % (width + WIDTH + PITCH * buddies)) - WIDTH

/** Who runs up for a high five, where they are, and whether hands meet now: each in turn, from the nearest seat. */
const highFiveOf = (frame: number, buddies: number) => {
  const runs = Array.from({ length: buddies }, (_, i) => seat(i) - WIDTH - 1) // from the seat to Clawd's hand
  let t = frame % Math.max(1, runs.reduce((sum, run) => sum + 2 * run + 6, 0))
  for (const [who, run] of runs.entries()) {
    if (t < 2 * run + 6) {
      const x = t < run ? seat(who) - 1 - t : t < run + 4 ? WIDTH + 1 : Math.min(seat(who), WIDTH - 2 + t - run)
      return { who, x, isSlap: t === run + 1 || t === run + 2 }
    }
    t -= 2 * run + 6
  }
  return undefined
}

/** The base in their seats, the rest climbing onto their shoulders in turn; a lone buddy goes up on Clawd's hand. */
const pyramidOf = (frame: number, buddies: number) => {
  const tops = buddies === 1 ? 1 : Math.floor(buddies / 2)
  const base = buddies - tops
  const built = 6 * tops
  const t = frame % (built + 34)
  const spots = Array.from({ length: buddies }, (_, i) => {
    if (i < base) return { x: seat(i), y: 2 }
    const j = i - base
    const top = base === 0 ? WIDTH : tops < base ? seat(j) + 2 : seat(j)
    if (t < built) {
      const k = t - 6 * j
      return k < 0 ? { x: seat(i), y: 2 } : k < 6 ? { x: along(seat(i), top, k, 5), y: k === 0 ? 1 : 0 } : { x: top, y: 0 }
    }
    if (t < built + 20) return { x: top + (t < built + 10 ? 0 : Math.floor(t / 2) % 2 ? 1 : -1), y: 0 } // ta-da, then a wobble
    if (t < built + 26) {
      const k = t - built - 20
      return { x: along(top, seat(i), k, 5), y: k < 2 ? 0 : k < 4 ? 1 : 2 } // and down they tumble
    }
    return { x: seat(i), y: 2 }
  })
  return { spots, isUp: t >= built && t < built + 20, isFalling: t >= built + 20 && t < built + 26 }
}

const ACTS: Record<string, Act> = {
  // Thinking.
  'think:bubble': {
    pose: ({ frame }) => ({ eyesUp: true, look: Math.floor(frame / 8) % 2 ? 1 : -1 }),
    props: ({ at, frame }) => {
      const phase = Math.floor(frame / 3) % 5
      at(13, 2, CLOUD)
      if (phase >= 1) for (const o of [15, 16]) at(o, 1, CLOUD)
      if (phase >= 2) {
        for (let o = 18; o <= 23; o++) {
          at(o, 0, CLOUD)
          at(o, 1, o % 2 ? MUTED : CLOUD)
        }
      }
    },
  },
  'think:pace': walking(0.5),
  'think:look': {
    pose: ({ frame }) => {
      const glance = Math.floor(frame / 6) % 4
      return { look: cycle([-1, -1, 1, 1], glance), eyesUp: glance === 1 || glance === 2 }
    },
  },
  'think:scratch': { pose: ({ frame }) => ({ eyesUp: true, near: frame % 4 < 2 ? -1 : 0 }) },
  'think:tap': { pose: ({ frame }) => ({ legs: frame % 4 < 2 ? STAND : TAP, look: Math.floor(frame / 10) % 2 ? 1 : -1 }) },
  'think:bulb': {
    pose: ({ side }) => ({ eyesUp: true, look: side }),
    props: ({ at, frame }) => {
      const isLit = frame % 20 >= 14
      for (const o of [13, 14]) {
        at(o, 0, isLit ? YELLOW : BULB)
        at(o, 1, isLit ? YELLOW : BULB)
        at(o, 2, METAL)
      }
      if (isLit) {
        at(16, 0, SPARK)
        at(16, 2, SPARK)
      }
    },
  },
  'think:juggle': {
    pose: ({ frame }) => ({ eyesUp: true, near: frame % 2 ? -1 : 0, far: frame % 2 ? 0 : -1 }),
    props: ({ at, frame }) => {
      const arc = [
        [12, 2],
        [13, 1],
        [14, 0],
        [15, 0],
        [16, 1],
        [17, 2],
      ] as const
      BALLS.forEach((color, i) => {
        const [o, y] = cycle(arc, frame + i * 2)
        at(o, y, color)
      })
    },
  },
  // Rubber duck debugging: he talks it through, the duck quacks back.
  'think:duck': {
    pose: ({ frame, side }) => ({ look: side, mouth: frame % 4 < 2 }),
    props: ({ at, frame }) => {
      for (const o of [14, 15, 16]) at(o, 3, YELLOW)
      for (const o of [14, 15]) at(o, 2, YELLOW)
      at(14, 1, YELLOW)
      at(13, 1, FLAME)
      if (frame % 8 >= 6) at(13, 2, FLAME)
    },
  },
  'think:peekaboo': {
    pose: ({ frame }) => {
      const t = frame % 20
      if (t < 10) return { lift: -2, eyesUp: true, look: cycle([-1, 1], Math.floor(t / 3)) } // ducked, peeking out
      if (t < 14) return { near: -1, far: -1, mouth: true } // boo!
      return {}
    },
  },
  'think:hiccup': {
    pose: ({ frame }) => ({ lift: frame % 7 === 0 ? 1 : 0, eyesShut: frame % 7 === 0 }),
    props: ({ at, frame }) => {
      if (frame % 7 <= 1) at(12, 0, SPARK)
    },
  },
  'think:sneeze': {
    pose: ({ frame }) => {
      const t = frame % 16
      if (t < 6) return { eyesShut: t >= 3, lift: t >= 4 ? 1 : 0 } // ah... ah...
      if (t < 9) return { shift: -1, eyesShut: true, mouth: true } // choo!
      return {}
    },
    props: ({ at, frame }) => {
      const t = frame % 16
      if (t >= 6 && t < 10) {
        for (const [o, y] of [
          [12, 1],
          [13, 2],
          [14, 1],
          [13, 0],
        ] as const) {
          at(o + t - 6, y, CLOUD)
        }
      }
    },
  },

  // Working, by what the tool does.
  'work:walk': {
    speed: 1,
    pose: ({ frame, dir }) =>
      frame % 60 >= 50
        ? { lift: -1, eyesShut: true, near: -1, far: -1 } // slipped!
        : { look: dir, legs: frame % 2 ? STRIDE : STAND },
    props: ({ put, x, frame, dir }) => {
      const t = frame % 60
      if (t >= 44 && t < 50) put(dir > 0 ? x + WIDTH + 1 : x - 2, 3, YELLOW) // a banana peel ahead
      if (t >= 50 && t < 53) put(dir > 0 ? x + WIDTH : x - 1, 2 - (t - 50), YELLOW) // and off it flies
    },
  },
  'work:run': {
    ...walking(2),
    props: ({ put, x, frame, dir }) => {
      const back = dir > 0 ? x - 2 : x + WIDTH + 1
      put(back, 3, DUST)
      if (frame % 2) put(back - 2 * dir, 2, DUST)
    },
  },
  'work:type': {
    // Now and then a cat walks onto the keyboard, and that is the end of typing for a while.
    pose: ({ frame, side }) =>
      frame % 80 >= 56 ? { look: side, near: -1, far: -1 } : { look: side, near: frame % 2, far: (frame + 1) % 2 },
    props: stage => {
      laptop(stage)
      const t = stage.frame % 80
      if (t >= 44) cat(stage, Math.max(14, 24 - (t - 44)), t < 54)
    },
  },
  'work:pencil': {
    pose: ({ frame, side }) => ({ look: side, near: frame % 2 }),
    props: ({ at, frame }) => {
      const wiggle = frame % 2
      at(14 + wiggle, 0, PENCIL)
      at(13 + wiggle, 1, PENCIL)
      at(12 + wiggle, 2, LEAD)
      for (let o = 12; o < 12 + (Math.floor(frame / 2) % 9); o++) at(o, 3, INK)
    },
  },
  'work:scan': { pose: ({ frame }) => ({ look: cycle([-1, 0, 1, 0], Math.floor(frame / 4)) }) },
  'work:book': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      for (const o of [12, 13, 15, 16]) for (const y of [1, 2]) at(o, y, PAGE)
      for (const y of [1, 2]) at(14, y, SPINE)
      if (frame % 8 >= 6) at(15, 0, PAGE) // a page turning
    },
  },
  'work:magnify': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      const o = 13 + (Math.floor(frame / 3) % 4)
      for (const dx of [0, 1]) for (const y of [0, 1]) at(o + dx, y, GLASS)
      at(o + 2, 2, HANDLE)
      at(o + 3, 3, HANDLE)
    },
  },
  'work:dig': {
    pose: ({ frame, side }) => ({ look: side, near: frame % 4 < 2 ? -1 : 0 }),
    props: ({ at, frame }) => {
      const up = frame % 4 < 2 ? 1 : 0
      at(12, 1 - up, HANDLE)
      at(13, 2 - up, HANDLE)
      for (const o of [14, 15]) at(o, 3 - up, SHOVEL)
      for (let o = 17; o < 17 + (Math.floor(frame / 6) % 5); o++) at(o, 3, DIRT)
      if (up) at(16, 1, DIRT) // a clod in the air
    },
  },
  'work:globe': {
    pose: ({ side }) => ({ look: side, eyesUp: true }),
    props: ({ at, frame }) => {
      const turn = Math.floor(frame / 3)
      for (let o = 13; o <= 15; o++) for (let y = 0; y <= 2; y++) at(o, y, (o + y + turn) % 3 === 0 ? LAND : SEA)
      at(14, 3, METAL)
    },
  },
  'work:clipboard': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      for (let o = 12; o <= 14; o++) for (let y = 1; y <= 3; y++) at(o, y, PAGE)
      at(13, 0, METAL)
      for (let i = 0; i < Math.floor(frame / 5) % 4; i++) at(13, 1 + i, CHECK)
    },
  },
  'work:buddy': {
    pose: ({ frame }) => ({ near: frame % 6 < 3 ? -1 : 0 }),
    props: ({ at, frame }) => {
      const o = 13 + (Math.floor(frame / 2) % 12) // a little Clawd running off on an errand
      for (let dx = 0; dx < 4; dx++) at(o + dx, 2, dx === 2 ? EYE : ORANGE)
      for (const dx of frame % 2 ? [0, 3] : [1, 2]) at(o + dx, 3, ORANGE)
    },
  },
  'work:tinker': {
    pose: ({ frame, side }) => ({ look: side, near: frame % 6 < 3 ? -1 : 1 }),
    props: ({ at, frame }) => {
      if (frame % 6 < 3) {
        for (const o of [13, 14]) at(o, 0, METAL)
        at(13, 1, HANDLE)
      } else {
        for (const o of [13, 14]) at(o, 2, METAL)
        at(12, 2, HANDLE)
        at(15, 1, SPARK)
        at(16, 2, SPARK)
      }
      for (let o = 12; o <= 16; o++) at(o, 3, METAL) // the anvil
    },
  },
  'work:rocket': {
    pose: ({ frame, side }) => {
      const isFlying = frame % 30 >= 10
      return { look: side, eyesUp: isFlying, near: isFlying ? -1 : 0, far: isFlying ? -1 : 0 }
    },
    props: ({ at, frame }) => {
      const t = frame % 30
      const y = 1 - Math.max(0, t - 9) // the nose's row: on the pad, then climbing out of sight
      at(15, y, ROCKET)
      for (const o of [14, 15, 16]) at(o, y + 1, ROCKET)
      at(14, y + 2, ROCKET)
      at(16, y + 2, ROCKET)
      if (t >= 7) at(15, y + 2, frame % 2 ? FLAME : YELLOW)
    },
  },
  'work:box': {
    ...walking(0.5),
    props: ({ at }) => {
      for (let o = 12; o <= 14; o++) for (const y of [0, 1]) at(o, y, BOX)
      at(13, 0, TAPE)
    },
  },
  'work:trash': {
    pose: ({ frame, side }) => ({ look: side, near: frame % 12 < 3 ? -1 : 0 }),
    props: ({ at, frame }) => {
      const t = frame % 12
      for (let o = 15; o <= 17; o++) for (const y of [2, 3]) at(o, y, METAL)
      const isOpen = t >= 3 && t <= 6
      for (let o = 15; o <= 17; o++) at(o + (isOpen ? 1 : 0), isOpen ? 0 : 1, MUTED) // the lid
      const flight = [
        [12, 1],
        [13, 0],
        [14, 0],
        [15, 1],
      ] as const
      if (t < flight.length) {
        const [o, y] = cycle(flight, t)
        at(o, y, PAGE)
      }
    },
  },
  'work:whale': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      for (let o = 13; o <= 17; o++) at(o, 3, WHALE)
      for (let o = 14; o <= 17; o++) at(o, 2, WHALE)
      at(14, 2, EYE)
      at(18, 2, WHALE)
      at(19, 1, WHALE) // the tail
      if (frame % 6 < 3) {
        at(15, 1, SPOUT)
        at(14, 0, SPOUT)
        at(16, 0, SPOUT)
      }
    },
  },
  'work:snooze': { pose: () => ({ eyesShut: true }), props: zzz },
  // A command that runs and runs: he has fetched popcorn to watch it.
  'work:popcorn': {
    pose: ({ frame }) => ({ mouth: frame % 6 < 2, near: frame % 6 < 2 ? -1 : 0 }),
    props: ({ at, frame }) => {
      for (const o of [12, 13, 14]) for (const y of [2, 3]) at(o, y, o === 13 ? WHITE : RED)
      const pops = [
        [12, 1],
        [14, 0],
        [13, 1],
        [12, 0],
        [14, 1],
      ] as const
      for (const phase of [0, 3]) {
        const [o, y] = cycle(pops, frame + phase)
        at(o, y, KERNEL)
      }
    },
  },

  // A command's own pun.
  'work:cat': {
    pose: ({ side }) => ({ look: side }),
    props: stage => {
      const o = Math.max(14, 24 - Math.floor(stage.frame / 2))
      cat(stage, o, o > 14)
    },
  },
  'work:log': {
    pose: ({ frame, side }) => ({ look: side, near: frame % 4 < 2 ? 0 : 1, shift: frame % 4 < 2 ? 0 : 1 }),
    props: ({ at, frame }) => {
      for (let o = 13; o <= 18; o++) for (const y of [2, 3]) at(o, y, (o + Math.floor(frame / 2)) % 3 === 0 ? LOG_DARK : LOG)
      for (const y of [2, 3]) at(19, y, RING)
    },
  },
  'work:brew': {
    pose: ({ frame, side }) => ({ look: side, legs: frame % 4 < 2 ? STAND : TAP }),
    props: ({ at, frame }) => {
      for (const o of [13, 14, 15]) at(o, 1, METAL)
      for (const o of [13, 14, 15]) for (const y of [2, 3]) at(o, y, y === 3 || frame % 8 >= 4 ? COFFEE : GLASS)
      at(16, 2, METAL) // the handle
      at(frame % 6 < 3 ? 13 : 14, 0, STEAM)
    },
  },
  'work:branch': {
    pose: ({ side }) => ({ look: side, eyesUp: true }),
    props: ({ at, frame }) => {
      const grown = Math.floor(frame / 4) % 6
      at(15, 3, LOG)
      if (grown >= 1) at(15, 2, LOG)
      if (grown >= 2) at(15, 1, LOG)
      if (grown >= 3) at(16, 1, LOG)
      if (grown >= 4) {
        at(17, 0, PLANT)
        at(14, 1, PLANT)
      }
      if (grown >= 5) {
        at(16, 0, PLANT)
        at(14, 0, PLANT)
      }
    },
  },
  'work:pingpong': {
    pose: ({ frame, side }) => ({ look: side, near: frame % 8 < 2 ? -1 : 0 }),
    props: ({ at, frame }) => {
      at(12, 1, RED) // the paddle
      at(12, 2, HANDLE)
      for (let y = 0; y <= 3; y++) at(21, y, METAL) // the wall
      const path = [
        [13, 1],
        [15, 0],
        [17, 0],
        [19, 1],
        [20, 2],
        [19, 1],
        [17, 0],
        [15, 0],
      ] as const
      const [o, y] = cycle(path, frame)
      at(o, y, WHITE)
    },
  },
  'work:spintop': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      const wobble = frame % 8 < 4 ? 0 : 1
      at(14 + wobble, 0, METAL)
      for (let o = 13; o <= 15; o++) {
        at(o + wobble, 1, cycle(RAINBOW, frame + o))
        at(o + wobble, 2, cycle(RAINBOW, frame + o + 2))
      }
      at(14 + wobble, 3, METAL)
    },
  },
  'work:manual': {
    pose: ({ frame, side }) => ({ look: side, eyesUp: frame % 16 >= 12 }),
    props: ({ at, frame }) => {
      for (let o = 12; o <= 16; o++) for (const y of [1, 2, 3]) at(o, y, o === 12 || o === 16 ? COVER : PAGE)
      if (frame % 16 >= 12) for (const y of [0, 1, 3]) at(18, y, RED) // "!": so that's how it works
    },
  },
  // sudo: sunglasses and a moustache, and nobody will ever know.
  'work:disguise': {
    ...walking(0.5),
    props: ({ put, x }) => {
      for (let i = 2; i <= WIDTH - 3; i++) put(x + i, 1, SHADES)
      for (const i of [4, 5]) put(x + i, 2, STACHE)
    },
  },
  'work:boom': {
    pose: ({ frame }) => {
      const t = frame % 20
      return t >= 6 && t < 14 ? { shift: -1, eyesUp: true, near: -1, far: -1, body: t % 2 ? ORANGE : RED } : {}
    },
    props: ({ at, frame }) => {
      const t = frame % 20
      if (t < 6) {
        at(15, 3, METAL) // a fizzing fuse
        if (t % 2) at(15, 2, SPARK)
      } else if (t < 14) {
        const r = Math.min(4, t - 5)
        for (let o = 16 - r; o <= 16 + r; o++) {
          for (let y = 0; y <= 3; y++) if (Math.abs(o - 16) + Math.abs(y - 2) <= r) at(o, y, cycle(BOOM, o + y + t))
        }
      } else {
        for (const [o, y] of [
          [15, 1],
          [17, 0],
          [16, 2],
          [18, 1],
        ] as const) {
          at(o, y, SMOKE)
        }
      }
    },
  },
  'work:blame': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      for (const o of [12, 13]) at(o, 1, ORANGE) // pointing
      if (frame % 6 < 4) for (const y of [0, 1, 3]) at(15, y, RED)
    },
  },
  'work:echo': {
    pose: ({ frame }) => ({ mouth: frame % 6 < 3 }),
    props: ({ at, frame }) => {
      const reach = Math.floor(frame / 2) % 4
      ;[13, 15, 17].forEach((o, i) => {
        if (i > reach) return
        at(o, 0, cycle(FADE, i)) // a ")" of sound
        at(o + 1, 1, cycle(FADE, i))
        at(o, 2, cycle(FADE, i))
      })
    },
  },
  'work:nod': { pose: ({ frame }) => ({ lift: frame % 4 < 2 ? 0 : -1, eyesShut: frame % 4 >= 2 }) },
  'work:squish': {
    pose: ({ frame }) => ({ squeeze: cycle([0, 1, 2, 2, 1, 0], Math.floor(frame / 2)) }),
    props: ({ put, x, frame }) => {
      const s = cycle([0, 1, 2, 2, 1, 0], Math.floor(frame / 2))
      for (let y = 0; y <= 3; y++) {
        put(x - 1 + s, y, METAL) // the press
        put(x + WIDTH - s, y, METAL)
      }
    },
  },
  'work:tug': {
    pose: ({ frame }) => ({ shift: frame % 4 < 2 ? 0 : -1, legs: frame % 4 < 2 ? STAND : STRIDE }),
    props: ({ at, frame }) => {
      for (let o = 12; o <= 21; o++) at(o, 1, (o + Math.floor(frame / 2)) % 3 === 0 ? ROPE_DARK : ROPE)
    },
  },
  'work:merge': {
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      const t = frame % 16
      if (t < 8) {
        const step = Math.floor(t / 2)
        for (const y of [2, 3]) {
          for (const dx of [0, 1]) {
            at(13 + step + dx, y, ORANGE)
            at(21 - step + dx, y, BLUE)
          }
        }
      } else {
        for (let o = 16; o <= 19; o++) for (const y of [2, 3]) at(o, y, t % 2 ? ORANGE : BLUE)
        if (t < 11) at(17, 0, SPARK)
      }
    },
  },

  // Something went wrong.
  'oops:flash': { length: 8, pose: ({ frame }) => ({ shift: frame % 2 ? 1 : -1, body: frame % 2 ? ORANGE : RED }) },
  'oops:sweat': {
    length: 12,
    pose: ({ frame }) => ({ shift: frame < 4 ? (frame % 2 ? 1 : -1) : 0, body: frame < 2 ? RED : ORANGE }),
    props: ({ at, frame }) => at(12, Math.min(3, Math.floor(frame / 3)), SWEAT),
  },
  'oops:facepalm': {
    length: 12,
    pose: ({ frame }) => ({ eyesShut: frame >= 2, near: -1, body: frame < 2 ? RED : ORANGE }),
  },
  'oops:dizzy': {
    length: 14,
    pose: ({ frame }) => ({ shift: cycle([0, 1, 0, -1], frame), eyesShut: frame % 4 < 2 }),
    props: ({ put, x, frame }) => {
      const orbit = [
        [-1, 0],
        [WIDTH, 0],
        [WIDTH + 1, 1],
        [-2, 1],
      ] as const
      for (const phase of [0, 2]) {
        const [dx, y] = cycle(orbit, frame + phase)
        put(x + dx, y, SPARK)
      }
    },
  },
  'oops:tableflip': {
    length: 16,
    pose: ({ frame }) => (frame >= 4 && frame < 12 ? { near: -1, far: -1, body: frame % 2 ? ORANGE : RED } : {}),
    props: ({ at, frame }) => {
      if (frame < 4) {
        for (let o = 13; o <= 17; o++) at(o, 2, TABLE)
        for (const o of [13, 17]) at(o, 3, TABLE)
        return
      }
      const s = frame - 4 // off it flies, legs in the air
      const b = 2 - Math.floor(s / 2)
      for (let i = 0; i < 5; i++) at(14 + s + i, b, TABLE)
      for (const i of [0, 4]) at(14 + s + i, b - 1, TABLE)
    },
  },
  'oops:raincloud': {
    length: 18,
    pose: () => ({ eyesShut: true, lift: -1 }),
    props: ({ at, frame }) => {
      for (let o = 12; o <= 16; o++) at(o, 0, RAINCLOUD)
      for (const o of [13, 15]) at(o, 1 + ((frame + o) % 3), RAIN)
    },
  },
  'oops:faceplant': {
    length: 16,
    pose: ({ frame }) => (frame < 12 ? { lift: -2, eyesShut: true, near: 1, far: 1 } : {}),
    props: ({ at, frame }) => {
      if (frame >= 1 && frame < 5) for (const o of [12, 14]) at(o, 3, DUST)
    },
  },

  // A turn done.
  'cheer:hop': {
    length: 12,
    pose: ({ frame }) => ({ lift: frame < 8 && frame % 4 >= 1 && frame % 4 <= 2 ? 1 : 0 }),
    props: ({ put, x, frame }) => {
      if (frame < 8 && frame % 4 >= 1 && frame % 4 <= 2) {
        put(x - 1, 0, SPARK)
        put(x + WIDTH, 0, SPARK)
        put(x - 2, 2, SPARK)
        put(x + WIDTH + 1, 2, SPARK)
      }
    },
  },
  'cheer:wave': {
    length: 12,
    pose: ({ frame }) => ({ near: frame % 6 < 3 ? -1 : 0 }),
    props: ({ at, frame }) => {
      if (frame % 6 < 3) at(13, 0, SPARK)
    },
  },
  'cheer:spin': {
    length: 12,
    pose: ({ frame }) => ({ look: cycle([-1, 0, 1, 0], frame), near: frame % 2 ? 0 : -1, far: frame % 2 ? -1 : 0 }),
  },
  'cheer:dance': {
    length: 12,
    pose: ({ frame }) => ({
      shift: frame % 4 < 2 ? 1 : 0,
      near: frame % 4 < 2 ? 0 : -1,
      far: frame % 4 < 2 ? -1 : 0,
      legs: frame % 2 ? STRIDE : STAND,
    }),
  },
  'cheer:flex': {
    length: 12,
    pose: () => ({ near: -1, far: -1 }),
    props: ({ put, x, frame }) => {
      if (frame % 4 < 2) {
        put(x - 1, 1, SPARK)
        put(x + WIDTH, 1, SPARK)
      }
    },
  },
  'cheer:heart': {
    length: 14,
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      for (const o of [13, 15]) at(o, 0, HEART)
      for (const o of [13, 14, 15]) at(o, 1, HEART)
      at(14, 2, HEART)
      if (frame % 4 < 2) {
        // the beat: a bigger heart
        for (const y of [0, 1]) {
          at(12, y, HEART)
          at(16, y, HEART)
        }
        for (const o of [13, 15]) at(o, 2, HEART)
        at(14, 3, HEART)
      }
    },
  },
  'cheer:confetti': {
    length: 16,
    pose: () => ({ near: -1, far: -1 }),
    props: ({ put, x, frame }) => {
      CONFETTI.forEach((color, i) => put(x - 4 + ((i * 7 + frame * 3) % 22), (frame + i * 2) % 4, color))
    },
  },
  'cheer:bow': {
    length: 12,
    pose: ({ frame }) => {
      const isDown = frame >= 3 && frame <= 8
      return { lift: isDown ? -1 : 0, eyesShut: isDown }
    },
  },
  'cheer:fireworks': {
    length: 16,
    pose: () => ({ eyesUp: true, near: -1 }),
    props: ({ at, frame }) => {
      if (frame < 4) return at(16, 3 - frame, SPARK)
      const r = frame < 9 ? 1 : 2
      const color = cycle(FIREWORK, frame)
      for (const [dx, dy] of [
        [-r, 0],
        [r, 0],
        [0, -r],
        [0, r],
        [-r, -r],
        [r, -r],
        [-r, r],
        [r, r],
      ]) {
        at(16 + (dx ?? 0), 1 + (dy ?? 0), color)
      }
    },
  },
  'cheer:trophy': {
    length: 14,
    pose: ({ side }) => ({ near: -1, look: side, eyesUp: true }),
    props: ({ at, frame }) => {
      for (const o of [12, 13, 14]) at(o, 0, TROPHY)
      at(13, 1, TROPHY)
      for (const o of [12, 13, 14]) at(o, 2, TROPHY)
      if (frame % 4 < 2) at(16, 0, SPARK)
    },
  },
  // Deal with it: the sunglasses come down.
  'cheer:shades': {
    length: 16,
    props: ({ put, x, frame }) => {
      if (frame < 3) return
      const y = Math.min(1, frame - 4)
      for (let i = 2; i <= WIDTH - 3; i++) put(x + i, y, SHADES)
      if (frame >= 10 && frame % 4 < 2) put(x + 3, 1, WHITE) // a glint
    },
  },
  'cheer:disco': {
    length: 16,
    pose: ({ frame }) => ({
      body: cycle(RAINBOW, frame),
      near: frame % 4 < 2 ? -1 : 0,
      far: frame % 4 < 2 ? 0 : -1,
      legs: frame % 2 ? STRIDE : STAND,
    }),
    props: ({ put, x, frame }) => {
      for (const [dx, y] of [
        [-2, 0],
        [WIDTH + 1, 1],
        [-1, 2],
        [WIDTH, 3],
      ] as const) {
        if ((frame + dx) % 3 === 0) put(x + dx, y, cycle(RAINBOW, frame + dx))
      }
    },
  },
  'cheer:moonwalk': {
    length: 18,
    pose: ({ frame, dir }) => ({ shift: -Math.floor(frame / 2) * dir, look: dir, legs: frame % 2 ? STRIDE : STAND }),
  },

  // A break in a long turn.
  'break:coffee': {
    length: 24,
    pose: ({ frame, side }) => ({ look: side, near: frame >= 8 && frame <= 14 ? -1 : 0 }),
    props: ({ at, frame }) => {
      const raised = frame >= 8 && frame <= 14 ? 1 : 0
      for (const o of [13, 14]) for (const y of [2, 3]) at(o, y - raised, MUG)
      at(15, 2 - raised, MUG) // the handle
      at(frame % 6 < 3 ? 13 : 14, 0, STEAM)
    },
  },
  'break:yawn': {
    length: 24,
    pose: ({ frame }) => {
      const isWide = frame >= 6 && frame <= 16
      return { eyesShut: frame >= 3 && frame <= 20, mouth: isWide, near: isWide ? -1 : 0, far: isWide ? -1 : 0 }
    },
  },
  'break:stretch': {
    length: 24,
    pose: ({ frame }) => {
      const isUp = frame >= 2 && frame <= 20
      return {
        near: isUp ? -1 : 0,
        far: isUp ? -1 : 0,
        lift: frame >= 8 && frame <= 14 ? 1 : 0,
        eyesShut: frame >= 6 && frame <= 16,
      }
    },
  },
  'break:nap': { length: 30, pose: () => ({ eyesShut: true }), props: zzz },
  'break:snack': {
    length: 24,
    pose: ({ frame, side }) => ({ look: side, mouth: frame % 4 < 2 }),
    props: ({ at, frame }) => {
      const cookie = [
        [12, 1],
        [13, 1],
        [12, 2],
        [13, 2],
      ] as const
      for (const [o, y] of cookie.slice(Math.min(3, Math.floor(frame / 6)))) at(o, y, COOKIE)
      if (frame % 6 === 1) at(14, 3, COOKIE) // a crumb
    },
  },
  'break:music': {
    length: 30,
    pose: ({ frame }) => ({ lift: frame % 6 < 3 ? 0 : 1, eyesShut: frame % 12 < 6, cups: true }),
    props: ({ at, frame }) => {
      const t = Math.floor((frame % 8) / 2)
      at(13 + t, 3 - t, NOTE)
    },
  },
  'break:phone': {
    length: 24,
    pose: ({ side }) => ({ look: side }),
    props: ({ at, frame }) => {
      for (const o of [12, 13]) for (let y = 0; y <= 2; y++) at(o, y, PHONE)
      at(12, frame % 3, SCREEN)
      at(13, (frame + 1) % 3, SCREEN)
    },
  },
  'break:plant': {
    length: 30,
    pose: ({ side }) => ({ look: side, near: -1 }),
    props: ({ at, frame }) => {
      for (const o of [12, 13]) at(o, 0, METAL) // the watering can
      at(14, 1, METAL)
      at(15, 2 + (frame % 2), WATER)
      for (let o = 16; o <= 18; o++) at(o, 3, POT)
      at(17, 2, PLANT)
      if (frame >= 10) at(17, 1, PLANT)
      if (frame >= 20) {
        at(16, 1, PLANT)
        at(18, 0, PLANT)
      }
    },
  },
  'break:ball': {
    length: 24,
    pose: ({ frame, side }) => ({ look: frame % 8 < 4 ? side : 0 }),
    props: ({ at, frame }) => at(14 + Math.floor((frame % 16) / 4), cycle([3, 2, 1, 0, 0, 1, 2, 3], frame), BALL),
  },
  'break:fishing': {
    length: 36,
    pose: ({ frame, side }) => ({ look: side, near: frame >= 24 ? -1 : 0 }),
    props: ({ at, frame, x }) => {
      for (let o = 16; o <= 21; o++) at(o, 3, WATER) // the pond
      at(12, 1, HANDLE) // the rod
      for (const o of [13, 14]) at(o, 0, HANDLE)
      if (frame < 24) {
        for (const [o, y] of [
          [15, 0],
          [16, 0],
          [17, 1],
        ] as const) {
          at(o, y, LINE)
        }
        at(18, frame % 6 < 3 ? 2 : 3, RED) // the float, bobbing
      } else {
        const catchIsBoot = x % 3 === 0 // sometimes all he lands is a boot
        const y = Math.max(0, 3 - (frame - 24))
        for (const o of [16, 17]) at(o, y, catchIsBoot ? BOOT : FISH)
      }
    },
  },

  // While Claude waits on subagents: a game with a buddy for each.
  'play:catch': {
    pose: ({ frame, buddies }) => {
      const { from, to, t } = passOf(frame, buddies + 1)
      const isHis = (from === 0 && t < 2) || (to === 0 && t >= PASS - 2)
      return { look: 1, eyesUp: t > 0 && t < PASS - 1, near: isHis ? -1 : 0 }
    },
    props: ({ put, frame, buddies }) => {
      seated(put, buddies)
      const { from, to, t } = passOf(frame, buddies + 1)
      const hand = (player: number) => (player === 0 ? WIDTH : seat(player - 1) + 2)
      put(along(hand(from), hand(to), t, PASS - 1), t > 0 && t < PASS - 1 ? 0 : 1, BALL)
    },
  },
  'play:stadium': {
    pose: ({ frame, buddies }) => (crestOf(frame, buddies + 1) === 0 ? { near: -1, far: -1, mouth: true } : {}),
    props: ({ put, frame, buddies }) => {
      const crest = crestOf(frame, buddies + 1)
      for (let i = 0; i < buddies; i++) mini(put, seat(i), crest === i + 1 ? 1 - (frame % 2) : 2, i)
    },
  },
  'play:conga': {
    pose: ({ frame, buddies, width }) => ({
      shift: congaX(frame, buddies, width),
      look: 1,
      legs: Math.floor(frame / 2) % 2 ? STRIDE : STAND,
    }),
    props: ({ put, x, frame, buddies }) => {
      const beat = Math.floor(frame / 2) % 4 // one, two, three, kick!
      for (let i = 0; i < buddies; i++) mini(put, x - PITCH * (i + 1), beat === 3 ? 1 : 2, i, beat % 2 === 1)
    },
  },
  'play:highfive': {
    pose: ({ frame, buddies }) => (highFiveOf(frame, buddies)?.isSlap ? { look: 1, near: -1, mouth: true } : { look: 1 }),
    props: ({ put, frame, buddies }) => {
      const turn = highFiveOf(frame, buddies)
      seated(put, buddies, turn?.who)
      if (!turn) return
      // On the way he leapfrogs the buddies seated nearer Clawd.
      const isOver = Array.from({ length: turn.who }, (_, i) => seat(i)).some(s => Math.abs(turn.x - s) < 4)
      mini(put, turn.x, turn.isSlap ? 1 : isOver ? 0 : 2, turn.who, turn.x !== seat(turn.who) && frame % 2 === 1)
      if (turn.isSlap) put(WIDTH, 0, SPARK)
    },
  },
  'play:pyramid': {
    pose: ({ frame, buddies }) => {
      const { isUp, isFalling } = pyramidOf(frame, buddies)
      return isUp ? { near: -1, far: -1, mouth: true } : isFalling ? { near: -1, eyesShut: true } : { look: 1 }
    },
    props: ({ put, frame, buddies }) => pyramidOf(frame, buddies).spots.forEach(({ x, y }, i) => mini(put, x, y, i)),
  },
}

const actOf = (scene: Pick<Scene, 'mode' | 'style'>): Act => ACTS[`${scene.mode}:${scene.style}`] ?? {}

/** How many ticks a timed act plays; undefined for an act that loops until Claude moves on. */
export const lengthOf = (scene: Pick<Scene, 'mode' | 'style'>): number | undefined => actOf(scene).length

// A Bash command's own act, the first whose pattern it matches; running otherwise.
const BASH_ACTS: [RegExp, WorkStyle][] = [
  [/\bgit\s+push\b.*\s(--force|-f)\b/, 'boom'],
  [/\bsudo\b/, 'disguise'],
  [/\bgit\s+push\b/, 'rocket'],
  [/\bgit\s+log\b/, 'log'],
  [/\bgit\s+blame\b/, 'blame'],
  [/\bgit\s+pull\b/, 'tug'],
  [/\bgit\s+merge\b/, 'merge'],
  [/\bgit\s+(branch|checkout\s+-b|switch\s+-c)\b/, 'branch'],
  [/\bbrew\b/, 'brew'],
  [/\bgit\s+commit\b|\b(npm|pnpm|yarn|bun|pip3?|cargo|gem|poetry)\s+(install|add|i)\b/, 'box'],
  [/\b(test|tests|jest|vitest|pytest|mocha|playwright|rspec)\b/, 'clipboard'],
  [/(^|[;&|]\s*|\s)rm\s/, 'trash'],
  [/\b(docker|docker-compose|kubectl)\b/, 'whale'],
  [/\b(curl|wget)\b/, 'globe'],
  [/\bping\b/, 'pingpong'],
  [/\bh?top\b/, 'spintop'],
  [/\bman\s/, 'manual'],
  [/\byes\b/, 'nod'],
  [/\b(zip|unzip|tar|gzip|gunzip)\b/, 'squish'],
  [/\bcat\b/, 'cat'],
  [/\becho\b/, 'echo'],
  [/\b(make|tsc|build|gcc|clang|xcodebuild)\b/, 'tinker'],
  [/\bsleep\s/, 'snooze'],
]

/** What Clawd does while a tool runs: some tools have two acts, picked by `random`; without puns a command just runs. */
export function workFor(
  tool: string,
  input: Record<string, unknown>,
  random: () => number = Math.random,
  { puns = true }: { puns?: boolean } = {},
): WorkStyle {
  const either = (a: WorkStyle, b: WorkStyle) => (random() < 0.5 ? a : b)
  switch (tool) {
    case 'Edit':
    case 'MultiEdit':
    case 'NotebookEdit':
    case 'Write':
      return either('type', 'pencil')
    case 'Read':
      return either('scan', 'book')
    case 'Grep':
    case 'Glob':
      return either('magnify', 'dig')
    case 'WebFetch':
    case 'WebSearch':
      return 'globe'
    case 'TodoWrite':
    case 'TaskCreate':
    case 'TaskUpdate':
      return 'clipboard'
    case 'Agent':
    case 'Task':
      return 'buddy'
    case 'Bash': {
      const command = typeof input.command === 'string' ? input.command : ''
      return (puns && BASH_ACTS.find(([pattern]) => pattern.test(command))?.[1]) || 'run'
    }
    default:
      return either('walk', 'tinker')
  }
}

/** The next tick: walking acts move Clawd along, a timed act runs out, a long command brings out the popcorn. */
export function step(scene: Scene, columns: number): Scene {
  const frame = scene.frame + 1
  const act = actOf(scene)
  if (act.length !== undefined && frame >= act.length) {
    const mode = scene.then ?? 'idle'
    return { ...scene, mode, style: mode === 'think' ? 'bubble' : undefined, frame: 0, then: undefined }
  }
  if (scene.mode === 'work' && scene.style === 'run' && frame >= POPCORN_AFTER) return { ...scene, style: 'popcorn', frame: 0 }
  const limit = Math.max(0, columns * 2 - WIDTH)
  const speed = act.speed === undefined ? 0 : act.speed < 1 ? frame % 2 : act.speed
  let x = Math.min(scene.x, limit) + speed * scene.dir
  let dir = scene.dir
  if (x >= limit) {
    x = limit
    dir = -1
  }
  if (x <= 0) {
    x = 0
    dir = 1
  }
  return { ...scene, frame, x, dir }
}

/**
 * One cell from its four pixels (top-left, top-right, bottom-left, bottom-right):
 * a cell holds two colours, so a third gives way to the commonest, and an empty
 * pixel keeps the terminal's background showing.
 */
function quadrant(pixels: number[]): [number, number, number] {
  const counts = new Map<number, number>()
  for (const pixel of pixels) if (pixel !== NONE) counts.set(pixel, (counts.get(pixel) ?? 0) + 1)
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([color]) => color)
  const ink = ranked[0]
  if (ink === undefined) return [0x20, DEFAULT, DEFAULT]
  const paper = pixels.includes(NONE) ? NONE : (ranked[1] ?? NONE)
  let mask = 0
  pixels.forEach((pixel, i) => {
    if (pixel !== NONE && pixel !== paper) mask |= 1 << i
  })
  return [QUADRANTS[mask] ?? 0x20, ink, paper === NONE ? DEFAULT : paper]
}

/** One frame of the stage, as a Raster's cells: columns × ROWS triplets of [codePoint, fg, bg]. */
export function draw(scene: Scene, columns: number): string {
  const width = columns * 2
  const height = ROWS * 2
  const pixels = new Int32Array(width * height).fill(NONE)
  const put = (x: number, y: number, color: number) => {
    if (x >= 0 && x < width && y >= 0 && y < height) pixels[y * width + x] = color
  }
  const { frame, dir } = scene
  const act = actOf(scene)
  const home = scene.mode === 'play' ? 0 : Math.min(scene.x, Math.max(0, width - WIDTH))
  const side = home + WIDTH + 13 <= width ? 1 : -1 // props go where there is room
  const buddies = Math.min(scene.buddies ?? 0, seatsFor(width))
  const pose: Pose = { ...REST, ...act.pose?.({ frame, side, dir, buddies, width }) }
  const x = home + pose.shift
  // He stands a pixel above the stage's floor: his two body rows then share their cells with no
  // empty pixel, which is what lets a cell show an eye in its own colour.
  const top = -pose.lift // the body's first row; the legs are at top + 2
  const [armLeft, armRight] = side > 0 ? [pose.far, pose.near] : [pose.near, pose.far]
  const left = 1 + pose.squeeze
  const right = WIDTH - 2 - pose.squeeze

  // Headphones on a long turn, like the Clawd on the claude.dev blog: ear cups beside his head.
  if (scene.headphones || pose.cups) {
    put(x + left - 1, top, CUP)
    put(x + right + 1, top, CUP)
  }
  for (let row = 0; row < 2; row++) for (let i = left; i <= right; i++) put(x + i, top + row, pose.body)
  put(x + left - 1, top + 1 + armLeft, pose.body)
  put(x + right + 1, top + 1 + armRight, pose.body)
  if (!pose.eyesShut) {
    const eyeRow = pose.eyesUp || pose.mouth ? top : top + 1 // an open mouth takes the lower row
    const inset = Math.floor(pose.squeeze / 2)
    put(x + 3 + inset + pose.look, eyeRow, EYE)
    put(x + 6 - inset + pose.look, eyeRow, EYE)
  }
  if (pose.mouth) for (const i of [4, 5]) put(x + i, top + 1, EYE)
  for (const i of pose.legs) if (i >= left && i <= right) put(x + i, top + 2, pose.body)
  const reach = (offset: number) => offset - REACH + WIDTH
  act.props?.({
    frame,
    side,
    dir,
    buddies,
    width,
    x,
    put,
    at: (offset, y, color) => put(side > 0 ? x + reach(offset) : x + WIDTH - 1 - reach(offset), y, color),
  })

  const words = new Uint32Array(columns * ROWS * 3)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < columns; col++) {
      const at = (dx: number, dy: number) => pixels[(2 * row + dy) * width + 2 * col + dx] ?? NONE
      const [glyph, fg, bg] = quadrant([at(0, 0), at(1, 0), at(0, 1), at(1, 1)])
      const cell = (row * columns + col) * 3
      words[cell] = glyph
      words[cell + 1] = fg
      words[cell + 2] = bg
    }
  }

  let binary = ''
  for (const byte of new Uint8Array(words.buffer)) binary += String.fromCharCode(byte)
  return btoa(binary)
}
