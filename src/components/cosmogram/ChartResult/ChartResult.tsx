'use client';

import clsx from 'clsx';

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

/** Три колонки результату (натальна карта, матриця долі, квадрат Піфагора) плюс смуга експорту під ними */
export const ChartResult = ({ profile }: ChartResultProps) => {
  const { t } = useLocale();
  const labels = useAstroLabels();

  // Куспід першого будинку і є асцендентом — знак беремо готовим з бекенду
  const ascendantSign = profile.chart.houses.find(
    (house) => house.house === 1,
  )?.sign;

  return (
    <>
      <div className={styles.grid}>
        <article className={styles.col}>
          <h3 className={styles.title}>{t.result.chartTitle}</h3>
          {ascendantSign && (
            <p className={styles.sub}>
              {t.result.ascendantPrefix} {labels.sign[ascendantSign]}
            </p>
          )}
          <div className={styles.wheel}>
            <NatalChartWheel chart={profile.chart} label={t.result.wheelLabel} />
          </div>
          <PlanetList planets={profile.chart.planets} />
        </article>

        <article className={styles.col}>
          <h3 className={styles.title}>{t.result.matrixTitle}</h3>
          <p className={styles.sub}>{t.result.matrixSubtitle}</p>
          <DestinyMatrix matrix={profile.destinyMatrix} />
        </article>

        <article className={clsx(styles.col, styles.squareCol)}>
          <h3 className={styles.title}>{t.result.squareTitle}</h3>
          <p className={styles.sub}>{t.result.squareSubtitle}</p>
          <PythagoreanSquare square={profile.pythagoreanSquare} />
        </article>
      </div>

      <ExportCard
        profileId={profile.id}
        birthDate={profile.birthDate}
        placeLabel={profile.place.label}
      />
    </>
  );
};
