'use client';

import Link from 'next/link';

import { BirthDataForm } from '@/components/birth-form/BirthDataForm';
import { Section } from '@/components/layout/Section';
import { ErrorState } from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/PageLoader';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './page.module.css';

type EditProfilePageProps = {
  params: { id: string };
};

export default function EditProfilePage({ params }: EditProfilePageProps) {
  const { t } = useLocale();
  useAuth({ redirectIfUnauthenticated: true });
  const { profile, isLoading, error, refetch } = useProfile(params.id);

  const renderContent = () => {
    // key: форма бере значення лише при монтуванні — новий профіль = нова форма
    if (profile) return <BirthDataForm key={profile.id} profile={profile} />;
    if (isLoading) return <PageLoader />;

    return (
      <ErrorState
        title={t.errorState.profileTitle}
        text={t.errorState.profileText}
        detail={error}
        retryLabel={t.errorState.retryCta}
        onRetry={refetch}
        action={
          <Link href="/profile" className={styles.backLink}>
            {t.errorState.backToListCta}
          </Link>
        }
      />
    );
  };

  return (
    <Section id="form" heading={t.editProfile.heading}>
      {renderContent()}
    </Section>
  );
}
