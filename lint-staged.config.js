/**
 * Pre-commit gates (run by .husky/pre-commit with --hide-all, so every check
 * sees exactly what is being committed, and --concurrent false, so no check
 * reads a file while Prettier is rewriting it).
 */
export default {
  '*.{js,mjs,cjs,ts,astro,css}': ['prettier --write', 'eslint --max-warnings=0 --no-warn-ignored'],
  '*.{json,yml,yaml}': 'prettier --write',
  // `astro build` strips types unchecked, so `astro check` is the only type gate.
  'src/**/*.{ts,astro}': () => ['astro check', 'node scripts/copy-check.mjs'],
};
