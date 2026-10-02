# claude-mods

Mods for [Claude Code](https://code.claude.com): small plugins that change how Claude Code looks and behaves in your terminal.

> Fan-made. Not affiliated with or endorsed by Anthropic. Clawd is Anthropic's mascot.

## Clawd

A tiny pixel Clawd who lives next to Claude Code's thinking line and acts out what Claude is doing.

- **Thinking:** a thought bubble, pacing, talking to a rubber duck, juggling, peekaboo, a big sneeze
- **Working, by tool:** typing on a laptop for edits, reading a book, digging through search results, spinning a globe for the web, sending a mini-Clawd off for subagents
- **Command puns:** `git push` launches a rocket, `git push --force` blows up, `cat` brings a cat, `git log` rolls a log, `brew` brews coffee, `ping` plays ping-pong, `sudo` puts on a disguise, `tar` squishes him
- **Errors:** a red flash, a sweat drop, a faceplant; the second error in a row flips the table
- **Done:** a hop, a wave, a dance, fireworks, a trophy, a moonwalk, "deal with it" shades
- **Long turns:** headphones after a minute, and the odd break: coffee, a nap, fishing (sometimes he lands a boot)

74 acts in all, picked at random or by what Claude is doing.

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

### Uninstall

```
/plugin uninstall clawd@raresmun-mods
```

## Develop

```
claude plugin validate plugins/clawd
claude plugin test plugins/clawd
claude --plugin-dir plugins/clawd
```
