'use client';

import Link from 'next/link';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './EmptyState.module.css';

export const EmptyState = () => {
  const { t } = useLocale();

  return (
    <div className={styles.empty}>
      <ZodiacWheel
        size={96}
        lineColor="var(--teal-dim)"
        glyphColor="var(--muted)"
      />
      <h3 className={styles.title}>{t.dashboard.emptyTitle}</h3>
      <p className={styles.text}>{t.dashboard.emptyText}</p>
      <Link href="/profile/new" className={styles.cta}>
        {t.dashboard.emptyCta}
      </Link>
    </div>
  );
};
