export const LOCALES = ['en', 'uk', 'pl'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  uk: 'Українська',
  pl: 'Polski',
};

export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: 'EN',
  uk: 'UK',
  pl: 'PL',
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);
