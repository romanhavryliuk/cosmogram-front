'use client';

import { useId } from 'react';

import { ELEMENTS, ELEMENT_READINGS, SIGN_ELEMENT } from '@/i18n/elementReadings';
import type { Element } from '@/i18n/elementReadings';
import { useLocale } from '@/i18n/LocaleProvider';
import type { PlanetPosition } from '@/types/astrology.types';

import styles from './ElementBalance.module.css';

type ElementBalanceProps = {
  planets: PlanetPosition[];
};

const countByElement = (planets: PlanetPosition[]) => {
  const counts: Record<Element, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  planets.forEach(({ sign }) => {
    counts[SIGN_ELEMENT[sign]] += 1;
  });
  return counts;
};

export const ElementBalance = ({ planets }: ElementBalanceProps) => {
  const { t, locale } = useLocale();
  const readings = ELEMENT_READINGS[locale];
  const titleId = useId();

  if (planets.length === 0) return null;

  const counts = countByElement(planets);
  const max = Math.max(...ELEMENTS.map((element) => counts[element]));
  // При рівності показуємо всі лідерні стихії — вибрати одну було б нечесно
  const dominant = ELEMENTS.filter((element) => counts[element] === max);

  return (
    <section className={styles.wrap} aria-labelledby={titleId}>
      <h4 id={titleId} className={styles.title}>
        {t.result.elementsTitle}
      </h4>

      <ul className={styles.bars}>
        {ELEMENTS.map((element) => (
          <li key={element} className={styles.row}>
            <span className={styles.name}>{readings[element].name}</span>
            <span className={styles.track} aria-hidden="true">
              <span
                className={`${styles.fill} ${styles[element]}`}
                // Ширина — частка від усіх планет, тому динамічна
                style={{ width: `${(counts[element] / planets.length) * 100}%` }}
              />
            </span>
            <span className={`${styles.count} mono`}>{counts[element]}</span>
          </li>
        ))}
      </ul>

      {dominant.map((element) => (
        <p key={element} className={styles.reading}>
          <span className={styles.dominant}>
            {t.result.elementsDominant}: {readings[element].name}.
          </span>{' '}
          {readings[element].meaning}
        </p>
      ))}
    </section>
  );
};
