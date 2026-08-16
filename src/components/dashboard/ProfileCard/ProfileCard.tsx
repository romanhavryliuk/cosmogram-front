import Link from 'next/link';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import type { ProfileSummary } from '@/types/profile.types';
import { formatBirthDate } from '@/utils/dateHelpers';

import styles from './ProfileCard.module.css';

type ProfileCardProps = {
  profile: ProfileSummary;
};

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <li>
      <Link href={`/profile/${profile.id}`} className={styles.card}>
        <ZodiacWheel
          size={56}
          lineColor="var(--teal)"
          className={styles.wheel}
        />
        <div>
          <h4 className={styles.name}>{profile.name}</h4>
          <p className={`${styles.meta} mono`}>
            {formatBirthDate(profile.birthDate)} · {profile.place.label}
          </p>
        </div>
      </Link>
    </li>
  );
};
