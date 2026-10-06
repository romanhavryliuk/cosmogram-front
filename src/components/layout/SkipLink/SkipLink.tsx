'use client';

import { useLocale } from '@/i18n/LocaleProvider';

import styles from './SkipLink.module.css';

/**
 * Перше, на що потрапляє Tab: дає користувачу клавіатури чи скрінрідера
 * перескочити шапку й одразу опинитись у вмісті. Видиме лише у фокусі.
 */
export const SkipLink = () => {
  const { t } = useLocale();

  return (
    <a href="#main" className={styles.link}>
      {t.nav.skipToContent}
    </a>
  );
};
