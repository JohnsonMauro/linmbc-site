# linmbc-site

Website of [LinMBC](https://github.com/JohnsonMauro/linmbc), per-game mouse
button remapping for Linux: <https://johnsonmauro.github.io/linmbc-site/>

One landing page in the ten languages the app ships. Astro + Tailwind, static,
no client framework. Deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to
`main`.

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:4321/linmbc-site/
pnpm build && pnpm preview
```

Checks (the pre-commit hook runs the staged-file part of these):

```bash
pnpm lint && pnpm format:check && pnpm check && pnpm copy:check && pnpm build
```

## Content

- All copy lives in `src/i18n/locales/<lang>.ts`; `en.ts` is the source.
  `pnpm copy:check` fails when a locale misses a key or an array item, or when
  a key is no longer used.
- The other nine languages are machine translated. Product terms follow the
  app's own catalogs (`linmbc/src/linmbc/locales/*.json`), so the page and the
  screenshots say the same thing.

## Images

| What | How |
|---|---|
| App screenshots (`public/screenshots/`) | in the app repo: `QT_QPA_PLATFORM=offscreen QT_QPA_PLATFORMTHEME=kde .venv/bin/python scripts/gui_screenshots.py <dir>`, then `pnpm screenshots <dir>` |
| Link cards (`public/img/og-*.png`) | `CHROME_PATH=brave pnpm og:images` (needs network for the web fonts) |
| Favicons | `pnpm favicons` (from `public/favicon.svg`, the app's logo) |

## License

[MIT](LICENSE). Flag icons from [flag-icons](https://github.com/lipis/flag-icons)
(MIT, `public/flags/LICENSE-flag-icons`).
