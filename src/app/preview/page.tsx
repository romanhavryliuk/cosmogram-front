'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ChartResult } from '@/components/cosmogram/ChartResult';
import { CreateChartLink } from '@/components/dashboard/CreateChartLink';
import { Section } from '@/components/layout/Section';
import { PageLoader } from '@/components/ui/PageLoader';
import { useLocale } from '@/i18n/LocaleProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { usePreviewStore } from '@/store/usePreviewStore';

import styles from './page.module.css';

export default function PreviewPage() {
  const { t } = useLocale();
  const result = usePreviewStore((state) => state.result);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  // Результат лежить у sessionStorage, якого на сервері немає: до монтування
  // показуємо лоадер, інакше SSR і перший клієнтський рендер розійдуться
  useEffect(() => setIsMounted(true), []);

  const renderContent = () => {
    if (!isMounted) return <PageLoader />;

    if (!result) {
      return (
        <div className={styles.empty}>
          <h3 className={styles.emptyTitle}>{t.guest.emptyTitle}</h3>
          <p className={styles.emptyText}>{t.guest.emptyText}</p>
          <CreateChartLink label={t.guest.emptyCta} />
        </div>
      );
    }

    return (
      <>
        <aside className={styles.save}>
          <div>
            <h3 className={styles.saveTitle}>{t.guest.saveTitle}</h3>
            <p className={styles.saveText}>{t.guest.saveText}</p>
          </div>
          {/* Будь-який вхід веде в кабінет, а кабінет сам збереже цю карту */}
          {isAuthenticated ? (
            <Link href="/profile" className={styles.primary}>
              {t.guest.saveTitle}
            </Link>
          ) : (
            <div className={styles.saveActions}>
              <Link href="/register" className={styles.primary}>
                {t.nav.signUp}
              </Link>
              <Link href="/login" className={styles.secondary}>
                {t.nav.login}
              </Link>
            </div>
          )}
        </aside>
        <ChartResult profile={result} />
      </>
    );
  };

  return (
    <Section id="result" heading={t.guest.heading}>
      {renderContent()}
    </Section>
  );
}
