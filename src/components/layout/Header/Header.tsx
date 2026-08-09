'use client';

import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './Header.module.css';

export const Header = () => {
  const { t } = useLocale();

  return (
    <Container as="header" className={styles.header}>
      <Link href="/" className={styles.logo}>
        <svg className={styles.mark} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#d9b34d" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="2" fill="#d9b34d" />
        </svg>
        <span className="display">Cosmogram</span>
      </Link>
      <nav className={styles.nav}>
        <Link href="/login">{t.nav.login}</Link>
        <Link href="/#how">{t.nav.howItWorks}</Link>
        <LanguageSwitcher />
      </nav>
    </Container>
  );
};
