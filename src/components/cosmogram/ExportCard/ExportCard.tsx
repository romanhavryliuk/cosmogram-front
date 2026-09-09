'use client';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { useLocale } from '@/i18n/LocaleProvider';
import { formatBirthDate } from '@/utils/dateHelpers';

import styles from './ExportCard.module.css';

type ExportCardProps = {
  birthDate: string;
  placeLabel: string;
};

/** Картка-підпис під результатом: єдине місце, де видно дату й місце народження */
export const ExportCard = ({ birthDate, placeLabel }: ExportCardProps) => {
  const { t } = useLocale();

  return (
    <div className={styles.strip}>
      <figure className={styles.card}>
        <ZodiacWheel size={70} />
        <figcaption className={styles.caption}>
          <span className={styles.captionTag}>{t.exportCard.caption}</span>
          <span className={styles.captionName}>
            {formatBirthDate(birthDate)} · {placeLabel}
          </span>
        </figcaption>
      </figure>
    </div>
  );
};
