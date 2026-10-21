# Niijima Design

The shared look of the Niijima Network (niijimasisters.com and every subdomain): the landing
page's colours, fonts and components in one package, plus the **Makoto / Sae persona switch**
that re-colours every site at once.

- **Tokens** (`tokens.css`): ink, paper, thief red, Makoto's navy/steel/cyan, Sae's
  crimson/gold/violet. Components use semantic names (`--nj-field`, `--nj-hi`, `--nj-accent`…)
  that change with the persona.
- **Fonts** (`fonts.css`): Anton, Barlow Semi Condensed and the ransom-note faces (Abril Fatface,
  Alfa Slab One, Archivo Black, Special Elite), self-hosted, loaded per subset.
- **Components** (`components.css`): plain CSS classes, usable from any page.
- **Helpers** (`@niijima/design`): ransom letters, starbursts, the in-game calendar, the persona.
- **Svelte components** (`@niijima/design/svelte`) for the SvelteKit apps.

No game art lives here (this repo is public). Character art stays in each app's own asset folder
on the server.

## Install

From GitHub, pinned to a tag:

```sh
pnpm add github:sopika2/Niijima-Design#v0.1.0
```

pnpm builds the package on install (`prepare`). Docker builds need network access to GitHub,
nothing else; the repo is public.

## Use

```js
import '@niijima/design/niijima.css'; // fonts + tokens + components
import { ransomInto, getPersona, applyPersona } from '@niijima/design';

applyPersona(getPersona()); // data-persona on <html>: the page takes that sister's colours
ransomInto(document.querySelector('h1'), 'TAKE YOUR TIME');
```

```svelte
<script>
	import { Ransom, Button, DateHud, PersonaSwitch } from '@niijima/design/svelte';
</script>

<DateHud timeZone="Europe/Budapest" weather="Cloudy 13°" />
<Ransom as="h1" text="TREASURY" animate />
<Button href="/accounts">Enter</Button>
<PersonaSwitch value={data.persona} onchange={() => invalidateAll()} />
```

## Components

| Class                                                                        | Svelte          | What                                                                         |
| ---------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `nj-ransom`                                                                  | `Ransom`        | Cut-out letters on paper/ink/red tiles (or `gold`, `crimson`, `steel`, `hi`) |
| `nj-btn` (`--red`, `--hi`, `--ghost`, `--small`, `--down`)                   | `Button`        | Paper front on a red block, tilted                                           |
| `nj-back`                                                                    | `Back`          | BACK [Esc]                                                                   |
| `nj-plate` (`--paper`, `--red`, `--hi`, `--gold`, `--cyan`)                  | `Plate`         | Tilted label                                                                 |
| `nj-stamp` (`--online`, `--soon`, `--pending`, `--down`, `--locked`, `--hi`) | `Stamp`         | Status stamp                                                                 |
| `nj-counter`                                                                 | `Counter`       | Big number in a paper frame: "3/3 ONLINE", totals                            |
| `nj-hud`                                                                     | `DateHud`       | The in-game calendar in a red starburst                                      |
| `nj-speech`                                                                  | `Speech`        | Paper speech box with a tag and a tail                                       |
| `nj-wordmark`                                                                | `Wordmark`      | NIIJIMA SISTERS 新島姉妹                                                     |
| `nj-bands`                                                                   | `Bands`         | The red band, paper slash, starburst and ghost word behind a screen          |
| `nj-loader`                                                                  | `Loader`        | "Take your time"                                                             |
| `nj-palace`                                                                  | `Palace`        | Error pages: the 404 Palace                                                  |
| `nj-persona`                                                                 | `PersonaSwitch` | MAKOTO \| SAE                                                                |

## The persona

One choice for the whole Network, stored in the `nj_persona` cookie on the parent domain
(`.niijimasisters.com`), so switching on one site switches every site. Pages show it with
`data-persona="makoto|sae"` on `<html>`; servers read it with `personaFromCookie(request
headers)` to keep each persona's data apart, and to render the right colours on the first paint.

## Develop

```sh
pnpm install
pnpm dev       # the demo page with every component: http://localhost:5173
pnpm verify    # format, type checks, tests, build, package lint
```

Release: bump `version` in `package.json`, merge, then tag `vX.Y.Z` on main; apps move to the new
tag when they're ready.
