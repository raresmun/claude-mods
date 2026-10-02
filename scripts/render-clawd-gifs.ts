// Renders every Clawd act to a GIF for the README, cell by cell the way a terminal
// draws it, through the mod's own `step` and `draw`.
// Needs Bun and ImageMagick: bun scripts/render-clawd-gifs.ts

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  BREAK_STYLES,
  CHEER_STYLES,
  draw,
  OOPS_STYLES,
  ROWS,
  step,
  THINK_STYLES,
  WORK_STYLES,
  type Mode,
  type Scene,
  type Style,
} from '../plugins/clawd/hooks/clawd'

const OUT = join(import.meta.dir, '..', 'docs', 'clawd')
const COLUMNS = 20
const CELL_W = 16
const CELL_H = 32
const PAD = 8
const BACKGROUND = 0x282c34
const DEFAULT = 0x01000000
const QUADRANTS = [
  0x20, 0x2598, 0x259d, 0x2580, 0x2596, 0x258c, 0x259e, 0x259b, 0x2597, 0x259a, 0x2590, 0x259c, 0x2584, 0x2599, 0x259f,
  0x2588,
]
const MASKS = new Map(QUADRANTS.map((codePoint, mask) => [codePoint, mask]))

// Frames for each act that loops until Claude moves on: enough to show it whole.
const LOOPS: Record<string, number> = {
  'think:bubble': 32,
  'think:pace': 48,
  'think:scratch': 16,
  'think:tap': 20,
  'think:bulb': 20,
  'think:juggle': 18,
  'think:duck': 16,
  'think:peekaboo': 20,
  'think:hiccup': 21,
  'think:sneeze': 16,
  'work:walk': 60,
  'work:type': 80,
  'work:pencil': 18,
  'work:scan': 16,
  'work:book': 16,
  'work:magnify': 12,
  'work:dig': 30,
  'work:globe': 18,
  'work:clipboard': 20,
  'work:tinker': 12,
  'work:rocket': 30,
  'work:box': 32,
  'work:whale': 12,
  'work:popcorn': 30,
  'work:cat': 30,
  'work:log': 12,
  'work:brew': 16,
  'work:pingpong': 16,
  'work:spintop': 16,
  'work:manual': 32,
  'work:disguise': 32,
  'work:boom': 20,
  'work:blame': 12,
  'work:echo': 16,
  'work:nod': 16,
  'work:tug': 12,
  'work:merge': 16,
}

/** An act from its first frame: until it plays out, or for its loop. */
function play(mode: Mode, style?: Style, extra: Partial<Scene> = {}): Scene[] {
  const looped = mode === 'idle' || mode === 'think' || mode === 'work'
  const length = looped ? (LOOPS[`${mode}:${style}`] ?? 24) : 60
  let scene: Scene = { mode, style, frame: 0, x: 2, dir: 1, headphones: false, then: 'idle', ...extra }
  const scenes: Scene[] = []
  while (scenes.length < length) {
    scenes.push(scene)
    scene = step(scene, COLUMNS)
    if (scene.mode !== mode || scene.style !== style) break // a timed act has played out
  }
  return scenes
}

/** One frame as RGB pixels: each cell's quarters in its foreground or background colour. */
function render(scene: Scene): { width: number; height: number; rgb: Uint8Array } {
  const width = COLUMNS * CELL_W + 2 * PAD
  const height = ROWS * CELL_H + 2 * PAD
  const rgb = new Uint8Array(width * height * 3)
  const fill = (x0: number, y0: number, x1: number, y1: number, color: number) => {
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * 3
        rgb[i] = (color >> 16) & 255
        rgb[i + 1] = (color >> 8) & 255
        rgb[i + 2] = color & 255
      }
    }
  }
  fill(0, 0, width, height, BACKGROUND)
  const words = new Uint32Array(Uint8Array.from(atob(draw(scene, COLUMNS)), c => c.charCodeAt(0)).buffer)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const cell = (row * COLUMNS + col) * 3
      const mask = MASKS.get(words[cell] ?? 0x20) ?? 0
      for (let quarter = 0; quarter < 4; quarter++) {
        const color = (mask & (1 << quarter) ? words[cell + 1] : words[cell + 2]) ?? DEFAULT
        if (color === DEFAULT) continue
        const x0 = PAD + col * CELL_W + (quarter % 2) * (CELL_W / 2)
        const y0 = PAD + row * CELL_H + Math.floor(quarter / 2) * (CELL_H / 2)
        fill(x0, y0, x0 + CELL_W / 2, y0 + CELL_H / 2, color)
      }
    }
  }
  return { width, height, rgb }
}

/** Writes the frames as a looping GIF at the mod's own 10 frames a second. */
function gif(name: string, scenes: Scene[]) {
  const dir = mkdtempSync(join(tmpdir(), 'clawd-'))
  const files = scenes.map((scene, i) => {
    const { width, height, rgb } = render(scene)
    const file = join(dir, `${String(i).padStart(3, '0')}.ppm`)
    writeFileSync(file, Buffer.concat([Buffer.from(`P6\n${width} ${height}\n255\n`), rgb]))
    return file
  })
  const made = Bun.spawnSync([
    'magick',
    '-delay',
    '10',
    '-loop',
    '0',
    ...files,
    // Flat pixel art: one exact palette for every frame, no dithering, no transparency
    // tricks (`-layers Optimize` remapped some backgrounds to the sunglasses' black).
    '+dither',
    '+remap',
    '-layers',
    'OptimizeFrame',
    join(OUT, `${name}.gif`),
  ])
  rmSync(dir, { recursive: true, force: true })
  if (made.exitCode !== 0) throw new Error(`${name}: ${made.stderr.toString()}`)
}

mkdirSync(OUT, { recursive: true })
for (const [mode, styles] of [
  ['think', THINK_STYLES],
  ['work', WORK_STYLES],
  ['oops', OOPS_STYLES],
  ['cheer', CHEER_STYLES],
  ['break', BREAK_STYLES],
] as const) {
  for (const style of styles) gif(`${mode}-${style}`, play(mode, style))
}
gif('think-bubble-headphones', play('think', 'bubble', { headphones: true }))
gif('hero', [
  ...play('think', 'bubble').slice(0, 24),
  ...play('work', 'type').slice(0, 24),
  ...play('work', 'rocket'),
  ...play('cheer', 'fireworks'),
  ...play('idle').slice(0, 8),
])
console.log(`GIFs written to ${OUT}`)
