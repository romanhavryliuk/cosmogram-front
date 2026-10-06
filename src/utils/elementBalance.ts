import { ELEMENTS, SIGN_ELEMENT } from '@/i18n/elementReadings';
import type { Element } from '@/i18n/elementReadings';
import type { PlanetPosition } from '@/types/astrology.types';

export const countByElement = (planets: PlanetPosition[]) => {
  const counts: Record<Element, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  planets.forEach(({ sign }) => {
    counts[SIGN_ELEMENT[sign]] += 1;
  });
  return counts;
};

/** Стихії з найбільшою кількістю планет; при рівності — усі лідери */
export const getDominantElements = (counts: Record<Element, number>) => {
  const max = Math.max(...ELEMENTS.map((element) => counts[element]));
  return ELEMENTS.filter((element) => counts[element] === max);
};
