export const ZODIAC_SIGNS = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export const PLANETS = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
] as const;

export type Planet = (typeof PLANETS)[number];

export type AspectType =
  | 'conjunction'
  | 'sextile'
  | 'square'
  | 'trine'
  | 'opposition';

export interface PlanetPosition {
  planet: Planet;
  sign: ZodiacSign;
  /** Градус у межах знака, 0–29.99 */
  degree: number;
  /** Абсолютна довгота на екліптиці, 0–359.99 — використовується для SVG-колеса */
  longitude: number;
  house: number;
  retrograde: boolean;
}

export interface HouseCusp {
  house: number;
  sign: ZodiacSign;
  longitude: number;
}

export interface Aspect {
  from: Planet;
  to: Planet;
  type: AspectType;
  /** Відхилення від точного аспекту в градусах */
  orb: number;
}

export interface NatalChart {
  planets: PlanetPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  ascendant: number;
  midheaven: number;
}

export interface AncestralLine {
  first: number;
  second: number;
  total: number;
}

/**
 * Матриця долі — 22 енергії, ключі відповідають позиціям на діаграмі.
 * `purpose`, `ancestralPrograms`, `familyPower` додані на бекенді пізніше:
 * профілі, створені до цього, приходять без них — рендерити опціонально.
 */
export interface DestinyMatrix {
  center: number;
  personal: { a: number; b: number; c: number; d: number };
  karmic: { e: number; f: number; g: number; h: number };
  money: number;
  love: number;
  purpose?: { personal: number; social: number; spiritual: number };
  ancestralPrograms?: { paternal: AncestralLine; maternal: AncestralLine };
  familyPower?: number;
}

/** Порядок клітинок квадрата Піфагора — зліва направо, зверху вниз */
export const PYTHAGOREAN_DIGITS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;

export type PythagoreanDigit = (typeof PYTHAGOREAN_DIGITS)[number];

/**
 * Квадрат Піфагора — рядок повторень кожної цифри 1–9.
 * Напр. `{ '1': '111', '3': '' }` — три одиниці, жодної трійки.
 */
export type PythagoreanSquare = Record<PythagoreanDigit, string>;
