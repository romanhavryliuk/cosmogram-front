'use client';

import { ChartResult } from '@/components/cosmogram/ChartResult';
import { Section } from '@/components/layout/Section';
import { useLocale } from '@/i18n/LocaleProvider';
import { demoProfile } from '@/mocks/demoProfile';

/** Секція "Крок 02" на головній — приклад результату на демо-даних */
export const ResultSection = () => {
  const { t } = useLocale();

  return (
    <Section id="result" tag={t.result.tag} heading={t.result.heading}>
      <ChartResult profile={demoProfile} />
    </Section>
  );
};
