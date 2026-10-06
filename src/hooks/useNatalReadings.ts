'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { NATAL_READINGS, isHouseNumber } from '@/i18n/natalReadings';

/** Тлумачення планет, знаків, домів і аспектів для поточної локалі */
export const useNatalReadings = () => {
  const { locale } = useLocale();
  const readings = NATAL_READINGS[locale];

  /** null для дому поза 1–12: бекенд такого не віддає, але падати не варто */
  const getHouse = (house: number) =>
    isHouseNumber(house) ? readings.house[house] : null;

  return { ...readings, getHouse };
};
