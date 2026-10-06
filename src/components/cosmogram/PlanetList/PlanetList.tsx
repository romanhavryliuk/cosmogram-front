'use client';

import clsx from 'clsx';

import { useAstroLabels } from '@/hooks/useAstroLabels';
import { RETROGRADE_GLYPH } from '@/i18n/astroLabels';
import { useLocale } from '@/i18n/LocaleProvider';
import type { Planet, PlanetPosition } from '@/types/astrology.types';
import { houseToRoman } from '@/utils/roman';

import styles from './PlanetList.module.css';

type PlanetListProps = {
  planets: PlanetPosition[];
  /** Без onSelect список лишається статичним — як і був до тлумачень */
  selectedPlanet?: Planet | null;
  onSelect?: (planet: Planet) => void;
};

export const PlanetList = ({
  planets,
  selectedPlanet = null,
  onSelect,
}: PlanetListProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();

  return (
    <ul>
      {planets.map((position) => {
        const content = (
          <>
            <span className={styles.name}>{labels.planet[position.planet]}</span>
            <span className={`${styles.value} mono`}>
              {labels.sign[position.sign]} · {houseToRoman(position.house)}
              {position.retrograde && (
                <abbr className={styles.retrograde} title={t.result.retrograde}>
                  {RETROGRADE_GLYPH}
                </abbr>
              )}
            </span>
          </>
        );

        return (
          <li key={position.planet} className={styles.item}>
            {onSelect ? (
              <button
                type="button"
                className={clsx(
                  styles.row,
                  styles.rowButton,
                  selectedPlanet === position.planet && styles.rowSelected,
                )}
                aria-pressed={selectedPlanet === position.planet}
                onClick={() => onSelect(position.planet)}
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
  );
};
