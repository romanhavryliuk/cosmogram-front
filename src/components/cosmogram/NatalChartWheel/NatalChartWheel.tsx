'use client';

import { useId } from 'react';
import clsx from 'clsx';

import { ASPECT_COLORS, PLANET_GLYPHS } from '@/i18n/astroLabels';
import { ZODIAC_SIGNS } from '@/types/astrology.types';
import type { AspectType, NatalChart } from '@/types/astrology.types';
import { polarPoint } from '@/utils/geometry';

import styles from './NatalChartWheel.module.css';

type NatalChartWheelProps = {
  chart: NatalChart;
  /** Розмір системи координат SVG; на вузькому екрані CSS масштабує його вниз */
  size?: number;
  /** Опис колеса для скрінрідера — приходить зі словника */
  label: string;
  className?: string;
};

const ZODIAC_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

/** Стихія повторюється кожні 4 знаки — тінт сектора підказує її без підписів */
const ELEMENT_FILLS = [
  'rgba(217, 179, 77, 0.07)', // вогонь
  'rgba(94, 163, 147, 0.06)', // земля
  'rgba(185, 178, 201, 0.05)', // повітря
  'rgba(91, 42, 134, 0.10)', // вода
];

/** Мінімальний кут між гліфами планет, щоб вони не наїжджали один на одного */
const MIN_GLYPH_GAP_DEG = 9;

/** Тонкі аспекти малюємо пунктиром — суцільними лишаються лише мажорні */
const DASHED_ASPECTS: AspectType[] = ['sextile', 'conjunction'];

const normalize = (angle: number) => ((angle % 360) + 360) % 360;

const annulusSector = (
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number,
) => {
  const oStart = polarPoint(cx, cy, rOuter, startDeg);
  const oEnd = polarPoint(cx, cy, rOuter, endDeg);
  const iEnd = polarPoint(cx, cy, rInner, endDeg);
  const iStart = polarPoint(cx, cy, rInner, startDeg);

  return [
    `M ${oStart.x} ${oStart.y}`,
    `A ${rOuter} ${rOuter} 0 0 1 ${oEnd.x} ${oEnd.y}`,
    `L ${iEnd.x} ${iEnd.y}`,
    `A ${rInner} ${rInner} 0 0 0 ${iStart.x} ${iStart.y}`,
    'Z',
  ].join(' ');
};

/**
 * Розсуває гліфи планет, що стоять надто близько за довготою, лишаючи
 * маркер на справжньому градусі. Релаксація по колу, а не зсув в один бік:
 * інакше скупчення «випливає» вбік і замикання через 360° ламається.
 */
const spreadGlyphAngles = (longitudes: number[]) => {
  const count = longitudes.length;
  if (count < 2) return [...longitudes];

  const order = longitudes
    .map((_, index) => index)
    .sort((a, b) => longitudes[a] - longitudes[b]);
  const angles = order.map((index) => longitudes[index]);

  for (let pass = 0; pass < 30; pass += 1) {
    let moved = false;

    for (let i = 0; i < count; i += 1) {
      const next = (i + 1) % count;
      const gap =
        next === 0
          ? angles[next] + 360 - angles[i]
          : angles[next] - angles[i];

      if (gap < MIN_GLYPH_GAP_DEG) {
        const push = (MIN_GLYPH_GAP_DEG - gap) / 2;
        angles[i] -= push;
        angles[next] += push;
        moved = true;
      }
    }

    if (!moved) break;
  }

  const display = new Array<number>(count);
  order.forEach((originalIndex, i) => {
    display[originalIndex] = angles[i];
  });
  return display;
};

