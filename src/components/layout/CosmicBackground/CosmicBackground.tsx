'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import styles from './CosmicBackground.module.css';
import { BRIGHT_STARS, MIN_VISIBLE_DEC, visibleFromLviv } from './starCatalog';
import type { Star } from './starCatalog';

type Meteor = {
  x: string;
  y: string;
  delay: string;
  dur: string;
  txVw: number;
  tyVh: number;
};

const METEORS: Meteor[] = [
  { x: '5%', y: '6%', delay: '0.3s', dur: '7s', txVw: 145, tyVh: 75 },
  { x: '40%', y: '2%', delay: '3.1s', dur: '8.5s', txVw: 130, tyVh: 95 },
  { x: '70%', y: '10%', delay: '5.6s', dur: '6.5s', txVw: 160, tyVh: 60 },
  { x: '15%', y: '30%', delay: '8s', dur: '9s', txVw: 120, tyVh: 100 },
  { x: '55%', y: '20%', delay: '1.8s', dur: '7.8s', txVw: 150, tyVh: 85 },
  { x: '85%', y: '35%', delay: '10.2s', dur: '6.2s', txVw: 135, tyVh: 70 },
];

// vw/vh скейляться по-різному залежно від аспекту екрана, тому кут хвоста
// рахуємо з реальних пікселів травелу, а не фіксуємо його на око.
const DEFAULT_VIEWPORT = { width: 1440, height: 900 };

const getTailRotationDeg = (txVw: number, tyVh: number, viewportWidth: number, viewportHeight: number) => {
  const dx = (txVw / 100) * viewportWidth;
  const dy = (tyVh / 100) * viewportHeight;
  const travelAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  return ((travelAngle + 180) % 360 + 360) % 360;
};

// Екваторіальні координати (RA/Dec) проєктуємо на рівномірну прямокутну сітку:
// RA (0–24г) → X, Dec (від горизонту Львова до зеніту) → Y. Це не "живий" вигляд
// неба в конкретну мить, а стилізована зоряна мапа з реальних відносних позицій
// і яскравості зір, видимих із широти Львова (49.84°N).
const MAG_BRIGHTEST = -1.5;
const MAG_DIMMEST = 3.5;

const brightnessFactor = (mag: number) => {
  const clamped = Math.min(Math.max(mag, MAG_BRIGHTEST), MAG_DIMMEST);
  return (MAG_DIMMEST - clamped) / (MAG_DIMMEST - MAG_BRIGHTEST);
};

const STAR_RENDER_DATA = BRIGHT_STARS.filter(visibleFromLviv).map((star: Star, i: number) => {
  const x = (star.ra / 24) * 100;
  const y = 100 - ((star.dec - MIN_VISIBLE_DEC) / (90 - MIN_VISIBLE_DEC)) * 100;
  const brightness = brightnessFactor(star.mag);
  const size = 0.8 + brightness * 2.2;
  const maxOpacity = 0.45 + brightness * 0.55;
  const delay = ((i * 0.53) % 5).toFixed(2);
  const duration = (4 + ((i * 0.29) % 3)).toFixed(2);

  const style = {
    '--x': `${x.toFixed(2)}%`,
    '--y': `${y.toFixed(2)}%`,
    '--size': `${size.toFixed(2)}px`,
    '--max-opacity': maxOpacity.toFixed(2),
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    '--color': star.color ?? 'var(--parchment)',
  } as CSSProperties;

  return { name: star.name, style };
});

export const CosmicBackground = () => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div className={styles.cosmos} aria-hidden="true">
      <div className={`${styles.nebula} ${styles.n1}`} />
      <div className={`${styles.nebula} ${styles.n2}`} />
      <div className={`${styles.nebula} ${styles.n3}`} />
      {STAR_RENDER_DATA.map((star) => (
        <div key={star.name} className={styles.star} style={star.style} />
      ))}
      {METEORS.map((meteor, i) => {
        const rot = getTailRotationDeg(meteor.txVw, meteor.tyVh, viewport.width, viewport.height);
        const style = {
          '--x': meteor.x,
          '--y': meteor.y,
          '--delay': meteor.delay,
          '--dur': meteor.dur,
          '--tx': `${meteor.txVw}vw`,
          '--ty': `${meteor.tyVh}vh`,
          '--rot': `${rot}deg`,
        } as CSSProperties;
        return <div key={i} className={styles.shootingStar} style={style} />;
      })}
    </div>
  );
};
