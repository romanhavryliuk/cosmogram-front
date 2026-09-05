'use client';

import { ASPECT_LABELS, PLANET_LABELS, SIGN_LABELS } from '@/i18n/astroLabels';
import { useLocale } from '@/i18n/LocaleProvider';

/** Назви планет, знаків і аспектів для поточної локалі — тримаємо поза словником UI-копірайту */
export const useAstroLabels = () => {
  const { locale } = useLocale();

  return {
    planet: PLANET_LABELS[locale],
    sign: SIGN_LABELS[locale],
    aspect: ASPECT_LABELS[locale],
  };
};
