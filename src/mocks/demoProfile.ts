import { ZODIAC_SIGNS } from '@/types/astrology.types';
import type { HouseCusp } from '@/types/astrology.types';
import type { Profile } from '@/types/profile.types';

/**
 * Демо-дані з макета — для секції "приклад результату" на головній,
 * поки бекенд не готовий. Числа декоративні, астрологічної точності
 * від них не чекаємо.
 */

/** Асцендент у Скорпіоні — з нього починається I будинок */
const ASCENDANT_LONGITUDE = 217.4;

const houses: HouseCusp[] = Array.from({ length: 12 }, (_, index) => ({
  house: index + 1,
  sign: ZODIAC_SIGNS[(7 + index) % 12],
  longitude: (ASCENDANT_LONGITUDE + index * 30) % 360,
}));

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
    midheaven: 127.4,
    houses,
    planets: [
      {
        planet: 'sun',
        sign: 'sagittarius',
        degree: 23.4,
        longitude: 263.4,
        house: 12,
        retrograde: false,
      },
      {
        planet: 'moon',
        sign: 'aries',
        degree: 12.8,
        longitude: 12.8,
        house: 6,
        retrograde: false,
      },
      {
        planet: 'mercury',
        sign: 'sagittarius',
        degree: 15.1,
        longitude: 255.1,
        house: 1,
        retrograde: true,
      },
      {
        planet: 'venus',
        sign: 'scorpio',
        degree: 18.9,
        longitude: 228.9,
        house: 12,
        retrograde: false,
      },
      {
        planet: 'mars',
        sign: 'libra',
        degree: 2.5,
        longitude: 182.5,
        house: 11,
        retrograde: false,
      },
    ],
    aspects: [
      { from: 'sun', to: 'moon', type: 'trine', orb: 1.4 },
      { from: 'venus', to: 'mars', type: 'square', orb: 2.1 },
    ],
  },
  destinyMatrix: {
    center: 11,
    personal: { a: 3, b: 7, c: 15, d: 20 },
    karmic: { e: 5, f: 12, g: 9, h: 18 },
    money: 8,
    love: 6,
  },
  // Довжина рядка = скільки разів цифра трапилась у даті
  pythagoreanSquare: {
    '1': '111',
    '2': '2',
    '3': '',
    '4': '44',
    '5': '55',
    '6': '6666',
    '7': '',
    '8': '8',
    '9': '999',
  },
};
