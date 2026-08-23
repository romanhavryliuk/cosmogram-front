'use client';

import { BirthDataForm } from '@/components/birth-form/BirthDataForm';
import { Section } from '@/components/layout/Section';
import { useLocale } from '@/i18n/LocaleProvider';

type BirthDataSectionProps = {
  /** false — на /profile/new: окрема сторінка без "Крок 02" поруч, тег кроку не до речі */
  showStepTag?: boolean;
};

/** Секція форми народження — на головній (у парі "Крок 01 → Крок 02") і на /profile/new */
export const BirthDataSection = ({
  showStepTag = true,
}: BirthDataSectionProps) => {
  const { t } = useLocale();

  return (
    <Section
      id="form"
      tag={showStepTag ? t.birthForm.tag : undefined}
      heading={t.birthForm.heading}
    >
      <BirthDataForm />
    </Section>
  );
};
