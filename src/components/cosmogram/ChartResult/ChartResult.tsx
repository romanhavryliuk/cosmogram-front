'use client';

import { ChartCarousel } from '@/components/cosmogram/ChartCarousel';
import type { ChartSlide } from '@/components/cosmogram/ChartCarousel';
import { DestinyMatrix } from '@/components/cosmogram/DestinyMatrix';
import { ExportCard } from '@/components/cosmogram/ExportCard';
import { NatalChartWheel } from '@/components/cosmogram/NatalChartWheel';
import { NatalLists } from '@/components/cosmogram/NatalLists';
import { PythagoreanSquare } from '@/components/cosmogram/PythagoreanSquare';
import { useAstroLabels } from '@/hooks/useAstroLabels';
import { useLocale } from '@/i18n/LocaleProvider';
import type { CosmogramView } from '@/types/profile.types';

import styles from './ChartResult.module.css';

type ChartResultProps = {
  /** Власний профіль, гостьовий розрахунок або карта за посиланням */
  profile: CosmogramView;
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
  // «Знак зодіаку» в побуті — це знак Сонця. Без нього в підзаголовку
  // першим стояв асцендент, і його легко прийняти за «свій знак»
  const sunSign = profile.chart.planets.find(
    ({ planet }) => planet === 'sun',
  )?.sign;

  const slides: ChartSlide[] = [
    {
      id: 'chart',
      tabLabel: t.result.chartTitle,
      title: t.result.chartTitle,
      // Без часу народження доми, асцендент і MC не рахуються — замість
      // них чесно кажемо, чому їх немає і що може бути неточним
      subtitle: (
        <>
          {sunSign && (
            <>
              {t.result.sunSignPrefix} {labels.sign[sunSign]}
              {' · '}
            </>
          )}
          {ascendantSign ? (
            <>
              {t.result.ascendantPrefix} {labels.sign[ascendantSign]}
              {midheavenSign && (
                <>
                  {' · '}
                  {t.result.midheavenPrefix} {labels.sign[midheavenSign]}
                </>
              )}
            </>
          ) : (
            t.result.timeUnknownNote
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
            <NatalLists
              planets={profile.chart.planets}
              aspects={profile.chart.aspects}
            />
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
