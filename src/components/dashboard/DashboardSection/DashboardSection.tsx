'use client';

import { ProfileGrid } from '@/components/dashboard/ProfileGrid';
import { Section } from '@/components/layout/Section';
import { useLocale } from '@/i18n/LocaleProvider';
import { demoProfiles } from '@/mocks/demoProfile';

/** Секція "Кабінет" на головній — приклад збережених карт на демо-даних */
export const DashboardSection = () => {
  const { t } = useLocale();

  return (
    <Section id="dashboard" tag={t.dashboard.tag} heading={t.dashboard.heading}>
      <ProfileGrid profiles={demoProfiles} interactive={false} />
    </Section>
  );
};
