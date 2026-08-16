/**
 * Округлюємо до трьох знаків, щоб уникнути розбіжності останніх розрядів
 * Math.sin/cos між серверним і клієнтським рушієм (ламає SSR-гідратацію).
 */
export const roundCoord = (value: number): number =>
  Math.round(value * 1000) / 1000;

/**
 * Точка на колі. Кут у градусах, 0° — верхня точка, далі за годинниковою
 * стрілкою — та сама конвенція, що й у ZodiacWheel.
 */
export const polarPoint = (
  cx: number,
  cy: number,
  radius: number,
  degrees: number,
): { x: number; y: number } => {
  const radians = ((degrees - 90) * Math.PI) / 180;

  return {
    x: roundCoord(cx + radius * Math.cos(radians)),
    y: roundCoord(cy + radius * Math.sin(radians)),
  };
};
