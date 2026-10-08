import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import css from '@eslint/css';
import { tailwind4 } from 'tailwind-csstree';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/', 'scripts/'],
  },

  // JS/TS rule sets carry no `files` of their own, so unscoped they would also
  // run on the CSS language below and crash on its source code.
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}'],
    extends: [js.configs.recommended, tseslint.configs.strict, tseslint.configs.stylistic],
  },

  {
    files: ['**/*.{ts,js,mjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },

  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-strict'],

  {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Stylesheets: the CSS language, taught Tailwind 4's at-rules so they parse.
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    languageOptions: { customSyntax: tailwind4 },
    extends: ['css/recommended'],
    rules: {
      'css/use-baseline': ['error', { allowSelectors: ['selection'] }],
    },
  },
);
