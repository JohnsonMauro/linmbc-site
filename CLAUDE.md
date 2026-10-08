# CLAUDE.md — linmbc-site

Landing page for LinMBC (the app lives in the sibling `../linmbc` repo).
Astro 7 + Tailwind 4, static, **no React**: interactivity is plain `<script>`
(copy buttons, saving the picked language, the hero backdrop). pnpm. Deployed to
GitHub Pages under `/linmbc-site` by `.github/workflows/deploy.yml`.

## Layout

| Path | Role |
|---|---|
| `src/pages/index.astro` | redirect: saved language, else browser language, else `en` |
| `src/pages/[lang]/index.astro` | the page, one per locale |
| `src/components/` | one component per section; props are the dictionary |
| `src/i18n/config.ts` | locales, names, hreflang/og tags, flags, screenshot suffixes |
| `src/i18n/dict.ts`, `locales/*.ts` | every visible string; `en.ts` is the source |
| `src/styles/global.css` | theme tokens (`@theme`), one dark theme |
| `src/backdrop/` | hero animation: WebGL tide + canvas-2D signal network, pause switch, side-button egg |
| `scripts/` | copy check, screenshots → WebP, og images, favicons |

## Rules

- No user-visible string in a component: it goes in the dictionary, in all ten
  locales (`pnpm copy:check`). Commands, file names and code stay in the
  components.
- Claims about the app must be true of the app. Read its code or README
  before writing copy; product terms (profile names, button labels such as
  "Add profile", "Record") come from the app's catalogs
  `../linmbc/src/linmbc/locales/*.json`. Key names stay as the app shows them
  ("Ctrl", not "Strg").
- Colors and fonts come from the tokens in `global.css`; no hex in components.
- Motion only on `transform`/`opacity`; the reduced-motion block in
  `global.css` must keep working.
- Grid items holding code or long lines need `minmax(0,1fr)` columns, or they
  push the page wider than a phone (caught at 390 px once).

## Hero backdrop (`src/backdrop/`)

Adapted from the portfolio's hero (same tide shader and frame loop). Mice and
keycaps drift in three depth layers; gold signals travel mouse → key and light
the key: a remap, drawn. The visitor joins in: a click sends signals to the
nearest keys, the rear side button sends Q, the front one toggles a Ctrl+2
loop (the screenshots' Last Epoch profile), with a toast in the page language.

- Colours come from the theme tokens (`--color-*`, plain hex in the built CSS);
  the tide tones them into the night with `mix()` — full strength washed the
  hero out.
- Pause button (`aria-pressed`, WCAG 2.2.2) and reduced motion both give a
  still frame (`frameLoop.ts`, `motion.ts`). Layout is seeded
  (`random.ts`): still frames are reproducible.
- The calm area behind the title uses `anchorBox()` (layout offsets across
  offset parents), never client rects: the scroll exit transforms the copy.
- Side buttons are the browser's Back/Forward: `heroInput.ts` cancels them over
  the hero. Verified in Chromium (headless, CDP); Firefox needs a real mouse to
  check (synthetic events never navigate there).
- No `backdrop-filter` over the canvases: it made two captures of a still
  frame differ (1 in 4 runs) around the blurred element.
- Scroll-exit CSS lives in `global.css` under `@supports`, with a scoped
  `eslint-disable css/use-baseline`.

Checked at 1440×900 with software WebGL: both layers ready, frames move,
paused and reduced-motion frames identical, back button keeps the page, no
console errors, rAF p95 16.7 ms; 7.2 KB gzip of script.

## Verify

```bash
pnpm lint && pnpm format:check && pnpm check && pnpm copy:check && pnpm build
```

Then look at it: `pnpm preview`, and check at 1440 px and 390 px
(`document.documentElement.scrollWidth` must equal the viewport width).

## Astro notes (Astro 7.3, verified 2026-10)

- `astro build` does not type-check; `pnpm check` (`astro check`) does.
- `compressHTML` removes the line break between two inline elements: use
  `{' '}` where words must stay apart.
- Template line breaks inside `<pre>` render as blank lines; build code blocks
  from block elements with `whitespace-pre` (see `CodeBlock.astro`).
- JetBrains Mono turns `--` into a ligature: code keeps
  `font-variant-ligatures: none`.

## Commits

Conventional Commits. Never commit generated `dist/` or `.astro/`.
