import clsx from 'clsx';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { PLANET_GLYPHS } from '@/i18n/astroLabels';
import type { NatalChart } from '@/types/astrology.types';
import { polarPoint } from '@/utils/geometry';

import styles from './NatalChartWheel.module.css';

type NatalChartWheelProps = {
  chart: NatalChart;
  size?: number;
  /** Опис колеса для скрінрідера — приходить зі словника */
  label: string;
  className?: string;
};

/**
 * Зодіакальне коло з нанесеними позиціями планет.
 * Кут = довгота на екліптиці, 0° угорі, далі за годинниковою стрілкою —
 * та сама конвенція, що й у ZodiacWheel, щоб гліфи збігалися з секторами.
 */
export const NatalChartWheel = ({
  chart,
  size = 240,
  label,
  className,
}: NatalChartWheelProps) => {
  const center = size / 2;
  const planetRadius = size * 0.3;
  const fontSize = size * 0.05;

  const planets = chart.planets.map((position) => ({
    planet: position.planet,
    glyph: PLANET_GLYPHS[position.planet],
    ...polarPoint(center, center, planetRadius, position.longitude),
  }));

  const ascendantStart = polarPoint(center, center, size * 0.38, chart.ascendant);
  const ascendantEnd = polarPoint(center, center, size * 0.48, chart.ascendant);

  return (
    <div
      className={clsx(styles.wrap, className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <ZodiacWheel size={size} />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.overlay}
        aria-hidden="true"
      >
        <line
          x1={ascendantStart.x}
          y1={ascendantStart.y}
          x2={ascendantEnd.x}
          y2={ascendantEnd.y}
          stroke="var(--teal)"
          strokeWidth={1.4}
        />
        {planets.map(({ planet, glyph, x, y }) => (
          <text
            key={planet}
            x={x}
            y={y}
            fill="var(--gold-soft)"
            fontSize={fontSize}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {glyph}
          </text>
        ))}
      </svg>
    </div>
  );
};
