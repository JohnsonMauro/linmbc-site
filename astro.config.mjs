import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { LOCALES, DEFAULT_LOCALE, HREFLANG_TAGS } from './src/i18n/config.ts';

export default defineConfig({
  site: 'https://johnsonmauro.github.io',
  base: '/linmbc-site',
  trailingSlash: 'ignore',
  output: 'static',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: DEFAULT_LOCALE, locales: { ...HREFLANG_TAGS } },
    }),
  ],
});
