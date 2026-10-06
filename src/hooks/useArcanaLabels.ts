'use client';

import { ARCANA_LABELS } from '@/i18n/arcana';
import type { ArcanaEntry } from '@/i18n/arcana';
import { useLocale } from '@/i18n/LocaleProvider';
import { isArcanaNumber } from '@/types/astrology.types';

/** Тлумачення арканів для поточної локалі, з безпечним доступом за числом */
export const useArcanaLabels = () => {
  const { locale } = useLocale();
  const arcana = ARCANA_LABELS[locale];

  /** null для значення поза 1–22: такого бути не має, але падати через це не варто */
  const getArcana = (value: number): ArcanaEntry | null =>
    isArcanaNumber(value) ? arcana[value] : null;

  return { arcana, getArcana };
};
