import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';

import styles from './AuthLayout.module.css';

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
  switchText: string;
  switchLinkText: string;
  switchHref: string;
};

export const AuthLayout = ({
  title,
  children,
  switchText,
  switchLinkText,
  switchHref,
}: AuthLayoutProps) => {
  return (
    <section className={styles.section}>
      <Container className={styles.wrap}>
        <div className={styles.panel}>
          <h1 className={styles.title}>{title}</h1>
          {children}
          <p className={styles.switch}>
            {switchText} <Link href={switchHref}>{switchLinkText}</Link>
          </p>
        </div>
      </Container>
    </section>
  );
};
