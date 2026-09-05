'use client';

import { useId } from 'react';

import { useLocale } from '@/i18n/LocaleProvider';
import type { DestinyMatrix as DestinyMatrixData } from '@/types/astrology.types';
import { roundCoord } from '@/utils/geometry';

import styles from './DestinyMatrix.module.css';

type DestinyMatrixProps = {
  matrix: DestinyMatrixData;
  size?: number;
};

const point = (cx: number, cy: number, radius: number, degrees: number) => {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return {
    x: roundCoord(cx + radius * Math.cos(radians)),
    y: roundCoord(cy + radius * Math.sin(radians)),
  };
};

const toPolygon = (points: { x: number; y: number }[]) =>
  points.map((p) => `${p.x},${p.y}`).join(' ');

export const DestinyMatrix = ({ matrix, size = 260 }: DestinyMatrixProps) => {
  const { t } = useLocale();
  const gradientId = useId();
  const { purpose, ancestralPrograms, familyPower } = matrix;

  const c = size / 2;
  const rPoint = size * 0.375;
  const rRing = size * 0.26;
  const rCore = size * 0.135;
  const nodeR = size * 0.052;

  /**
   * Класична матриця — це октаграма з двох накладених квадратів: прямого
   * (особисті аркани) і поверненого на 45° (кармічні). Малюємо саме її,
   * а не один восьмикутник: так видно, що точки різної природи.
   */
  const personal = [
    { key: 'a', value: matrix.personal.a, angle: 0 },
    { key: 'b', value: matrix.personal.b, angle: 90 },
    { key: 'c', value: matrix.personal.c, angle: 180 },
    { key: 'd', value: matrix.personal.d, angle: 270 },
  ].map((item) => ({ ...item, ...point(c, c, rPoint, item.angle) }));

  const karmic = [
    { key: 'e', value: matrix.karmic.e, angle: 45 },
    { key: 'f', value: matrix.karmic.f, angle: 135 },
    { key: 'g', value: matrix.karmic.g, angle: 225 },
    { key: 'h', value: matrix.karmic.h, angle: 315 },
  ].map((item) => ({ ...item, ...point(c, c, rPoint, item.angle) }));

  return (
    <div className={styles.wrap}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={t.result.matrixWheelLabel}
        className={styles.svg}
      >
        <defs>
          <radialGradient id={`${gradientId}-core`}>
            <stop offset="0%" stopColor="rgba(217, 179, 77, 0.28)" />
            <stop offset="70%" stopColor="rgba(91, 42, 134, 0.16)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id={`${gradientId}-halo`}>
            <stop offset="0%" stopColor="rgba(91, 42, 134, 0.45)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* М'яке світіння під фігурою — інакше графіка «висить» на пласкому фоні */}
        <circle cx={c} cy={c} r={rPoint} fill={`url(#${gradientId}-halo)`} />

        {/* Концентричні напрямні */}
        <circle
          cx={c}
          cy={c}
          r={rPoint}
          fill="none"
          stroke="var(--line)"
          strokeWidth={0.6}
        />
        <circle
          cx={c}
          cy={c}
          r={rRing}
          fill="none"
          stroke="var(--line)"
          strokeWidth={0.5}
          strokeDasharray="2 4"
        />

        {/* Осі — кожна точка з'єднана з протилежною через центр (a↔c, b↔d, e↔g, f↔h) */}
        {[
          [personal[0], personal[2]],
          [personal[1], personal[3]],
          [karmic[0], karmic[2]],
          [karmic[1], karmic[3]],
        ].map(([from, to]) => (
          <line
            key={`axis-${from.key}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--line)"
            strokeWidth={0.6}
          />
        ))}

        {/* Квадрат кармічних арканів — під прямим, щоб прямий читався головним */}
        <polygon
          points={toPolygon(karmic)}
          fill="rgba(94, 163, 147, 0.05)"
          stroke="var(--teal-dim)"
          strokeWidth={1}
        />
        {/* Квадрат особистих арканів */}
        <polygon
          points={toPolygon(personal)}
          fill="rgba(217, 179, 77, 0.05)"
          stroke="var(--gold-dim)"
          strokeWidth={1.1}
        />

        {/* Ядро */}
        <circle cx={c} cy={c} r={rCore * 1.6} fill={`url(#${gradientId}-core)`} />
        <circle
          cx={c}
          cy={c}
          r={rCore}
          fill="var(--void-2)"
          stroke="var(--gold)"
          strokeWidth={1.1}
        />
        <text
          x={c}
          y={c}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.09}
          className={`${styles.center} mono`}
        >
          {matrix.center}
        </text>

        {/* Кармічні вузли — бірюзові, трохи менші */}
        {karmic.map((p) => (
          <g key={p.key}>
            <circle
              cx={p.x}
              cy={p.y}
              r={nodeR}
              fill="var(--void-2)"
              stroke="var(--teal)"
              strokeWidth={1}
            />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.048}
              className={`${styles.karmicValue} mono`}
            >
              {p.value}
            </text>
          </g>
        ))}

        {/* Особисті вузли — золоті, акцентні */}
        {personal.map((p) => (
          <g key={p.key}>
            <circle
              cx={p.x}
              cy={p.y}
              r={nodeR * 1.15}
              fill="var(--ink)"
              stroke="var(--gold)"
              strokeWidth={1.2}
            />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.052}
              className={`${styles.personalValue} mono`}
            >
              {p.value}
            </text>
          </g>
        ))}
      </svg>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchPersonal}`} />
          {t.result.matrixPersonalLegend}
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchKarmic}`} />
          {t.result.matrixKarmicLegend}
        </span>
      </div>

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
