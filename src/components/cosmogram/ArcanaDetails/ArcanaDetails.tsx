'use client';

import { useArcanaLabels } from '@/hooks/useArcanaLabels';
import { useLocale } from '@/i18n/LocaleProvider';

import styles from './ArcanaDetails.module.css';

type ArcanaDetailsProps = {
  /** Обране число матриці, або null — поки користувач нічого не натиснув */
  value: number | null;
  /** Підпис позиції: «Центр», «Особистий аркан» тощо */
  sourceLabel?: string;
  /** Що означає сама позиція — за яку сферу відповідає аркан у цьому місці */
  positionNote?: string;
};

export const ArcanaDetails = ({
  value,
  sourceLabel,
  positionNote,
}: ArcanaDetailsProps) => {
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
      {positionNote && <p className={styles.position}>{positionNote}</p>}
      <p className={styles.meaning}>{entry.meaning}</p>
    </div>
  );
};
