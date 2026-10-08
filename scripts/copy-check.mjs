// Locale dictionary gate — the check `pnpm build` does not do (it strips types
// without checking them):
//   1. parity: every locale has the same key paths and array lengths as en;
//   2. orphans: every second-level key (dict.<section>.<key>) is read somewhere
//      outside src/i18n as `.key`.
//
//   pnpm copy:check
//
// Imports the locale files directly through Node's TypeScript type stripping.
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const localesDir = path.join(root, 'src/i18n/locales');
const locales = (await readdir(localesDir))
  .filter((f) => f.endsWith('.ts'))
  .map((f) => f.slice(0, -3));
const load = async (locale) => (await import(path.join(localesDir, `${locale}.ts`))).default;

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const shape = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return [
      `${prefix}[length=${value.length}]`,
      ...value.flatMap((item, index) => shape(item, `${prefix}[${index}]`)),
    ];
  }
  if (isObject(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      shape(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
};

// SupportRow.level is an identifier, not copy: it must match en exactly.
const levels = (dict) => dict.support.rows.map((row) => row.level).join(',');

const en = await load('en');
const enPaths = new Set(shape(en));
const problems = [];
for (const locale of locales.filter((l) => l !== 'en')) {
  const dict = await load(locale);
  const paths = new Set(shape(dict));
  problems.push(
    ...[...enPaths].filter((p) => !paths.has(p)).map((p) => `${locale}: missing ${p}`),
    ...[...paths].filter((p) => !enPaths.has(p)).map((p) => `${locale}: extra ${p}`),
  );
  if (levels(dict) !== levels(en)) problems.push(`${locale}: support levels differ from en`);
}

const sources = [];
for (const entry of await readdir(path.join(root, 'src'), {
  withFileTypes: true,
  recursive: true,
})) {
  const file = path.join(entry.parentPath, entry.name);
  if (
    entry.isFile() &&
    /\.(astro|ts)$/.test(entry.name) &&
    !file.includes(`${path.sep}i18n${path.sep}`)
  ) {
    sources.push(await readFile(file, 'utf8'));
  }
}
const allSources = sources.join('\n');
for (const [section, keys] of Object.entries(en)) {
  for (const key of Object.keys(keys)) {
    if (!new RegExp(`\\.${key}\\b`).test(allSources))
      problems.push(`unused key: ${section}.${key}`);
  }
}

if (problems.length === 0) {
  console.log(`${locales.length} locales in parity; every dictionary key is read.`);
} else {
  for (const problem of problems) console.log(`  ✗ ${problem}`);
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
