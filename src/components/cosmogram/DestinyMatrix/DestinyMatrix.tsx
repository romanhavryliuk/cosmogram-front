'use client';

import { Fragment, useId, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { ArcanaDetails } from '@/components/cosmogram/ArcanaDetails';
import { useArcanaLabels } from '@/hooks/useArcanaLabels';
import { useRevealElement } from '@/hooks/useRevealElement';
import { MATRIX_POSITION_NOTES, isMatrixPositionKey } from '@/i18n/arcana';
import { useLocale } from '@/i18n/LocaleProvider';
import type {
  AncestralLine,
  DestinyMatrix as DestinyMatrixData,
} from '@/types/astrology.types';
import { roundCoord } from '@/utils/geometry';

import styles from './DestinyMatrix.module.css';

type DestinyMatrixProps = {
  matrix: DestinyMatrixData;
  size?: number;
};

/**
 * Будь-яке число матриці, яке можна відкрити. Вибір тримаємо за ключем,
 * а не за значенням: два вузли можуть мати однакове число, і тоді
 * підсвітились би обидва. label — позиція, яку покаже панель тлумачення.
 */
type MatrixNode = { key: string; value: number; label: string };

/** Родова лінія: два аркани й їхня сума — кожне число відкривається окремо */
const LINE_PARTS = ['first', 'second', 'total'] as const;

/**
 * Порядок появи вузлів: спершу центр, потім особисті, потім кармічні —
 * та сама ієрархія, що й у кольорі. Крок задається в CSS через --appear.
 */
const PERSONAL_APPEAR_OFFSET = 1;
const KARMIC_APPEAR_OFFSET = 5;

const appearDelay = (order: number): CSSProperties => ({
  ['--appear' as string]: order,
});

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
  const { t, locale } = useLocale();
  const gradientId = useId();
  const { getArcana } = useArcanaLabels();
  const [selected, setSelected] = useState<MatrixNode | null>(null);
  const { purpose, ancestralPrograms, familyPower } = matrix;

  const { ref: detailsRef, reveal } = useRevealElement<HTMLDivElement>();

  const isSelected = (node: MatrixNode) => selected?.key === node.key;

  // Повторне натискання на той самий вузол знімає вибір — так панель
  // можна закрити тим самим рухом, яким її відкрив
  const toggle = (node: MatrixNode) =>
    setSelected((current) => (current?.key === node.key ? null : node));

  /**
   * Числа під схемою: панель тлумачення стоїть вище, і на телефоні
   * вона відкрилась би поза екраном. Підтягуємо її в поле зору.
   */
  const toggleAndReveal = (node: MatrixNode) => {
    toggle(node);
    if (!isSelected(node)) reveal();
  };

  // Скрінрідер має почути не лише число, а й назву аркана та позицію
  const nodeLabel = (node: MatrixNode) => {
    const name = getArcana(node.value)?.name;
    return name
      ? `${node.value} — ${name}, ${node.label}`
      : `${node.value}, ${node.label}`;
  };

  // Числа під схемою — звичайні <button>, тож клавіатура працює нативно
  const renderStat = (node: MatrixNode, caption: string = node.label) => (
    <button
      key={node.key}
      type="button"
      className={clsx(
        styles.stat,
        styles.statButton,
        isSelected(node) && styles.statSelected,
      )}
      aria-pressed={isSelected(node)}
      aria-label={nodeLabel(node)}
      onClick={() => toggleAndReveal(node)}
    >
      <span className={`${styles.statValue} mono`}>{node.value}</span>
      <span className={styles.statLabel}>{caption}</span>
      {/* Назва видна одразу — щоб «8» щось означало ще до натискання */}
      <span className={styles.statArcana}>{getArcana(node.value)?.name}</span>
    </button>
  );

  const renderLine = (prefix: string, line: AncestralLine, lineLabel: string) => (
    <span className={`${styles.ancestralLineValue} mono`}>
      {LINE_PARTS.map((part, index) => {
        const node: MatrixNode = {
          key: `${prefix}-${part}`,
          value: line[part],
          label: lineLabel,
        };
        return (
          <Fragment key={node.key}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                ·
              </span>
            )}
            <button
              type="button"
              className={clsx(
                styles.lineValue,
                isSelected(node) && styles.lineValueSelected,
              )}
              aria-pressed={isSelected(node)}
              aria-label={nodeLabel(node)}
              onClick={() => toggleAndReveal(node)}
            >
              {node.value}
            </button>
          </Fragment>
        );
      })}
    </span>
  );

  // <g role="button"> сам не реагує на клавіатуру — додаємо Enter і пробіл,
  // як у нативної кнопки
  const handleNodeKeyDown = (
    event: KeyboardEvent<SVGGElement>,
    node: MatrixNode,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle(node);
    }
  };

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
  const centerNode: MatrixNode = {
    key: 'center',
    value: matrix.center,
    label: t.result.arcanaSourceCenter,
  };

  const personal = [
    { key: 'a', value: matrix.personal.a, angle: 0 },
    { key: 'b', value: matrix.personal.b, angle: 90 },
    { key: 'c', value: matrix.personal.c, angle: 180 },
    { key: 'd', value: matrix.personal.d, angle: 270 },
  ].map((item) => ({
    ...item,
    label: t.result.arcanaSourcePersonal,
    ...point(c, c, rPoint, item.angle),
  }));

  const karmic = [
    { key: 'e', value: matrix.karmic.e, angle: 45 },
    { key: 'f', value: matrix.karmic.f, angle: 135 },
    { key: 'g', value: matrix.karmic.g, angle: 225 },
    { key: 'h', value: matrix.karmic.h, angle: 315 },
  ].map((item) => ({
    ...item,
    label: t.result.arcanaSourceKarmic,
    ...point(c, c, rPoint, item.angle),
  }));

  return (
    <div className={styles.wrap}>
      {/* На десктопі — ліва колонка: схема з легендою */}
      <div className={styles.figure}>
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
              // Обраний вузол підсвічує свою вісь: видно, з чим він у парі
              className={clsx(
                styles.axis,
                (selected?.key === from.key || selected?.key === to.key) &&
                  styles.axisActive,
              )}
            />
          ))}

          {/* Квадрат кармічних арканів — під прямим, щоб прямий читався головним.
              pathLength=1 дає анімації прокреслення працювати без заміру довжини */}
          <polygon
            points={toPolygon(karmic)}
            fill="rgba(94, 163, 147, 0.05)"
            stroke="var(--teal-dim)"
            strokeWidth={1}
            pathLength={1}
            className={styles.draw}
          />
          {/* Квадрат особистих арканів */}
          <polygon
            points={toPolygon(personal)}
            fill="rgba(217, 179, 77, 0.05)"
            stroke="var(--gold-dim)"
            strokeWidth={1.1}
            pathLength={1}
            className={clsx(styles.draw, styles.drawLate)}
          />

          {/* Ядро */}
          <circle cx={c} cy={c} r={rCore * 1.6} fill={`url(#${gradientId}-core)`} />
          <g
            className={clsx(
              styles.node,
              isSelected(centerNode) && styles.nodeSelected,
            )}
            role="button"
            tabIndex={0}
            aria-label={nodeLabel(centerNode)}
            aria-pressed={isSelected(centerNode)}
            onClick={() => toggle(centerNode)}
            onKeyDown={(event) => handleNodeKeyDown(event, centerNode)}
          >
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
          </g>

          {/* Кармічні вузли — бірюзові, трохи менші */}
          {karmic.map((p, index) => (
            <g
              key={p.key}
              className={clsx(styles.node, isSelected(p) && styles.nodeSelected)}
              style={appearDelay(KARMIC_APPEAR_OFFSET + index)}
              role="button"
              tabIndex={0}
              aria-label={nodeLabel(p)}
              aria-pressed={isSelected(p)}
              onClick={() => toggle(p)}
              onKeyDown={(event) => handleNodeKeyDown(event, p)}
            >
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
          {personal.map((p, index) => (
            <g
              key={p.key}
              className={clsx(styles.node, isSelected(p) && styles.nodeSelected)}
              style={appearDelay(PERSONAL_APPEAR_OFFSET + index)}
              role="button"
              tabIndex={0}
              aria-label={nodeLabel(p)}
              aria-pressed={isSelected(p)}
              onClick={() => toggle(p)}
              onKeyDown={(event) => handleNodeKeyDown(event, p)}
            >
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
      </div>

      {/* Права колонка: тлумачення поруч зі схемою, нижче — решта чисел */}
      <div className={styles.info}>
        <div ref={detailsRef} className={styles.details}>
          <ArcanaDetails
            value={selected?.value ?? null}
            sourceLabel={selected?.label}
            positionNote={
              selected && isMatrixPositionKey(selected.key)
                ? MATRIX_POSITION_NOTES[locale][selected.key]
                : undefined
            }
          />
        </div>

        <div className={styles.stats}>
          {renderStat({
            key: 'money',
            value: matrix.money,
            label: t.result.matrixMoneyLabel,
          })}
          {renderStat({
            key: 'love',
            value: matrix.love,
            label: t.result.matrixLoveLabel,
          })}
          {typeof familyPower === 'number' &&
            renderStat({
              key: 'familyPower',
              value: familyPower,
              label: t.result.matrixFamilyPowerLabel,
            })}
        </div>

        {purpose && (
          <div className={styles.extra}>
            <span className={styles.sectionLabel}>
              {t.result.matrixPurposeLabel}
            </span>
            <div className={styles.stats}>
              {renderStat(
                {
                  key: 'purposePersonal',
                  value: purpose.personal,
                  label: `${t.result.matrixPurposeLabel} · ${t.result.matrixPurposePersonalLabel}`,
                },
                t.result.matrixPurposePersonalLabel,
              )}
              {renderStat(
                {
                  key: 'purposeSocial',
                  value: purpose.social,
                  label: `${t.result.matrixPurposeLabel} · ${t.result.matrixPurposeSocialLabel}`,
                },
                t.result.matrixPurposeSocialLabel,
              )}
              {renderStat(
                {
                  key: 'purposeSpiritual',
                  value: purpose.spiritual,
                  label: `${t.result.matrixPurposeLabel} · ${t.result.matrixPurposeSpiritualLabel}`,
                },
                t.result.matrixPurposeSpiritualLabel,
              )}
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
                {renderLine('paternal', ancestralPrograms.paternal, t.result.matrixPaternalLabel)}
              </div>
              <div className={styles.ancestralLine}>
                <span className={styles.ancestralLineLabel}>
                  {t.result.matrixMaternalLabel}
                </span>
                {renderLine('maternal', ancestralPrograms.maternal, t.result.matrixMaternalLabel)}
              </div>
            </div>
          </div>
        )}

        <p className={styles.methodNote}>{t.result.matrixMethodNote}</p>
      </div>
    </div>
  );
};
