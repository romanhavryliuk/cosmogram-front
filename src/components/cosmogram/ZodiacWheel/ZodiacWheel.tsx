import clsx from 'clsx';

import styles from './ZodiacWheel.module.css';

const ZODIAC_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

type ZodiacWheelProps = {
  size: number;
  lineColor?: string;
  glyphColor?: string;
  decorative?: boolean;
  animated?: boolean;
  className?: string;
};

export const ZodiacWheel = ({
  size,
  lineColor = 'var(--gold)',
  glyphColor = 'var(--parchment)',
  decorative = true,
  animated = false,
  className,
}: ZodiacWheelProps) => {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.48;
  const rInner = size * 0.38;
  const rGlyph = size * 0.43;
  const rCore = size * 0.22;
  const fontSize = size * 0.045;

  // Округлюємо, щоб уникнути розбіжності останніх розрядів Math.sin/cos
  // між серверним і клієнтським рушієм (ламає SSR-гідратацію).
  const round = (value: number) => Math.round(value * 1000) / 1000;

  const houses = Array.from({ length: 12 }, (_, i) => {
    const angle = ((i * 30 - 90) * Math.PI) / 180;
    return {
      x1: round(cx + rInner * Math.cos(angle)),
      y1: round(cy + rInner * Math.sin(angle)),
      x2: round(cx + rOuter * Math.cos(angle)),
      y2: round(cy + rOuter * Math.sin(angle)),
    };
  });

  const glyphs = ZODIAC_GLYPHS.map((glyph, i) => {
    const angle = ((i * 30 + 15 - 90) * Math.PI) / 180;
    return {
      glyph,
      x: round(cx + rGlyph * Math.cos(angle)),
      y: round(cy + rGlyph * Math.sin(angle)),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={clsx(animated && styles.spin, className)}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : 'Зодіакальне коло'}
    >
      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke={lineColor} strokeWidth={0.8} opacity={0.75} />
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke={lineColor} strokeWidth={0.6} opacity={0.45} />
      <circle cx={cx} cy={cy} r={rCore} fill="none" stroke={lineColor} strokeWidth={0.5} opacity={0.3} />
      {houses.map((house, i) => (
        <line
          key={i}
          x1={house.x1}
          y1={house.y1}
          x2={house.x2}
          y2={house.y2}
          stroke={lineColor}
          strokeWidth={0.6}
          opacity={0.5}
        />
      ))}
      {glyphs.map(({ glyph, x, y }, i) => (
        <text
          key={i}
          x={x}
          y={y}
          fill={glyphColor}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          opacity={0.9}
          className={animated ? styles.glyphSpin : undefined}
        >
          {glyph}
        </text>
      ))}
    </svg>
  );
};
