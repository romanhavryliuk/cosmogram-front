'use client';

import { useState } from 'react';

import { AspectList, getAspectKey } from '@/components/cosmogram/AspectList';
import { PlanetList } from '@/components/cosmogram/PlanetList';
import { ReadingDetails } from '@/components/cosmogram/ReadingDetails';
import type { Reading } from '@/components/cosmogram/ReadingDetails';
import { useAstroLabels } from '@/hooks/useAstroLabels';
import { useNatalReadings } from '@/hooks/useNatalReadings';
import { useRevealElement } from '@/hooks/useRevealElement';
import { useLocale } from '@/i18n/LocaleProvider';
import type { Aspect, Planet, PlanetPosition } from '@/types/astrology.types';
import { houseToRoman } from '@/utils/roman';

import styles from './NatalLists.module.css';

type NatalListsProps = {
  planets: PlanetPosition[];
  aspects: Aspect[];
};

/** Вибір спільний для обох списків: відкрита завжди одна панель тлумачення */
type Selection =
  | { kind: 'planet'; planet: Planet }
  | { kind: 'aspect'; key: string }
  | null;

export const NatalLists = ({ planets, aspects }: NatalListsProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();
  const readings = useNatalReadings();
  const { ref: detailsRef, reveal } = useRevealElement<HTMLDivElement>();
  const [selected, setSelected] = useState<Selection>(null);

  const selectedPlanet = selected?.kind === 'planet' ? selected.planet : null;
  const selectedAspectKey = selected?.kind === 'aspect' ? selected.key : null;

  // Повторний натиск закриває панель; новий вибір підтягує її в поле зору
  const handlePlanetSelect = (planet: Planet) => {
    if (selectedPlanet === planet) {
      setSelected(null);
      return;
    }
    setSelected({ kind: 'planet', planet });
    reveal();
  };

  const handleAspectSelect = (aspect: Aspect) => {
    const key = getAspectKey(aspect);
    if (selectedAspectKey === key) {
      setSelected(null);
      return;
    }
    setSelected({ kind: 'aspect', key });
    reveal();
  };

  const buildPlanetReading = (planet: Planet): Reading | null => {
    const position = planets.find((item) => item.planet === planet);
    if (!position) return null;

    // Без часу народження дому немає — тлумачення лишається з «що» і «як»
    const house =
      position.house === undefined ? null : readings.getHouse(position.house);
    const lines = [
      { label: t.result.readingWhat, text: readings.planet[planet] },
      { label: t.result.readingHow, text: readings.sign[position.sign] },
      ...(house ? [{ label: t.result.readingWhere, text: house }] : []),
      ...(position.retrograde ? [{ text: t.result.readingRetrograde }] : []),
    ];

    return {
      title: labels.planet[planet],
      meta:
        position.house === undefined
          ? labels.sign[position.sign]
          : `${labels.sign[position.sign]} · ${houseToRoman(position.house)}`,
      lines,
    };
  };

  const buildAspectReading = (key: string): Reading | null => {
    const aspect = aspects.find((item) => getAspectKey(item) === key);
    if (!aspect) return null;

    return {
      title: `${labels.planet[aspect.from]} — ${labels.planet[aspect.to]}`,
      meta: `${labels.aspect[aspect.type]} · ${aspect.orb.toFixed(1)}°`,
      lines: [
        { text: readings.aspect[aspect.type] },
        { text: t.result.readingOrbNote },
      ],
    };
  };

  const reading =
    selected?.kind === 'planet'
      ? buildPlanetReading(selected.planet)
      : selected?.kind === 'aspect'
        ? buildAspectReading(selected.key)
        : null;

  return (
    <div className={styles.lists}>
      <ReadingDetails ref={detailsRef} reading={reading} hint={t.result.readingHint} />
      <PlanetList
        planets={planets}
        selectedPlanet={selectedPlanet}
        onSelect={handlePlanetSelect}
      />
      <AspectList
        aspects={aspects}
        selectedKey={selectedAspectKey}
        onSelect={handleAspectSelect}
      />
    </div>
  );
};
