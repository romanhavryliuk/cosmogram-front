'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { ChartResult } from '@/components/cosmogram/ChartResult';
import { CreateChartLink } from '@/components/dashboard/CreateChartLink';
import { Section } from '@/components/layout/Section';
import { ErrorState } from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/PageLoader';
import { useLocale } from '@/i18n/LocaleProvider';
import { profileService } from '@/services/profileService';
import type { SharedProfile } from '@/types/profile.types';

import styles from './page.module.css';

type SharePageProps = {
  params: { shareId: string };
};

const NOT_FOUND = 404;

/** 404 і збій мережі — різні речі: на перше «спробувати ще раз» не допоможе */
type ShareState =
  | { status: 'loading' }
  | { status: 'ready'; profile: SharedProfile }
  | { status: 'unavailable' }
  | { status: 'error' };

export default function SharedChartPage({ params }: SharePageProps) {
  const { t } = useLocale();
  const [state, setState] = useState<ShareState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const profile = await profileService.getShared(params.shareId);
      setState({ status: 'ready', profile });
    } catch (error) {
      const isMissing =
        axios.isAxiosError(error) && error.response?.status === NOT_FOUND;
      setState({ status: isMissing ? 'unavailable' : 'error' });
    }
  }, [params.shareId]);

  useEffect(() => {
    void load();
  }, [load]);

  const renderContent = () => {
    switch (state.status) {
      case 'loading':
        return <PageLoader />;
      case 'unavailable':
        return (
          <ErrorState
            title={t.share.unavailableTitle}
            text={t.share.unavailableText}
            action={<CreateChartLink label={t.share.publicCta} />}
          />
        );
      case 'error':
        return (
          <ErrorState
            title={t.errorState.profileTitle}
            text={t.errorState.profileText}
            retryLabel={t.errorState.retryCta}
            onRetry={() => void load()}
          />
        );
      case 'ready':
        return (
          <>
            <p className={styles.owner}>{state.profile.name}</p>
            <ChartResult profile={state.profile} />
            <div className={styles.cta}>
              <CreateChartLink label={t.share.publicCta} />
            </div>
          </>
        );
    }
  };

  return (
    <Section id="result" heading={t.share.publicHeading}>
      {renderContent()}
    </Section>
  );
}
