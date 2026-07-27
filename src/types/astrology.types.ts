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

/** Матриця долі — 22 енергії, ключі відповідають позиціям на діаграмі */
export interface DestinyMatrix {
  center: number;
  personal: { a: number; b: number; c: number; d: number };
  karmic: { e: number; f: number; g: number; h: number };
  money: number;
  love: number;
}

/** Квадрат Піфагора — кількість повторень кожної цифри 1–9 */
export type PythagoreanSquare = Record<
  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9',
  string
>;
