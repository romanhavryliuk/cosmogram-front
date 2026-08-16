'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { PYTHAGOREAN_DIGITS } from '@/types/astrology.types';
import type { PythagoreanSquare as PythagoreanSquareData } from '@/types/astrology.types';

import styles from './PythagoreanSquare.module.css';

type PythagoreanSquareProps = {
  square: PythagoreanSquareData;
};

export const PythagoreanSquare = ({ square }: PythagoreanSquareProps) => {
  const { t } = useLocale();

  return (
    <ul className={styles.grid}>
      {PYTHAGOREAN_DIGITS.map((digit) => {
        // Backend віддає рядок повторень ("444"), нам потрібна кількість
        const count = square[digit].length;

        return (
          <li key={digit} className={styles.cell}>
            <span className={`${styles.count} mono`}>
              {count || t.result.emptyCell}
            </span>
            <span className={styles.label}>{t.result.squareLabels[digit]}</span>
          </li>
        );
      })}
    </ul>
  );
};
