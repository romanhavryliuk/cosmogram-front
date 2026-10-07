import type { HouseCusp } from '@/types/astrology.types';
import type { Profile, ProfileSummary } from '@/types/profile.types';

/**
 * Приклад результату на головній. Це справжній розрахунок бекенду для
 * 15.03.1998, 14:30, Львів (градуси округлені до десятих) — а не
 * декоративні числа: приклад, де Сонце 15 березня у Стрільці, виглядав би
 * так, ніби сайт рахує неправильно. Якщо формули на бекенді зміняться,
 * дані тут треба перерахувати.
 */

const ASCENDANT_LONGITUDE = 133.1;

const houses: HouseCusp[] = [
  { house: 1, sign: 'leo', longitude: 133.1 },
  { house: 2, sign: 'virgo', longitude: 151.3 },
  { house: 3, sign: 'virgo', longitude: 174.8 },
  { house: 4, sign: 'libra', longitude: 206.4 },
  { house: 5, sign: 'sagittarius', longitude: 245.5 },
  { house: 6, sign: 'capricorn', longitude: 283.2 },
  { house: 7, sign: 'aquarius', longitude: 313.1 },
  { house: 8, sign: 'pisces', longitude: 331.3 },
  { house: 9, sign: 'pisces', longitude: 354.8 },
  { house: 10, sign: 'aries', longitude: 26.4 },
  { house: 11, sign: 'gemini', longitude: 65.5 },
  { house: 12, sign: 'cancer', longitude: 103.2 },
];

export const demoProfile: Profile = {
  id: 'demo-1',
  ownerId: 'demo-owner',
  name: 'Maria',
  birthDate: '1998-03-15',
  birthTime: '14:30',
  place: {
    label: 'Lviv, Ukraine',
    latitude: 49.8397,
    longitude: 24.0297,
    timezone: 'Europe/Kyiv',
  },
  createdAt: '2026-07-01T10:00:00.000Z',
  chart: {
    ascendant: ASCENDANT_LONGITUDE,
    midheaven: 26.4,
    houses,
    planets: [
      { planet: 'sun', sign: 'pisces', degree: 24.7, longitude: 354.7, house: 8, retrograde: false },
      { planet: 'moon', sign: 'libra', degree: 20, longitude: 200, house: 3, retrograde: false },
      { planet: 'mercury', sign: 'aries', degree: 12.1, longitude: 12.1, house: 9, retrograde: false },
      { planet: 'venus', sign: 'aquarius', degree: 8.9, longitude: 308.9, house: 6, retrograde: false },
      { planet: 'mars', sign: 'aries', degree: 8.4, longitude: 8.4, house: 9, retrograde: false },
      { planet: 'jupiter', sign: 'pisces', degree: 9.4, longitude: 339.4, house: 8, retrograde: false },
      { planet: 'saturn', sign: 'aries', degree: 19.8, longitude: 19.8, house: 9, retrograde: false },
      { planet: 'uranus', sign: 'aquarius', degree: 11.2, longitude: 311.2, house: 6, retrograde: false },
      { planet: 'neptune', sign: 'aquarius', degree: 1.5, longitude: 301.5, house: 6, retrograde: false },
      { planet: 'pluto', sign: 'sagittarius', degree: 8.1, longitude: 248.1, house: 5, retrograde: true },
    ],
    aspects: [
      { from: 'moon', to: 'mercury', type: 'opposition', orb: 7.9 },
      { from: 'moon', to: 'saturn', type: 'opposition', orb: 0.2 },
      { from: 'mercury', to: 'venus', type: 'sextile', orb: 3.2 },
      { from: 'mercury', to: 'mars', type: 'conjunction', orb: 3.7 },
      { from: 'mercury', to: 'saturn', type: 'conjunction', orb: 7.7 },
      { from: 'mercury', to: 'uranus', type: 'sextile', orb: 0.9 },
      { from: 'mercury', to: 'pluto', type: 'trine', orb: 4 },
      { from: 'venus', to: 'mars', type: 'sextile', orb: 0.5 },
      { from: 'venus', to: 'uranus', type: 'conjunction', orb: 2.3 },
      { from: 'venus', to: 'neptune', type: 'conjunction', orb: 7.4 },
      { from: 'venus', to: 'pluto', type: 'sextile', orb: 0.8 },
      { from: 'mars', to: 'uranus', type: 'sextile', orb: 2.8 },
      { from: 'mars', to: 'pluto', type: 'trine', orb: 0.3 },
      { from: 'jupiter', to: 'pluto', type: 'square', orb: 1.3 },
      { from: 'uranus', to: 'pluto', type: 'sextile', orb: 3.1 },
    ],
  },
  destinyMatrix: {
    center: 9,
    personal: { a: 15, b: 3, c: 9, d: 9 },
    karmic: { e: 18, f: 12, g: 18, h: 6 },
    purpose: { personal: 18, social: 9, spiritual: 9 },
    ancestralPrograms: {
      paternal: { first: 18, second: 18, total: 9 },
      maternal: { first: 12, second: 6, total: 18 },
    },
    familyPower: 9,
    money: 18,
    love: 18,
  },
  // Довжина рядка = скільки разів цифра трапилась у даті й робочих числах
  pythagoreanSquare: {
    '1': '11',
    '2': '',
    '3': '333',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '999',
  },
};

/** Демо-картки для секції кабінету на головній */
export const demoProfiles: ProfileSummary[] = [
  {
    id: demoProfile.id,
    name: demoProfile.name,
    birthDate: demoProfile.birthDate,
    createdAt: demoProfile.createdAt,
    place: { label: 'Lviv' },
  },
  {
    id: 'demo-2',
    name: 'Oleh',
    birthDate: '1995-11-02',
    createdAt: '2026-07-03T18:20:00.000Z',
    place: { label: 'Odesa' },
  },
  {
    id: 'demo-3',
    name: 'Iryna',
    birthDate: '2001-07-27',
    createdAt: '2026-07-05T09:05:00.000Z',
    place: { label: 'Kyiv' },
  },
];
