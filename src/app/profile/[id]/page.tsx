'use client';

import { ChartResult } from '@/components/cosmogram/ChartResult';
import { Section } from '@/components/layout/Section';
import { Loader } from '@/components/ui/Loader';
import { useProfile } from '@/hooks/useProfile';
import { useLocale } from '@/i18n/LocaleProvider';

interface ProfileResultPageProps {
  params: { id: string };
}

export default function ProfileResultPage({ params }: ProfileResultPageProps) {
  const { t } = useLocale();
  const { profile, isLoading } = useProfile(params.id);

  const renderContent = () => {
    if (profile) return <ChartResult profile={profile} />;
    if (isLoading) return <Loader />;
    return null;
  };

  return (
    <Section id="result" tag={t.result.tag} heading={t.result.heading}>
      {renderContent()}
    </Section>
  );
}
