'use client';

import { CreateChartLink } from '@/components/dashboard/CreateChartLink';
import { ProfileGrid } from '@/components/dashboard/ProfileGrid';
import { Section } from '@/components/layout/Section';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAuth } from '@/hooks/useAuth';
import { useProfiles } from '@/hooks/useProfile';
import { useLocale } from '@/i18n/LocaleProvider';

export default function ProfileListPage() {
  const { t } = useLocale();
  useAuth({ redirectIfUnauthenticated: true });
  const { items, isLoading, error, refetch } = useProfiles();

  // Помилку показуємо, лише коли показувати більше нічого: якщо в сторі лишився
  // попередній список, краще віддати його, ніж ховати дані за помилкою
  const hasFailed = Boolean(error) && !isLoading && items.length === 0;

  return (
    <Section
      id="dashboard"
      tag={t.dashboard.tag}
      heading={t.dashboard.heading}
      aside={<CreateChartLink />}
    >
      {hasFailed ? (
        <ErrorState
          title={t.errorState.listTitle}
          text={t.errorState.listText}
          detail={error}
          retryLabel={t.errorState.retryCta}
          onRetry={() => void refetch()}
        />
      ) : (
        <ProfileGrid profiles={items} isLoading={isLoading} />
      )}
    </Section>
  );
}
