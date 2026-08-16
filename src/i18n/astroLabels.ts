import type { Planet, ZodiacSign } from '@/types/astrology.types';

import type { Locale } from './locales';

/** Гліфи однакові для всіх мов — тримаємо окремо від перекладів */
export const PLANET_GLYPHS: Record<Planet, string> = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

export const SIGN_GLYPHS: Record<ZodiacSign, string> = {
  aries: '♈',
  taurus: '♉',
  gemini: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  scorpio: '♏',
  sagittarius: '♐',
  capricorn: '♑',
  aquarius: '♒',
  pisces: '♓',
};

/** Позначка ретроградного руху */
export const RETROGRADE_GLYPH = '℞';

export const PLANET_LABELS: Record<Locale, Record<Planet, string>> = {
  en: {
    sun: 'Sun',
    moon: 'Moon',
    mercury: 'Mercury',
    venus: 'Venus',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus',
    neptune: 'Neptune',
    pluto: 'Pluto',
  },
  uk: {
    sun: 'Сонце',
    moon: 'Місяць',
    mercury: 'Меркурій',
    venus: 'Венера',
    mars: 'Марс',
    jupiter: 'Юпітер',
    saturn: 'Сатурн',
    uranus: 'Уран',
    neptune: 'Нептун',
    pluto: 'Плутон',
  },
  pl: {
    sun: 'Słońce',
    moon: 'Księżyc',
    mercury: 'Merkury',
    venus: 'Wenus',
    mars: 'Mars',
    jupiter: 'Jowisz',
    saturn: 'Saturn',
    uranus: 'Uran',
    neptune: 'Neptun',
    pluto: 'Pluton',
  },
};

export const SIGN_LABELS: Record<Locale, Record<ZodiacSign, string>> = {
  en: {
    aries: 'Aries',
    taurus: 'Taurus',
    gemini: 'Gemini',
    cancer: 'Cancer',
    leo: 'Leo',
    virgo: 'Virgo',
    libra: 'Libra',
    scorpio: 'Scorpio',
    sagittarius: 'Sagittarius',
    capricorn: 'Capricorn',
    aquarius: 'Aquarius',
    pisces: 'Pisces',
  },
  uk: {
    aries: 'Овен',
    taurus: 'Телець',
    gemini: 'Близнюки',
    cancer: 'Рак',
    leo: 'Лев',
    virgo: 'Діва',
    libra: 'Терези',
    scorpio: 'Скорпіон',
    sagittarius: 'Стрілець',
    capricorn: 'Козеріг',
    aquarius: 'Водолій',
    pisces: 'Риби',
  },
  pl: {
    aries: 'Baran',
    taurus: 'Byk',
    gemini: 'Bliźnięta',
    cancer: 'Rak',
    leo: 'Lew',
    virgo: 'Panna',
    libra: 'Waga',
    scorpio: 'Skorpion',
    sagittarius: 'Strzelec',
    capricorn: 'Koziorożec',
    aquarius: 'Wodnik',
    pisces: 'Ryby',
  },
};
