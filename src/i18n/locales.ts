export const LOCALES = ['en', 'uk', 'pl'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  uk: 'Українська',
  pl: 'Polski',
};

/**
 * Підписи для людей, не коди. Код української мови за ISO 639-1 — `uk`,
 * і він лишається в коді (lang, Intl, hreflang). Але «UK» у перемикачі
 * читається як United Kingdom, тож показуємо звичне «UA»
 */
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: 'EN',
  uk: 'UA',
  pl: 'PL',
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);
