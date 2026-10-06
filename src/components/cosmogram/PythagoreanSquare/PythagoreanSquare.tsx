'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { ReadingDetails } from '@/components/cosmogram/ReadingDetails';
import type { Reading } from '@/components/cosmogram/ReadingDetails';
import { useRevealElement } from '@/hooks/useRevealElement';
import { useLocale } from '@/i18n/LocaleProvider';
import {
  PYTHAGOREAN_LINES,
  PYTHAGOREAN_READINGS,
  getCellLevel,
  getLineLevel,
} from '@/i18n/pythagoreanReadings';
import type { PythagoreanLine } from '@/i18n/pythagoreanReadings';
import { PYTHAGOREAN_DIGITS } from '@/types/astrology.types';
import type {
  PythagoreanDigit,
  PythagoreanSquare as PythagoreanSquareData,
} from '@/types/astrology.types';

import styles from './PythagoreanSquare.module.css';

type PythagoreanSquareProps = {
  square: PythagoreanSquareData;
};

const LINE_KEYS = Object.keys(PYTHAGOREAN_LINES) as PythagoreanLine[];

export const PythagoreanSquare = ({ square }: PythagoreanSquareProps) => {
  const { t, locale } = useLocale();
  const readings = PYTHAGOREAN_READINGS[locale];
  const { ref: detailsRef, reveal } = useRevealElement<HTMLDivElement>();
  const [selected, setSelected] = useState<PythagoreanDigit | null>(null);

  // Backend віддає рядок повторень ("444"), нам потрібна кількість
  const countOf = (digit: PythagoreanDigit) => square[digit].length;

  const handleSelect = (digit: PythagoreanDigit) => {
    if (selected === digit) {
      setSelected(null);
      return;
    }
    setSelected(digit);
    reveal();
  };

  const buildReading = (digit: PythagoreanDigit): Reading => {
    const count = countOf(digit);
    return {
      title: t.result.squareLabels[digit].full,
      // «444» замість «4 × 3»: так записують клітинку в самому методі
      meta: count ? square[digit] : t.result.emptyCell,
      lines: [{ text: readings.cells[digit][getCellLevel(count)] }],
    };
  };

  return (
    <div className={styles.wrap}>
      <ul className={styles.grid}>
        {PYTHAGOREAN_DIGITS.map((digit) => {
          const count = countOf(digit);
          const label = t.result.squareLabels[digit];

          return (
            <li key={digit}>
              {/* Раніше розшифровка жила в title і була доступна лише
                  наведенням миші — на телефоні її не було видно взагалі */}
              <button
                type="button"
                className={clsx(
                  styles.cell,
                  selected === digit && styles.cellSelected,
                )}
                aria-pressed={selected === digit}
                aria-label={`${label.full}: ${count || t.result.emptyCell}`}
                onClick={() => handleSelect(digit)}
              >
                <span className={`${styles.count} mono`}>
                  {count || t.result.emptyCell}
                </span>
                <span className={styles.label}>{label.short}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ReadingDetails
        ref={detailsRef}
        reading={selected ? buildReading(selected) : null}
        hint={t.result.squareHint}
      />

      <div className={styles.lines}>
        <h4 className={styles.linesTitle}>{t.result.squareLinesTitle}</h4>
        <ul>
          {LINE_KEYS.map((key) => {
            const total = PYTHAGOREAN_LINES[key].reduce(
              (sum, digit) => sum + countOf(digit),
              0,
            );
            const level = getLineLevel(total);
            const line = readings.lines[key];

            return (
              <li key={key} className={styles.lineRow}>
                <div className={styles.lineText}>
                  <span className={styles.lineName}>{line.name}</span>
                  <span className={styles.lineMeaning}>{line.meaning}</span>
                </div>
                <div className={styles.lineValue}>
                  <span className={`${styles.lineTotal} mono`}>{total}</span>
                  <span className={clsx(styles.lineLevel, styles[level])}>
                    {readings.lineLevels[level]}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
