'use client';

import { BirthDataForm } from '@/components/birth-form/BirthDataForm';
import { Section } from '@/components/layout/Section';
import { useLocale } from '@/i18n/LocaleProvider';

/** Секція "Крок 01" — і на головній, і на /profile/new */
export const BirthDataSection = () => {
  const { t } = useLocale();

  return (
    <Section id="form" tag={t.birthForm.tag} heading={t.birthForm.heading}>
      <BirthDataForm />
    </Section>
  );
};
