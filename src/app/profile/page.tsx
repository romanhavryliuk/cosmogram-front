'use client';

import { CreateChartLink } from '@/components/dashboard/CreateChartLink';
import { ProfileGrid } from '@/components/dashboard/ProfileGrid';
import { Section } from '@/components/layout/Section';
import { useAuth } from '@/hooks/useAuth';
import { useProfiles } from '@/hooks/useProfile';
import { useLocale } from '@/i18n/LocaleProvider';

export default function ProfileListPage() {
  const { t } = useLocale();
  useAuth({ redirectIfUnauthenticated: true });
  const { items, isLoading } = useProfiles();

  return (
    <Section
      id="dashboard"
      tag={t.dashboard.tag}
      heading={t.dashboard.heading}
      aside={<CreateChartLink />}
    >
      <ProfileGrid profiles={items} isLoading={isLoading} />
    </Section>
  );
}
