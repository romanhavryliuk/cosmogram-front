'use client';

import { useId } from 'react';

import { useArcanaLabels } from '@/hooks/useArcanaLabels';
import { useAstroLabels } from '@/hooks/useAstroLabels';
import { ELEMENT_READINGS } from '@/i18n/elementReadings';
import { useLocale } from '@/i18n/LocaleProvider';
import { NATAL_READINGS } from '@/i18n/natalReadings';
import type { CosmogramView } from '@/types/profile.types';
import { countByElement, getDominantElements } from '@/utils/elementBalance';

import styles from './ChartSummary.module.css';

type ChartSummaryProps = {
  profile: CosmogramView;
};

type SummaryItem = {
  key: string;
  label: string;
  value: string;
  text: string;
};

/**
 * Три найвпізнаваніші висновки з трьох систем в одному місці — щоб
 * загальна картина складалась одразу, без перемикання вкладок.
 * Деталі кожного пункту — у відповідному слайді нижче.
 */
export const ChartSummary = ({ profile }: ChartSummaryProps) => {
  const { t, locale } = useLocale();
  const labels = useAstroLabels();
  const { getArcana } = useArcanaLabels();
  const titleId = useId();

  const { planets } = profile.chart;
  const items: SummaryItem[] = [];

  const sun = planets.find(({ planet }) => planet === 'sun');
  if (sun) {
    items.push({
      key: 'sun',
      label: t.result.summarySunLabel,
      value: labels.sign[sun.sign],
      text: NATAL_READINGS[locale].sign[sun.sign],
    });
  }

  if (planets.length > 0) {
    const dominant = getDominantElements(countByElement(planets));
    const elementReadings = ELEMENT_READINGS[locale];
    items.push({
      key: 'element',
      label: t.result.summaryElementLabel,
      value: dominant.map((element) => elementReadings[element].name).join(' · '),
      // Опис однієї стихії не пасує до кількох рівних — тоді відсилаємо до балансу
      text:
        dominant.length === 1
          ? elementReadings[dominant[0]].meaning
          : t.result.summaryElementTie,
    });
  }

  const center = getArcana(profile.destinyMatrix.center);
  if (center) {
    items.push({
      key: 'center',
      label: t.result.summaryCenterLabel,
      value: `${profile.destinyMatrix.center} · ${center.name}`,
      text: center.meaning,
    });
  }

  if (items.length === 0) return null;

  return (
    <section className={styles.wrap} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.title}>
        {t.result.summaryTitle}
      </h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.key} className={styles.item}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
