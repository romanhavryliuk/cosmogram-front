'use client';

import { useAstroLabels } from '@/hooks/useAstroLabels';
import { RETROGRADE_GLYPH } from '@/i18n/astroLabels';
import { useLocale } from '@/i18n/LocaleProvider';
import type { PlanetPosition } from '@/types/astrology.types';
import { houseToRoman } from '@/utils/roman';

import styles from './PlanetList.module.css';

type PlanetListProps = {
  planets: PlanetPosition[];
};

export const PlanetList = ({ planets }: PlanetListProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();

  return (
    <ul>
      {planets.map((position) => (
        <li key={position.planet} className={styles.row}>
          <span className={styles.name}>{labels.planet[position.planet]}</span>
          <span className={`${styles.value} mono`}>
            {labels.sign[position.sign]} · {houseToRoman(position.house)}
            {position.retrograde && (
              <abbr className={styles.retrograde} title={t.result.retrograde}>
                {RETROGRADE_GLYPH}
              </abbr>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};
