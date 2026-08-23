import { EmptyState } from '@/components/dashboard/EmptyState';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { Loader } from '@/components/ui/Loader';
import type { ProfileSummary } from '@/types/profile.types';

import styles from './ProfileGrid.module.css';

type ProfileGridProps = {
  profiles: ProfileSummary[];
  isLoading?: boolean;
  /** false — картки лише для показу (напр. декоративний кабінет на головній) */
  interactive?: boolean;
};

export const ProfileGrid = ({
  profiles,
  isLoading = false,
  interactive = true,
}: ProfileGridProps) => {
  // Лоадер лише на першому завантаженні — при рефетчі показуємо наявні картки
  if (isLoading && profiles.length === 0) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  if (profiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className={styles.grid}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          interactive={interactive}
        />
      ))}
    </ul>
  );
};
