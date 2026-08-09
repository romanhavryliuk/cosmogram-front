'use client';

import { Container } from '@/components/layout/Container';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './HowItWorks.module.css';

export const HowItWorks = () => {
  const { t } = useLocale();

  return (
    <section id="how" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <div>
            <div className={styles.tag}>{t.howItWorks.tag}</div>
            <h2 className={styles.title}>{t.howItWorks.heading}</h2>
          </div>
        </div>
        <div className={styles.steps}>
          {t.howItWorks.steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={`${styles.num} mono`}>{step.num}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
