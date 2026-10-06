'use client';

import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ErrorState } from '@/components/ui/ErrorState';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './error.module.css';

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Межа помилок для всіх роутів під root layout. Рендериться всередині
 * layout, тому LocaleProvider доступний і текст лишається перекладеним.
 */
export default function AppError({ error, reset }: AppErrorProps) {
  const { t } = useLocale();

  // У проді Next не віддає клієнту текст серверної помилки — лишається
  // тільки digest, тож показуємо саме його: з ним можна знайти запис у логах
  const detail = error.digest
    ? `${t.errorState.crashCodePrefix} ${error.digest}`
    : null;

  return (
    <section className={styles.section}>
      <Container>
        <ErrorState
          title={t.errorState.crashTitle}
          text={t.errorState.crashText}
          detail={detail}
          retryLabel={t.errorState.retryCta}
          onRetry={reset}
          action={
            <Link href="/" className={styles.homeLink}>
              {t.notFound.cta}
            </Link>
          }
        />
      </Container>
    </section>
  );
}
