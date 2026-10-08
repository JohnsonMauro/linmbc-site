// App screenshots for the hero, one pair per language, as WebP.
//
//   pnpm screenshots <dir>
//
// <dir> holds main-<lang>.png and mapping-<lang>.png rendered by the app repo:
//   cd ../linmbc && QT_QPA_PLATFORM=offscreen QT_QPA_PLATFORMTHEME=kde \
//     .venv/bin/python scripts/gui_screenshots.py <dir>
// (offscreen, fake daemon, no personal data; Breeze style and colors).
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const outDir = path.join(root, 'public/screenshots');
const source = process.argv[2];
if (!source) {
  console.error('usage: pnpm screenshots <dir with main-*.png and mapping-*.png>');
  process.exit(1);
}

const files = (await readdir(source)).filter((f) => /^(main|mapping)-[\w]+\.png$/.test(f));
if (files.length === 0) throw new Error(`No screenshots in ${source}`);
for (const file of files.sort()) {
  const out = path.join(outDir, file.replace(/\.png$/, '.webp'));
  const info = await sharp(path.join(source, file)).webp({ quality: 88 }).toFile(out);
  console.log(
    `✓ ${path.basename(out)} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`,
  );
}
