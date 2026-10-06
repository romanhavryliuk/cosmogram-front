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

/**
 * Без часу карту рахують на полудень, а Місяць проходить ~13° на добу —
 * до ±6.5° похибки. Ближче цього до межі знака сам знак Місяця не певний
 */
const MOON_UNCERTAINTY_DEGREES = 6.5;
const SIGN_DEGREES = 30;

type ChartSummaryProps = {
  profile: CosmogramView;
};

type SummaryItem = {
  key: string;
  label: string;
  value: string;
  /** Короткі уточнення під значенням — напр. Місяць і Асцендент біля Сонця */
  details?: string;
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
    // «Велика трійка» астрології: Сонце, Місяць і Асцендент. Асцендент
    // залежить від часу народження — без нього рядок просто коротший
    const moon = planets.find(({ planet }) => planet === 'moon');
    const ascendantSign = profile.chart.houses.find(
      (house) => house.house === 1,
    )?.sign;
    const isMoonSignUncertain =
      !ascendantSign &&
      moon !== undefined &&
      (moon.degree < MOON_UNCERTAINTY_DEGREES ||
        moon.degree > SIGN_DEGREES - MOON_UNCERTAINTY_DEGREES);
    const details = [
      moon &&
        `${labels.planet.moon} — ${labels.sign[moon.sign]}${
          isMoonSignUncertain ? ` ${t.result.summaryMoonUncertain}` : ''
        }`,
      ascendantSign &&
        `${t.result.ascendantPrefix} ${labels.sign[ascendantSign]}`,
    ].filter((line): line is string => Boolean(line));

    items.push({
      key: 'sun',
      label: t.result.summarySunLabel,
      value: labels.sign[sun.sign],
      details: details.join(' · ') || undefined,
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
            {item.details && (
              <span className={styles.details}>{item.details}</span>
            )}
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
