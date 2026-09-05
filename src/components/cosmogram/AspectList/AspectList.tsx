'use client';

import { useAstroLabels } from '@/hooks/useAstroLabels';
import { ASPECT_COLORS, ASPECT_GLYPHS, PLANET_GLYPHS } from '@/i18n/astroLabels';
import { useLocale } from '@/i18n/LocaleProvider';
import type { Aspect } from '@/types/astrology.types';

import styles from './AspectList.module.css';

type AspectListProps = {
  aspects: Aspect[];
};

export const AspectList = ({ aspects }: AspectListProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();

  // Старі профілі можуть прийти без аспектів — тоді блоку просто немає
  if (aspects.length === 0) return null;

  return (
    <>
      <h4 className={styles.title}>{t.result.aspectsTitle}</h4>
      <ul>
        {aspects.map((aspect) => (
          <li
            key={`${aspect.from}-${aspect.to}-${aspect.type}`}
            className={styles.row}
          >
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
          </li>
        ))}
      </ul>
    </>
  );
};
