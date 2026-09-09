'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Link from 'next/link';

import { ChartResult } from '@/components/cosmogram/ChartResult';
import { CreateChartLink } from '@/components/dashboard/CreateChartLink';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ErrorState } from '@/components/ui/ErrorState';
import { Loader } from '@/components/ui/Loader';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useLocale } from '@/i18n/LocaleProvider';
import { useProfileStore } from '@/store/useProfileStore';

import styles from './page.module.css';

interface ProfileResultPageProps {
  params: { id: string };
}

// Дефолтний лоадер розрахований на золоту кнопку — на темній сторінці його не видно
const LOADER_STYLE = {
  ['--loader-size' as string]: '26px',
  ['--loader-color' as string]: 'var(--gold)',
  ['--loader-track' as string]: 'rgba(217, 179, 77, 0.2)',
};

export default function ProfileResultPage({ params }: ProfileResultPageProps) {
  const { t } = useLocale();
  const router = useRouter();
  useAuth({ redirectIfUnauthenticated: true });
  const { profile, isLoading, error, refetch } = useProfile(params.id);
  const remove = useProfileStore((state) => state.remove);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await remove(params.id);
      toast.success(t.profileActions.deleteSuccess);
      router.push('/profile');
    } catch {
      toast.error(t.profileActions.deleteError);
      setIsDeleting(false);
    }
  };

  const renderContent = () => {
    if (profile) {
      return (
        <>
          <ChartResult profile={profile} />
          <div className={styles.actions}>
            <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
              {t.profileActions.deleteCta}
            </Button>
            <CreateChartLink />
          </div>
        </>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.loading}>
          <Loader style={LOADER_STYLE} />
        </div>
      );
    }

    // Профіль не завантажився: видалений, чужий, або бекенд недоступний —
    // раніше тут лишалась порожня сторінка з самим заголовком
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
    <Section id="result" heading={t.result.heading}>
      {renderContent()}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title={t.profileActions.deleteConfirmTitle}
        description={t.profileActions.deleteConfirmDescription}
        confirmLabel={t.profileActions.deleteConfirmAction}
        cancelLabel={t.profileActions.deleteCancelAction}
        isLoading={isDeleting}
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </Section>
  );
}
