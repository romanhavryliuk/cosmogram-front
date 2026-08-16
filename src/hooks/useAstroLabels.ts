'use client';

import { PLANET_LABELS, SIGN_LABELS } from '@/i18n/astroLabels';
import { useLocale } from '@/i18n/LocaleProvider';

/** Назви планет і знаків для поточної локалі — тримаємо поза словником UI-копірайту */
export const useAstroLabels = () => {
  const { locale } = useLocale();

  return {
    planet: PLANET_LABELS[locale],
    sign: SIGN_LABELS[locale],
  };
};
