'use client';

import { AspectList } from '@/components/cosmogram/AspectList';
import { ChartCarousel } from '@/components/cosmogram/ChartCarousel';
import type { ChartSlide } from '@/components/cosmogram/ChartCarousel';
import { DestinyMatrix } from '@/components/cosmogram/DestinyMatrix';
import { ExportCard } from '@/components/cosmogram/ExportCard';
import { NatalChartWheel } from '@/components/cosmogram/NatalChartWheel';
import { PlanetList } from '@/components/cosmogram/PlanetList';
import { PythagoreanSquare } from '@/components/cosmogram/PythagoreanSquare';
import { useAstroLabels } from '@/hooks/useAstroLabels';
import { useLocale } from '@/i18n/LocaleProvider';
import type { Profile } from '@/types/profile.types';

import styles from './ChartResult.module.css';

type ChartResultProps = {
  profile: Profile;
};

/** Результат розбитий на слайди (натальна карта, матриця долі, квадрат Піфагора) плюс картка-підпис під ними */
export const ChartResult = ({ profile }: ChartResultProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();

  // Куспіди I і X будинків — це асцендент і середина неба; знаки беремо
  // готовими з бекенду, щоб не рахувати їх із довготи вдруге
  const ascendantSign = profile.chart.houses.find(
    (house) => house.house === 1,
  )?.sign;
  const midheavenSign = profile.chart.houses.find(
    (house) => house.house === 10,
  )?.sign;

  const slides: ChartSlide[] = [
    {
      id: 'chart',
      tabLabel: t.result.chartTitle,
      title: t.result.chartTitle,
      subtitle: ascendantSign && (
        <>
          {t.result.ascendantPrefix} {labels.sign[ascendantSign]}
          {midheavenSign && (
            <>
              {' · '}
              {t.result.midheavenPrefix} {labels.sign[midheavenSign]}
            </>
          )}
        </>
      ),
      description: t.result.chartDescription,
      content: (
        <div className={styles.chartBody}>
          <div className={styles.wheel}>
            <NatalChartWheel chart={profile.chart} label={t.result.wheelLabel} />
          </div>
          <div className={styles.lists}>
            <PlanetList planets={profile.chart.planets} />
            <AspectList aspects={profile.chart.aspects} />
          </div>
        </div>
      ),
    },
    {
      id: 'matrix',
      tabLabel: t.result.matrixTitle,
      title: t.result.matrixTitle,
      subtitle: t.result.matrixSubtitle,
      description: t.result.matrixDescription,
      content: (
        <div className={styles.matrix}>
          <DestinyMatrix matrix={profile.destinyMatrix} />
        </div>
      ),
    },
    {
      id: 'square',
      tabLabel: t.result.squareTitle,
      title: t.result.squareTitle,
      subtitle: t.result.squareSubtitle,
      description: t.result.squareDescription,
      content: (
        <div className={styles.square}>
          <PythagoreanSquare square={profile.pythagoreanSquare} />
        </div>
      ),
    },
  ];

  return (
    <>
      <ChartCarousel slides={slides} />

      <ExportCard
        birthDate={profile.birthDate}
        placeLabel={profile.place.label}
      />
    </>
  );
};