export const NatalChartWheel = ({
  chart,
  size = 340,
  label,
  className,
}: NatalChartWheelProps) => {
  const gradientId = useId();
  const c = size / 2;

  const rOuter = size * 0.48;
  const rSignInner = size * 0.385;
  const rSignGlyph = size * 0.433;
  const rTickMinor = size * 0.368;
  const rTickMajor = size * 0.355;
  const rPlanetDot = size * 0.345;
  const rPlanetGlyph = size * 0.29;
  const rHouseNumber = size * 0.235;
  const rHub = size * 0.205;

  const glyphAngles = spreadGlyphAngles(
    chart.planets.map((planet) => planet.longitude),
  );

  const planets = chart.planets.map((position, index) => ({
    planet: position.planet,
    glyph: PLANET_GLYPHS[position.planet],
    retrograde: position.retrograde,
    // Маркер лишається на істинному градусі…
    dot: polarPoint(c, c, rPlanetDot, position.longitude),
    tick: polarPoint(c, c, rSignInner, position.longitude),
    // …а гліф зсунутий, тож їх треба явно з'єднати виноскою
    glyphAt: polarPoint(c, c, rPlanetGlyph, glyphAngles[index]),
  }));

  const longitudeByPlanet = new Map(
    chart.planets.map((position) => [position.planet, position.longitude]),
  );

  const aspectLines = chart.aspects.flatMap((aspect) => {
    const from = longitudeByPlanet.get(aspect.from);
    const to = longitudeByPlanet.get(aspect.to);
    // Аспект до планети, якої немає у видачі, малювати нічим
    if (from === undefined || to === undefined) return [];

    return [
      {
        key: `${aspect.from}-${aspect.to}-${aspect.type}`,
        color: ASPECT_COLORS[aspect.type],
        dashed: DASHED_ASPECTS.includes(aspect.type),
        from: polarPoint(c, c, rHub, from),
        to: polarPoint(c, c, rHub, to),
      },
    ];
  });

  const houseCusps = chart.houses.map((cusp, index) => {
    const next = chart.houses[(index + 1) % chart.houses.length];
    // Номер ставимо посеред сектора, а не біля межі, щоб він не злипався з лінією
    const span = normalize(next.longitude - cusp.longitude) || 30;

    return {
      house: cusp.house,
      // I і X будинки — кутові (асцендент і MC), тому лінія помітніша
      isAngular: cusp.house === 1 || cusp.house === 10,
      inner: polarPoint(c, c, rHub, cusp.longitude),
      outer: polarPoint(c, c, rSignInner, cusp.longitude),
      numberAt: polarPoint(c, c, rHouseNumber, cusp.longitude + span / 2),
    };
  });

  // Поділки: кожні 5° коротка риска, кожні 30° (межа знака) — довга
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angle = i * 5;
    const isMajor = angle % 30 === 0;
    return {
      angle,
      isMajor,
      from: polarPoint(c, c, rSignInner, angle),
      to: polarPoint(c, c, isMajor ? rTickMajor : rTickMinor, angle),
    };
  });

  return (
    <div
      className={clsx(styles.wrap, className)}
      style={{ maxWidth: size }}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        className={styles.svg}
      >
        <defs>
          <radialGradient id={`${gradientId}-hub`}>
            <stop offset="0%" stopColor="rgba(91, 42, 134, 0.4)" />
            <stop offset="60%" stopColor="rgba(16, 17, 42, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Сектори знаків із тінтом стихії */}
        {ZODIAC_SIGNS.map((sign, index) => (
          <path
            key={sign}
            d={annulusSector(
              c,
              c,
              rSignInner,
              rOuter,
              index * 30,
              (index + 1) * 30,
            )}
            fill={ELEMENT_FILLS[index % 4]}
            stroke="none"
          />
        ))}

        {/* Обідки пояса знаків */}
        <circle
          cx={c}
          cy={c}
          r={rOuter}
          fill="none"
          stroke="var(--gold-dim)"
          strokeWidth={1}
        />
        <circle
          cx={c}
          cy={c}
          r={rSignInner}
          fill="none"
          stroke="var(--gold-dim)"
          strokeWidth={0.8}
        />

        {/* Межі знаків */}
        {Array.from({ length: 12 }, (_, i) => {
          const inner = polarPoint(c, c, rSignInner, i * 30);
          const outer = polarPoint(c, c, rOuter, i * 30);
          return (
            <line
              key={`sign-${i}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--gold-dim)"
              strokeWidth={0.7}
              opacity={0.8}
            />
          );
        })}

        {/* Гліфи знаків */}
        {ZODIAC_GLYPHS.map((glyph, i) => {
          const at = polarPoint(c, c, rSignGlyph, i * 30 + 15);
          return (
            <text
              key={`glyph-${i}`}
              x={at.x}
              y={at.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.044}
              className={styles.signGlyph}
            >
              {glyph}
            </text>
          );
        })}

        {/* Градусні поділки */}
        {ticks.map((tick) => (
          <line
            key={`tick-${tick.angle}`}
            x1={tick.from.x}
            y1={tick.from.y}
            x2={tick.to.x}
            y2={tick.to.y}
            stroke="var(--gold-dim)"
            strokeWidth={tick.isMajor ? 0.8 : 0.5}
            opacity={tick.isMajor ? 0.85 : 0.4}
          />
        ))}

        {/* Ядро з градієнтом — без нього центр виглядає провалом */}
        <circle cx={c} cy={c} r={rHub} fill={`url(#${gradientId}-hub)`} />
        <circle
          cx={c}
          cy={c}
          r={rHub}
          fill="none"
          stroke="var(--line)"
          strokeWidth={0.6}
        />

        {/* Куспіди будинків */}
        {houseCusps.map((cusp) => (
          <line
            key={`house-${cusp.house}`}
            x1={cusp.inner.x}
            y1={cusp.inner.y}
            x2={cusp.outer.x}
            y2={cusp.outer.y}
            stroke={cusp.isAngular ? 'var(--teal)' : 'var(--line)'}
            strokeWidth={cusp.isAngular ? 1.2 : 0.6}
            opacity={cusp.isAngular ? 0.9 : 0.7}
          />
        ))}

        {/* Номери будинків посеред своїх секторів */}
        {houseCusps.map((cusp) => (
          <text
            key={`house-num-${cusp.house}`}
            x={cusp.numberAt.x}
            y={cusp.numberAt.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.03}
            className={styles.houseNumber}
          >
            {cusp.house}
          </text>
        ))}

        {/* Лінії аспектів */}
        {aspectLines.map((line) => (
          <line
            key={line.key}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={line.color}
            strokeWidth={0.9}
            strokeDasharray={line.dashed ? '3 3' : undefined}
            opacity={0.7}
          />
        ))}

        {/* Планети: риска на істинному градусі, маркер і винесений гліф */}
        {planets.map((planet) => (
          <g key={planet.planet}>
            <line
              x1={planet.tick.x}
              y1={planet.tick.y}
              x2={planet.dot.x}
              y2={planet.dot.y}
              stroke="var(--gold-soft)"
              strokeWidth={1}
              opacity={0.8}
            />
            <line
              x1={planet.dot.x}
              y1={planet.dot.y}
              x2={planet.glyphAt.x}
              y2={planet.glyphAt.y}
              stroke="var(--gold-dim)"
              strokeWidth={0.6}
              opacity={0.6}
            />
            <circle
              cx={planet.dot.x}
              cy={planet.dot.y}
              r={size * 0.009}
              className={styles.planetDot}
            />
            <text
              x={planet.glyphAt.x}
              y={planet.glyphAt.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.052}
              className={styles.planetGlyph}
            >
              {planet.glyph}
            </text>
            {planet.retrograde && (
              <text
                x={planet.glyphAt.x + size * 0.032}
                y={planet.glyphAt.y + size * 0.028}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={size * 0.026}
                className={styles.retrograde}
              >
                ℞
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
