// Social preview images (og:image), one per locale, for the link cards that
// chat apps and social sites build from a shared URL (1200x630).
//
//   CHROME_PATH=brave pnpm og:images
//
// Copy comes from the locale dictionaries, the screenshot and logo from
// public/, the URL from astro.config.mjs. Rendered by a headless Chromium
// (CHROME_PATH, default `google-chrome`) because the fonts are web fonts;
// sharp only recompresses. The PNGs are committed: run again after changing
// the hero title, the logo or the screenshots.
import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import astroConfig from '../astro.config.mjs';
import { SCREENSHOT_SUFFIX, HREFLANG_TAGS } from '../src/i18n/config.ts';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const outDir = path.join(root, 'public/img');
const WIDTH = 1200;
const HEIGHT = 630;
const PORT = 9361;

const localesDir = path.join(root, 'src/i18n/locales');
const dicts = Object.fromEntries(
  await Promise.all(
    (await readdir(localesDir))
      .filter((f) => f.endsWith('.ts'))
      .map(async (f) => [f.slice(0, -3), (await import(path.join(localesDir, f))).default]),
  ),
);

const dataUri = async (file, type) =>
  `data:${type};base64,${(await readFile(path.join(root, 'public', file))).toString('base64')}`;
const logo = await dataUri('img/logo.svg', 'image/svg+xml');
const siteLabel = `${new URL(astroConfig.site).host}${astroConfig.base}`;

const escape = (text) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const cardHtml = async (lang, dict) => {
  const shot = await dataUri(`screenshots/main-${SCREENSHOT_SUFFIX[lang]}.webp`, 'image/webp');
  return `<!doctype html><html lang="${HREFLANG_TAGS[lang]}"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Manrope:wght@800&display=block">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; position: relative; color: #e8edf6;
    font-family: Inter, 'Noto Sans CJK JP', sans-serif;
    background: radial-gradient(circle at 85% 20%, #3daee940, transparent 55%), #070b14; }
  .brand { position: absolute; left: 72px; top: 64px; display: flex; align-items: center; gap: 18px;
    font-family: Manrope, sans-serif; font-weight: 800; font-size: 40px; }
  .brand img { width: 64px; height: 64px; }
  .badge { margin-left: 8px; padding: 4px 14px; border: 2px solid #ffd34e88; border-radius: 999px;
    color: #ffd34e; font: 600 18px Inter, sans-serif; letter-spacing: .12em; text-transform: uppercase; }
  h1 { position: absolute; left: 72px; top: 190px; width: 560px; font-family: Manrope, 'Noto Sans CJK JP', sans-serif;
    font-weight: 800; font-size: 54px; line-height: 1.08; letter-spacing: -0.02em; }
  .site { position: absolute; left: 72px; bottom: 56px; font-size: 22px; color: #9aa6bd; }
  .shot { position: absolute; left: 660px; top: 150px; width: 760px; border-radius: 14px; border: 1px solid #1f2a40;
    box-shadow: 0 30px 80px #000c; }
</style></head><body>
<div class="brand"><img src="${logo}" alt="">LinMBC<span class="badge">${escape(dict.hero.badge)}</span></div>
<h1>${escape(dict.hero.title)}</h1>
<img class="shot" src="${shot}" alt="">
<p class="site">${escape(siteLabel)}</p>
</body></html>`;
};

/** Minimal Chrome DevTools Protocol session: one tab, screenshots of HTML strings. */
async function withChrome(run) {
  const chrome = spawn(
    process.env.CHROME_PATH ?? 'google-chrome',
    [
      '--headless=new',
      '--no-sandbox',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  try {
    let target;
    for (let i = 0; i < 60 && !target; i++) {
      await new Promise((r) => setTimeout(r, 250));
      target = await fetch(`http://127.0.0.1:${PORT}/json`)
        .then((res) => res.json())
        .then((list) => list.find((t) => t.type === 'page'))
        .catch(() => undefined);
    }
    if (!target) throw new Error('Chrome did not start; set CHROME_PATH.');
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    let id = 0;
    const pending = new Map();
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      pending.get(message.id)?.(message);
      pending.delete(message.id);
    };
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const callId = ++id;
        pending.set(callId, (m) =>
          m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result),
        );
        ws.send(JSON.stringify({ id: callId, method, params }));
      });
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await run(send);
    ws.close();
  } finally {
    chrome.kill();
  }
}

await withChrome(async (send) => {
  for (const [lang, dict] of Object.entries(dicts)) {
    const frameId = (await send('Page.getFrameTree')).frameTree.frame.id;
    await send('Page.setDocumentContent', { frameId, html: await cardHtml(lang, dict) });
    // Wait for the stylesheet and the faces the card uses, then two frames.
    const loaded = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        const sheet = document.querySelector('link[rel=stylesheet]');
        if (!sheet.sheet) await new Promise((ok, fail) => { sheet.onload = ok; sheet.onerror = fail; });
        const text = document.body.innerText;
        await Promise.all(['800 54px Manrope', '500 22px Inter'].map((font) => document.fonts.load(font, text)));
        await document.fonts.ready;
        await Promise.all([...document.images].map((img) => img.decode()));
        await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
        return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replaceAll('"', '') + ' ' + f.weight);
      })()`,
    });
    const faces = new Set(loaded.result.value);
    for (const face of ['Manrope 800', 'Inter 500']) {
      if (!faces.has(face)) throw new Error(`Web font ${face} did not load; check the network.`);
    }
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const file = path.join(outDir, `og-${lang}.png`);
    const info = await sharp(Buffer.from(data, 'base64')).png({ compressionLevel: 9 }).toFile(file);
    console.log(
      `✓ og-${lang}.png (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`,
    );
  }
});
