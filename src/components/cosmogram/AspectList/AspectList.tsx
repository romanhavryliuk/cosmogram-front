'use client';

import clsx from 'clsx';

import { useAstroLabels } from '@/hooks/useAstroLabels';
import { ASPECT_COLORS, ASPECT_GLYPHS } from '@/i18n/astroLabels';
import { useLocale } from '@/i18n/LocaleProvider';
import type { Aspect } from '@/types/astrology.types';

import styles from './AspectList.module.css';

/** Стабільний ключ аспекту: пара планет + тип однозначно його визначають */
export const getAspectKey = (aspect: Aspect) =>
  `${aspect.from}-${aspect.to}-${aspect.type}`;

type AspectListProps = {
  aspects: Aspect[];
  /** Без onSelect список лишається статичним */
  selectedKey?: string | null;
  onSelect?: (aspect: Aspect) => void;
};

export const AspectList = ({
  aspects,
  selectedKey = null,
  onSelect,
}: AspectListProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();

  // Старі профілі можуть прийти без аспектів — тоді блоку просто немає
  if (aspects.length === 0) return null;

  return (
    <>
      <h4 className={styles.title}>{t.result.aspectsTitle}</h4>
      <ul>
        {aspects.map((aspect) => {
          const key = getAspectKey(aspect);
          const content = (
            <>
              <span className={styles.pair}>
                <span
                  className={`${styles.glyph} mono`}
                  style={{ color: ASPECT_COLORS[aspect.type] }}
                  aria-hidden="true"
                >
                  {ASPECT_GLYPHS[aspect.type]}
                </span>
                {labels.planet[aspect.from]} — {labels.planet[aspect.to]}
              </span>
              <span className={styles.meta}>
                {labels.aspect[aspect.type]}
                <span className={`${styles.orb} mono`}>
                  {aspect.orb.toFixed(1)}°
                </span>
              </span>
            </>
          );

          return (
            <li key={key} className={styles.item}>
              {onSelect ? (
                <button
                  type="button"
                  className={clsx(
                    styles.row,
                    styles.rowButton,
                    selectedKey === key && styles.rowSelected,
                  )}
                  aria-pressed={selectedKey === key}
                  onClick={() => onSelect(aspect)}
                >
                  {content}
                </button>
              ) : (
                <div className={styles.row}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
