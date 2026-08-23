'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { Container } from '@/components/layout/Container';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './Header.module.css';

export const Header = () => {
  const { t } = useLocale();
  const { user, isAuthenticated, isHydrating, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    router.push('/');
  };

  return (
    <Container as="header" className={styles.header} ref={rootRef}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        <svg className={styles.mark} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#d9b34d" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="2" fill="#d9b34d" />
        </svg>
        <span className="display">Cosmogram</span>
      </Link>

      <button
        type="button"
        className={styles.menuToggle}
        aria-expanded={isMenuOpen}
        aria-controls="header-nav"
        aria-label={t.nav.menu}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {isMenuOpen ? (
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      <nav id="header-nav" className={clsx(styles.nav, isMenuOpen && styles.navOpen)}>
        {isHydrating ? (
          // Токен ще підіймається з localStorage — нейтральний плейсхолдер,
          // щоб не блимнути "не залогінений", а за мить — реальним станом
          <span className={styles.authPlaceholder} aria-hidden="true" />
        ) : isAuthenticated ? (
          <>
            <Link href="/profile" className={styles.profileLink} onClick={closeMenu}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M4 20c0-4 3.5-6 8-6s8 2 8 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              {user?.name}
            </Link>
            <button type="button" className={styles.navButton} onClick={() => void handleLogout()}>
              {t.nav.logout}
            </button>
          </>
        ) : (
          <>
            <Link href="/login" onClick={closeMenu}>
              {t.nav.login}
            </Link>
            <Link href="/register" onClick={closeMenu}>
              {t.nav.signUp}
            </Link>
          </>
        )}
        <Link href="/#how" onClick={closeMenu}>
          {t.nav.howItWorks}
        </Link>
        <LanguageSwitcher />
      </nav>
    </Container>
  );
};
