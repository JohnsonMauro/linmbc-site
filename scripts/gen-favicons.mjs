// PNG favicons from public/favicon.svg (the app's logo).
//
//   pnpm favicons
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const svg = await readFile(path.join(root, 'public/favicon.svg'));
const outDir = path.join(root, 'public/img');

for (const { file, size } of [
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(path.join(outDir, file));
  console.log(`✓ ${file} (${size}x${size})`);
}
