'use client';

import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './Hero.module.css';

export const Hero = () => {
  const { t } = useLocale();

  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>{t.hero.eyebrow}</div>
          <h1 className={styles.title}>
            {t.hero.titleBefore}
            <em>{t.hero.titleEmphasis}</em>
            {t.hero.titleAfter}
          </h1>
          <p className={styles.lead}>{t.hero.lead}</p>
          <div className={styles.actions}>
            <Link href="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
              {t.hero.primaryCta}
            </Link>
            <a href="#how" className={`${styles.btn} ${styles.btnGhost}`}>
              {t.hero.ghostCta}
            </a>
          </div>
        </div>
        <div className={styles.wheelStage}>
          <ZodiacWheel size={320} decorative animated />
        </div>
      </Container>
    </section>
  );
};
