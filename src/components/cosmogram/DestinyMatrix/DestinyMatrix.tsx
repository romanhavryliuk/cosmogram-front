'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import type { DestinyMatrix as DestinyMatrixData } from '@/types/astrology.types';

import styles from './DestinyMatrix.module.css';

type DestinyMatrixProps = {
  matrix: DestinyMatrixData;
};

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = SIZE * 0.4;
const R_CORE = SIZE * 0.15;
const R_POINT = 13;

// Округлюємо, щоб уникнути розбіжності останніх розрядів Math.sin/cos
// між серверним і клієнтським рушієм (ламає SSR-гідратацію).
const round = (value: number) => Math.round(value * 1000) / 1000;

export const DestinyMatrix = ({ matrix }: DestinyMatrixProps) => {
  const { t } = useLocale();
  const { purpose, ancestralPrograms, familyPower } = matrix;

  // Вісім точок восьмикутника — особисті (a–d) й кармічні (e–h) енергії
  // чергуються по колу. Семантику кожної конкретної точки визначає бекенд,
  // тут показуємо лише значення, без вигаданих підписів.
  const octagonPoints = [
    { key: 'a', value: matrix.personal.a, angle: -90 },
    { key: 'e', value: matrix.karmic.e, angle: -45 },
    { key: 'b', value: matrix.personal.b, angle: 0 },
    { key: 'f', value: matrix.karmic.f, angle: 45 },
    { key: 'c', value: matrix.personal.c, angle: 90 },
    { key: 'g', value: matrix.karmic.g, angle: 135 },
    { key: 'd', value: matrix.personal.d, angle: 180 },
    { key: 'h', value: matrix.karmic.h, angle: -135 },
  ];

  const points = octagonPoints.map((point) => {
    const rad = (point.angle * Math.PI) / 180;
    return {
      ...point,
      x: round(CX + R_OUTER * Math.cos(rad)),
      y: round(CY + R_OUTER * Math.sin(rad)),
    };
  });

  return (
    <div className={styles.wrap}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={t.result.matrixWheelLabel}
      >
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={0.8}
          opacity={0.5}
        />
        {points.map((p) => (
          <line
            key={`line-${p.key}`}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="var(--line)"
            strokeWidth={0.6}
          />
        ))}
        <circle
          cx={CX}
          cy={CY}
          r={R_CORE}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={0.8}
          opacity={0.6}
        />
        <text
          x={CX}
          y={CY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={20}
          className={`${styles.center} mono`}
        >
          {matrix.center}
        </text>
        {points.map((p) => (
          <g key={p.key}>
            <circle
              cx={p.x}
              cy={p.y}
              r={R_POINT}
              fill="var(--void-2)"
              stroke="var(--line)"
              strokeWidth={1}
            />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
              className={`${styles.pointValue} mono`}
            >
              {p.value}
            </text>
          </g>
        ))}
      </svg>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={`${styles.statValue} mono`}>{matrix.money}</span>
          <span className={styles.statLabel}>{t.result.matrixMoneyLabel}</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} mono`}>{matrix.love}</span>
          <span className={styles.statLabel}>{t.result.matrixLoveLabel}</span>
        </div>
        {typeof familyPower === 'number' && (
          <div className={styles.stat}>
            <span className={`${styles.statValue} mono`}>{familyPower}</span>
            <span className={styles.statLabel}>
              {t.result.matrixFamilyPowerLabel}
            </span>
          </div>
        )}
      </div>

      {purpose && (
        <div className={styles.extra}>
          <span className={styles.sectionLabel}>
            {t.result.matrixPurposeLabel}
          </span>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>
                {purpose.personal}
              </span>
              <span className={styles.statLabel}>
                {t.result.matrixPurposePersonalLabel}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>
                {purpose.social}
              </span>
              <span className={styles.statLabel}>
                {t.result.matrixPurposeSocialLabel}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>
                {purpose.spiritual}
              </span>
              <span className={styles.statLabel}>
                {t.result.matrixPurposeSpiritualLabel}
              </span>
            </div>
          </div>
        </div>
      )}

      {ancestralPrograms && (
        <div className={styles.extra}>
          <span className={styles.sectionLabel}>
            {t.result.matrixAncestralLabel}
          </span>
          <div className={styles.ancestralRow}>
            <div className={styles.ancestralLine}>
              <span className={styles.ancestralLineLabel}>
                {t.result.matrixPaternalLabel}
              </span>
              <span className={`${styles.ancestralLineValue} mono`}>
                {ancestralPrograms.paternal.first} ·{' '}
                {ancestralPrograms.paternal.second} ·{' '}
                {ancestralPrograms.paternal.total}
              </span>
            </div>
            <div className={styles.ancestralLine}>
              <span className={styles.ancestralLineLabel}>
                {t.result.matrixMaternalLabel}
              </span>
              <span className={`${styles.ancestralLineValue} mono`}>
                {ancestralPrograms.maternal.first} ·{' '}
                {ancestralPrograms.maternal.second} ·{' '}
                {ancestralPrograms.maternal.total}
              </span>
            </div>
          </div>
        </div>
      )}

      <p className={styles.methodNote}>{t.result.matrixMethodNote}</p>
    </div>
  );
};
