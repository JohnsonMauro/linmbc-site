/** URL segment of each locale; the app's own catalogs use the same ten languages. */
export const LOCALES = ['en', 'pt-br', 'es', 'fr', 'de', 'ru', 'pl', 'ja', 'ko', 'zh-cn'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Name of each language in that language, as the app's language picker shows it. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  'pt-br': 'Português (Brasil)',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
  pl: 'Polski',
  ja: '日本語',
  ko: '한국어',
  'zh-cn': '简体中文',
};

/** BCP 47 tags for <html lang>, hreflang and the sitemap. */
export const HREFLANG_TAGS: Record<Locale, string> = {
  en: 'en',
  'pt-br': 'pt-BR',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
  pl: 'pl',
  ja: 'ja',
  ko: 'ko',
  'zh-cn': 'zh-CN',
};

/** og:locale values. */
export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  'pt-br': 'pt_BR',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ru: 'ru_RU',
  pl: 'pl_PL',
  ja: 'ja_JP',
  ko: 'ko_KR',
  'zh-cn': 'zh_CN',
};

/** Flag files in public/flags (English = US flag, as in the app). */
export const LOCALE_FLAGS: Record<Locale, string> = {
  en: 'flags/us.svg',
  'pt-br': 'flags/br.svg',
  es: 'flags/es.svg',
  fr: 'flags/fr.svg',
  de: 'flags/de.svg',
  ru: 'flags/ru.svg',
  pl: 'flags/pl.svg',
  ja: 'flags/jp.svg',
  ko: 'flags/kr.svg',
  'zh-cn': 'flags/cn.svg',
};

/** Suffix of the app screenshots in public/screenshots (the app's catalog names). */
export const SCREENSHOT_SUFFIX: Record<Locale, string> = {
  en: 'en',
  'pt-br': 'pt_BR',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
  pl: 'pl',
  ja: 'ja',
  ko: 'ko',
  'zh-cn': 'zh_CN',
};

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}
