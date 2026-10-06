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
import type {
  PythagoreanDigit,
  PythagoreanSquare as PythagoreanSquareData,
} from '@/types/astrology.types';

import styles from './PythagoreanSquare.module.css';

type PythagoreanSquareProps = {
  square: PythagoreanSquareData;
};

const LINE_KEYS = Object.keys(PYTHAGOREAN_LINES) as PythagoreanLine[];

// Класичне розташування методу: цифри йдуть стовпцями, тож верхній рядок —
// 1-4-7 (лінія цілеспрямованості), а не 1-2-3. Інакше рядки й стовпці на
// екрані не збігаються з тим, як лінії описують у джерелах
const GRID_ORDER: PythagoreanDigit[] = ['1', '4', '7', '2', '5', '8', '3', '6', '9'];

/** Панель тлумачення одна на квадрат: показує або клітинку, або лінію */
type SquareSelection =
  | { kind: 'cell'; digit: PythagoreanDigit }
  | { kind: 'line'; key: PythagoreanLine };

const selectionId = (selection: SquareSelection) =>
  selection.kind === 'cell' ? `cell-${selection.digit}` : `line-${selection.key}`;

export const PythagoreanSquare = ({ square }: PythagoreanSquareProps) => {
  const { t, locale } = useLocale();
  const readings = PYTHAGOREAN_READINGS[locale];
  const { ref: detailsRef, reveal } = useRevealElement<HTMLDivElement>();
  const [selected, setSelected] = useState<SquareSelection | null>(null);

  // Backend віддає рядок повторень ("444"), нам потрібна кількість
  const countOf = (digit: PythagoreanDigit) => square[digit].length;

  const lineTotalOf = (key: PythagoreanLine) =>
    PYTHAGOREAN_LINES[key].reduce((sum, digit) => sum + countOf(digit), 0);

  const isSelected = (selection: SquareSelection) =>
    selected !== null && selectionId(selected) === selectionId(selection);

  const handleSelect = (selection: SquareSelection) => {
    if (isSelected(selection)) {
      setSelected(null);
      return;
    }
    setSelected(selection);
    reveal();
  };

  const buildReading = (selection: SquareSelection): Reading => {
    if (selection.kind === 'line') {
      const level = getLineLevel(lineTotalOf(selection.key));
      return {
        title: readings.lines[selection.key].name,
        meta: `${lineTotalOf(selection.key)} · ${readings.lineLevels[level]}`,
        // Спершу про що лінія взагалі, потім — що означає саме цей рівень
        lines: [
          { text: readings.lines[selection.key].meaning },
          { text: readings.lineReadings[selection.key][level] },
        ],
      };
    }

    const { digit } = selection;
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
        {GRID_ORDER.map((digit) => {
          const count = countOf(digit);
          const label = t.result.squareLabels[digit];
          const cellSelection: SquareSelection = { kind: 'cell', digit };
          const isCellSelected = isSelected(cellSelection);

          return (
            <li key={digit}>
              {/* Раніше розшифровка жила в title і була доступна лише
                  наведенням миші — на телефоні її не було видно взагалі */}
              <button
                type="button"
                className={clsx(
                  styles.cell,
                  isCellSelected && styles.cellSelected,
                )}
                aria-pressed={isCellSelected}
                aria-label={`${label.full}: ${count || t.result.emptyCell}`}
                onClick={() => handleSelect(cellSelection)}
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
            const total = lineTotalOf(key);
            const level = getLineLevel(total);
            const line = readings.lines[key];
            const lineSelection: SquareSelection = { kind: 'line', key };
            const isLineSelected = isSelected(lineSelection);

            return (
              <li key={key}>
                <button
                  type="button"
                  className={clsx(
                    styles.lineRow,
                    isLineSelected && styles.lineRowSelected,
                  )}
                  aria-pressed={isLineSelected}
                  onClick={() => handleSelect(lineSelection)}
                >
                  <span className={styles.lineText}>
                    <span className={styles.lineName}>{line.name}</span>
                    <span className={styles.lineMeaning}>{line.meaning}</span>
                  </span>
                  <span className={styles.lineValue}>
                    <span className={`${styles.lineTotal} mono`}>{total}</span>
                    <span className={clsx(styles.lineLevel, styles[level])}>
                      {readings.lineLevels[level]}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
