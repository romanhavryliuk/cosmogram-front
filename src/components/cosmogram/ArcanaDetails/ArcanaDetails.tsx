'use client';

import { useArcanaLabels } from '@/hooks/useArcanaLabels';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './ArcanaDetails.module.css';

type ArcanaDetailsProps = {
  /** Обране число матриці, або null — поки користувач нічого не натиснув */
  value: number | null;
  /** Підпис позиції: «Центр», «Особистий аркан» тощо */
  sourceLabel?: string;
};

export const ArcanaDetails = ({ value, sourceLabel }: ArcanaDetailsProps) => {
  const { t } = useLocale();
  const { getArcana } = useArcanaLabels();

  const entry = value === null ? null : getArcana(value);

  if (!entry) {
    return (
      <div className={styles.hintPanel}>
        <p className={styles.hint}>{t.result.arcanaHint}</p>
      </div>
    );
  }

  return (
    <div className={styles.panel} role="status" aria-live="polite">
      <div className={styles.head}>
        <span className={`${styles.number} mono`}>{value}</span>
        <span className={styles.name}>{entry.name}</span>
        {sourceLabel && <span className={styles.source}>{sourceLabel}</span>}
      </div>
      <p className={styles.meaning}>{entry.meaning}</p>
    </div>
  );
};
