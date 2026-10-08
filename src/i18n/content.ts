import type { Locale } from './config';
import type { Dict } from './dict';
import en from './locales/en';
import ptBr from './locales/pt-br';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';
import ru from './locales/ru';
import pl from './locales/pl';
import ja from './locales/ja';
import ko from './locales/ko';
import zhCn from './locales/zh-cn';

const content: Record<Locale, Dict> = {
  en,
  'pt-br': ptBr,
  es,
  fr,
  de,
  ru,
  pl,
  ja,
  ko,
  'zh-cn': zhCn,
};

export function getDict(lang: Locale): Dict {
  return content[lang];
}
