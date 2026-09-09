'use client';

import Link from 'next/link';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { Container } from '@/components/layout/Container';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './not-found.module.css';

export default function NotFound() {
  const { t } = useLocale();

  return (
    <section className={styles.section}>
      <Container className={styles.wrap}>
        <ZodiacWheel
          size={110}
          lineColor="var(--teal-dim)"
          glyphColor="var(--muted)"
        />
        <p className={`${styles.code} mono`}>404</p>
        <h1 className={styles.title}>{t.notFound.title}</h1>
        <p className={styles.text}>{t.notFound.text}</p>
        <Link href="/" className={styles.cta}>
          {t.notFound.cta}
        </Link>
      </Container>
    </section>
  );
}
