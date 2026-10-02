# claude-mods

Mods for [Claude Code](https://code.claude.com): small plugins that change how Claude Code looks and behaves in your terminal.

> Fan-made. Not affiliated with or endorsed by Anthropic. Clawd is Anthropic's mascot.

## Clawd

![Clawd thinks, types, launches a rocket and cheers with fireworks](docs/clawd/hero.gif)

A tiny pixel Clawd who lives next to Claude Code's thinking line and acts out what Claude is doing: 74 acts, picked at random or by the tool and command Claude is running. When the turn ends he cheers beside the "Baked for 12s" line, then stands still until your next message.

### Install

In Claude Code:

```
/plugin marketplace add raresmun/claude-mods
/plugin install clawd@raresmun-mods
/reload-plugins
```

He shows up beside the thinking line on your next message.

### Good to know

- Terminal only, in windows about 66 columns wide or more.
- Costs no tokens: he only draws on your screen and never changes what Claude does.
- Light: one tiny frame every 100 ms while Claude works (well under 1% of a CPU core), nothing at all when idle.
- Mods are an early-access Claude Code feature, so an update can break him. If it does, Claude Code skips the mod and carries on as normal.

### Settings

In Claude Code, open `/config` and look for Clawd:

| Setting | Choices | Default |
|---|---|---|
| Motion | `normal`, `calm` (slower), `lively` (faster), or `still` (a pose for each act, no animation) | `normal` |
| Command puns | on, or off to have commands just run | on |
| Breaks on long turns | on or off | on |
| When Claude is done | `stay` (he cheers, then waits by the turn's last line) or `hide` (he leaves with the thinking line) | `stay` |

He also holds still when Claude Code's own Reduce motion setting is on.

### Uninstall

```
/plugin uninstall clawd@raresmun-mods
```

## All 74 acts

Every GIF below is rendered from the mod's own drawing code, cell by cell as your terminal draws it.

### While Claude thinks

One of these, picked at random each time.

| | Act | |
|---|---|---|
| ![](docs/clawd/think-bubble.gif) | **Thought bubble** | A thought cloud fills in |
| ![](docs/clawd/think-pace.gif) | **Pacing** | Back and forth, slowly |
| ![](docs/clawd/think-look.gif) | **Looking around** | |
| ![](docs/clawd/think-scratch.gif) | **Head scratch** | |
| ![](docs/clawd/think-tap.gif) | **Foot tap** | |
| ![](docs/clawd/think-bulb.gif) | **Lightbulb** | Flickers, then lights up |
| ![](docs/clawd/think-juggle.gif) | **Juggling** | |
| ![](docs/clawd/think-duck.gif) | **Rubber duck** | Talks the problem through; the duck quacks back |
| ![](docs/clawd/think-peekaboo.gif) | **Peekaboo** | |
| ![](docs/clawd/think-hiccup.gif) | **Hiccups** | |
| ![](docs/clawd/think-sneeze.gif) | **Sneeze** | Ah... ah... choo! |

### While a tool runs

| | Act | When |
|---|---|---|
| ![](docs/clawd/work-type.gif) | **Typing** | Editing files. On long edits a cat takes over the keyboard |
| ![](docs/clawd/work-pencil.gif) | **Pencil** | Editing files |
| ![](docs/clawd/work-scan.gif) | **Scanning** | Reading files |
| ![](docs/clawd/work-book.gif) | **Book** | Reading files |
| ![](docs/clawd/work-magnify.gif) | **Magnifying glass** | Searching code |
| ![](docs/clawd/work-dig.gif) | **Digging** | Searching code |
| ![](docs/clawd/work-globe.gif) | **Globe** | Web search and fetch, `curl`, `wget` |
| ![](docs/clawd/work-clipboard.gif) | **Clipboard** | To-do lists and test runs |
| ![](docs/clawd/work-buddy.gif) | **Buddy** | Subagents: a mini Clawd runs off on an errand |
| ![](docs/clawd/work-walk.gif) | **Walking** | Other tools. Watch out for the banana peel |
| ![](docs/clawd/work-tinker.gif) | **Hammering** | Other tools, and builds: `make`, `tsc`, `build` |
| ![](docs/clawd/work-run.gif) | **Running** | Any other command |
| ![](docs/clawd/work-popcorn.gif) | **Popcorn** | A command still running after 8 seconds |

### Command puns

| | Act | Command |
|---|---|---|
| ![](docs/clawd/work-rocket.gif) | **Rocket** | `git push` |
| ![](docs/clawd/work-boom.gif) | **Boom** | `git push --force` |
| ![](docs/clawd/work-box.gif) | **Box** | `git commit`, `npm install` and friends |
| ![](docs/clawd/work-trash.gif) | **Trash can** | `rm` |
| ![](docs/clawd/work-whale.gif) | **Whale** | `docker`, `kubectl` |
| ![](docs/clawd/work-snooze.gif) | **Dozing** | `sleep` |
| ![](docs/clawd/work-cat.gif) | **Cat** | `cat` |
| ![](docs/clawd/work-log.gif) | **Log** | `git log` |
| ![](docs/clawd/work-brew.gif) | **Brewing** | `brew` |
| ![](docs/clawd/work-branch.gif) | **Branch** | `git branch`, `git checkout -b`, `git switch -c` |
| ![](docs/clawd/work-pingpong.gif) | **Ping-pong** | `ping` |
| ![](docs/clawd/work-spintop.gif) | **Spinning top** | `top`, `htop` |
| ![](docs/clawd/work-manual.gif) | **The manual** | `man` |
| ![](docs/clawd/work-disguise.gif) | **Disguise** | `sudo` |
| ![](docs/clawd/work-blame.gif) | **Blame** | `git blame` |
| ![](docs/clawd/work-echo.gif) | **Echo** | `echo` |
| ![](docs/clawd/work-nod.gif) | **Nodding** | `yes` |
| ![](docs/clawd/work-squish.gif) | **Squished** | `tar`, `zip`, `gzip` |
| ![](docs/clawd/work-tug.gif) | **Tug of war** | `git pull` |
| ![](docs/clawd/work-merge.gif) | **Merge** | `git merge` |

### When something fails

One at random. The second failure in a row always flips the table.

| | Act | |
|---|---|---|
| ![](docs/clawd/oops-flash.gif) | **Red flash** | |
| ![](docs/clawd/oops-sweat.gif) | **Sweat drop** | |
| ![](docs/clawd/oops-facepalm.gif) | **Facepalm** | |
| ![](docs/clawd/oops-dizzy.gif) | **Dizzy** | |
| ![](docs/clawd/oops-tableflip.gif) | **Table flip** | |
| ![](docs/clawd/oops-raincloud.gif) | **Rain cloud** | |
| ![](docs/clawd/oops-faceplant.gif) | **Faceplant** | |

### When a turn is done

One at random.

| | Act | |
|---|---|---|
| ![](docs/clawd/cheer-hop.gif) | **Hop** | |
| ![](docs/clawd/cheer-wave.gif) | **Wave** | |
| ![](docs/clawd/cheer-spin.gif) | **Spin** | |
| ![](docs/clawd/cheer-dance.gif) | **Dance** | |
| ![](docs/clawd/cheer-flex.gif) | **Flex** | |
| ![](docs/clawd/cheer-heart.gif) | **Heart** | |
| ![](docs/clawd/cheer-confetti.gif) | **Confetti** | |
| ![](docs/clawd/cheer-bow.gif) | **Bow** | |
| ![](docs/clawd/cheer-fireworks.gif) | **Fireworks** | |
| ![](docs/clawd/cheer-trophy.gif) | **Trophy** | |
| ![](docs/clawd/cheer-shades.gif) | **Deal with it** | |
| ![](docs/clawd/cheer-disco.gif) | **Disco** | |
| ![](docs/clawd/cheer-moonwalk.gif) | **Moonwalk** | |

### On long turns

After a minute he puts his headphones on, and from 30 seconds in he takes the odd break while thinking.

| | Act | |
|---|---|---|
| ![](docs/clawd/think-bubble-headphones.gif) | **Headphones** | Turns longer than a minute |
| ![](docs/clawd/break-coffee.gif) | **Coffee** | |
| ![](docs/clawd/break-yawn.gif) | **Yawn** | |
| ![](docs/clawd/break-stretch.gif) | **Stretch** | |
| ![](docs/clawd/break-nap.gif) | **Nap** | |
| ![](docs/clawd/break-snack.gif) | **Cookie** | |
| ![](docs/clawd/break-music.gif) | **Music** | |
| ![](docs/clawd/break-phone.gif) | **Phone** | |
| ![](docs/clawd/break-plant.gif) | **Watering** | |
| ![](docs/clawd/break-ball.gif) | **Ball** | |
| ![](docs/clawd/break-fishing.gif) | **Fishing** | Sometimes he lands a boot |

## Develop

```
claude plugin validate plugins/clawd
claude plugin test plugins/clawd
claude --plugin-dir plugins/clawd
```

The GIFs come from `scripts/render-clawd-gifs.ts`. After changing an act, run `bun scripts/render-clawd-gifs.ts` (needs [Bun](https://bun.sh) and ImageMagick) to render them again.
