'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useLocale } from '@/i18n/LocaleProvider';
import { useProfileStore } from '@/store/useProfileStore';
import type { ProfileSummary } from '@/types/profile.types';
import { formatBirthDate } from '@/utils/dateHelpers';

import styles from './ProfileCard.module.css';

type ProfileCardProps = {
  profile: ProfileSummary;
  /** false — картка для декоративного показу кабінету (напр. на головній): без переходу й видалення */
  interactive?: boolean;
};

export const ProfileCard = ({
  profile,
  interactive = true,
}: ProfileCardProps) => {
  const { t } = useLocale();
  const remove = useProfileStore((state) => state.remove);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await remove(profile.id);
      toast.success(t.profileActions.deleteSuccess);
      setIsConfirmOpen(false);
    } catch {
      toast.error(t.profileActions.deleteError);
    } finally {
      setIsDeleting(false);
    }
  };

  const cardContent = (
    <>
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
    </>
  );

  if (!interactive) {
    return (
      <li className={styles.item}>
        <div className={styles.card}>{cardContent}</div>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <Link href={`/profile/${profile.id}`} className={styles.card}>
        {cardContent}
      </Link>

      <button
        type="button"
        className={styles.deleteBtn}
        aria-label={t.profileActions.deleteCta}
        onClick={() => setIsConfirmOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 7h14M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7h14Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

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
    </li>
  );
};
