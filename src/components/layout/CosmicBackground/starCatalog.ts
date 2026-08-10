// Реальні яскраві зорі (J2000, right ascension у годинах, declination у градусах,
// видима зоряна величина — менше значення = яскравіше). Дані наближені до
// каталожних (Hipparcos/Bright Star Catalogue), достатньо точні для декоративної мапи.
export type Star = {
  name: string;
  ra: number;
  dec: number;
  mag: number;
  /** Спектральний відтінок кольору (за реальним спектральним класом зорі) */
  color?: string;
};

const BLUE_WHITE = '#cad9ff';
const YELLOW_WHITE = '#fff3d6';
const ORANGE = '#ffcf9e';
const RED = '#ffab8a';

export const BRIGHT_STARS: Star[] = [
  { name: 'Sirius', ra: 6.752, dec: -16.716, mag: -1.46, color: BLUE_WHITE },
  { name: 'Arcturus', ra: 14.261, dec: 19.182, mag: -0.05, color: ORANGE },
  { name: 'Vega', ra: 18.615, dec: 38.784, mag: 0.03, color: BLUE_WHITE },
  { name: 'Capella', ra: 5.278, dec: 45.998, mag: 0.08, color: YELLOW_WHITE },
  { name: 'Rigel', ra: 5.242, dec: -8.202, mag: 0.13, color: BLUE_WHITE },
  { name: 'Procyon', ra: 7.655, dec: 5.225, mag: 0.34, color: YELLOW_WHITE },
  { name: 'Betelgeuse', ra: 5.919, dec: 7.407, mag: 0.5, color: RED },
  { name: 'Altair', ra: 19.846, dec: 8.868, mag: 0.77 },
  { name: 'Aldebaran', ra: 4.599, dec: 16.509, mag: 0.85, color: ORANGE },
  { name: 'Spica', ra: 13.42, dec: -11.161, mag: 1.04, color: BLUE_WHITE },
  { name: 'Antares', ra: 16.49, dec: -26.432, mag: 1.06, color: RED },
  { name: 'Pollux', ra: 7.755, dec: 28.026, mag: 1.14, color: ORANGE },
  { name: 'Deneb', ra: 20.69, dec: 45.28, mag: 1.25 },
  { name: 'Regulus', ra: 10.14, dec: 11.967, mag: 1.35, color: BLUE_WHITE },
  { name: 'Castor', ra: 7.577, dec: 31.888, mag: 1.58 },
  { name: 'Polaris', ra: 2.53, dec: 89.264, mag: 1.98, color: YELLOW_WHITE },
  { name: 'Bellatrix', ra: 5.418, dec: 6.35, mag: 1.64, color: BLUE_WHITE },
  { name: 'Elnath', ra: 5.438, dec: 28.608, mag: 1.65, color: BLUE_WHITE },
  { name: 'Alnilam', ra: 5.603, dec: -1.202, mag: 1.69, color: BLUE_WHITE },
  { name: 'Alnitak', ra: 5.679, dec: -1.943, mag: 1.74, color: BLUE_WHITE },
  { name: 'Alioth', ra: 12.9, dec: 55.96, mag: 1.76 },
  { name: 'Dubhe', ra: 11.062, dec: 61.751, mag: 1.79, color: ORANGE },
  { name: 'Mirfak', ra: 3.405, dec: 49.861, mag: 1.79, color: YELLOW_WHITE },
  { name: 'Wezen', ra: 7.14, dec: -26.393, mag: 1.83, color: YELLOW_WHITE },
  { name: 'Alkaid', ra: 13.792, dec: 49.313, mag: 1.86, color: BLUE_WHITE },
  { name: 'Menkalinan', ra: 5.992, dec: 44.947, mag: 1.9, color: YELLOW_WHITE },
  { name: 'Mizar', ra: 13.399, dec: 54.925, mag: 2.04 },
  { name: 'Alphecca', ra: 15.578, dec: 26.715, mag: 2.23, color: BLUE_WHITE },
  { name: 'Schedar', ra: 0.675, dec: 56.537, mag: 2.24, color: ORANGE },
  { name: 'Mintaka', ra: 5.533, dec: -0.3, mag: 2.23, color: BLUE_WHITE },
  { name: 'Caph', ra: 0.153, dec: 59.15, mag: 2.28, color: YELLOW_WHITE },
  { name: 'Algieba', ra: 10.333, dec: 19.842, mag: 2.28, color: ORANGE },
  { name: 'Sadr', ra: 20.37, dec: 40.257, mag: 2.2 },
  { name: 'Gamma Cas', ra: 0.945, dec: 60.717, mag: 2.15, color: BLUE_WHITE },
  { name: 'Merak', ra: 11.031, dec: 56.382, mag: 2.37 },
  { name: 'Denebola', ra: 11.818, dec: 14.572, mag: 2.14, color: BLUE_WHITE },
  { name: 'Algol', ra: 3.136, dec: 40.956, mag: 2.12, color: BLUE_WHITE },
  { name: 'Kochab', ra: 14.845, dec: 74.156, mag: 2.08, color: ORANGE },
  { name: 'Alderamin', ra: 21.31, dec: 62.585, mag: 2.44, color: YELLOW_WHITE },
  { name: 'Eltanin', ra: 17.943, dec: 51.489, mag: 2.23, color: ORANGE },
  { name: 'Saiph', ra: 5.796, dec: -9.67, mag: 2.06, color: BLUE_WHITE },
  { name: 'Alpheratz', ra: 0.139, dec: 29.09, mag: 2.06, color: BLUE_WHITE },
  { name: 'Mirach', ra: 1.162, dec: 35.621, mag: 2.06, color: RED },
  { name: 'Ruchbah', ra: 1.43, dec: 60.235, mag: 2.68, color: YELLOW_WHITE },
  { name: 'Izar', ra: 14.75, dec: 27.074, mag: 2.37, color: ORANGE },
  { name: 'Almach', ra: 2.065, dec: 42.33, mag: 2.1, color: ORANGE },
  { name: 'Phecda', ra: 11.897, dec: 53.695, mag: 2.44 },
  { name: 'Scheat', ra: 23.063, dec: 28.083, mag: 2.42, color: RED },
  { name: 'Markab', ra: 23.079, dec: 15.205, mag: 2.49, color: BLUE_WHITE },
  { name: 'Rastaban', ra: 17.507, dec: 52.301, mag: 2.79, color: YELLOW_WHITE },
  { name: 'Kornephoros', ra: 16.503, dec: 21.49, mag: 2.77, color: YELLOW_WHITE },
  { name: 'Alcyone', ra: 3.791, dec: 24.105, mag: 2.87, color: BLUE_WHITE },
  { name: 'Tarazed', ra: 19.771, dec: 10.613, mag: 2.72, color: ORANGE },
  { name: 'Segin', ra: 1.906, dec: 63.67, mag: 3.35, color: BLUE_WHITE },
  { name: 'Sheliak', ra: 18.835, dec: 33.363, mag: 3.45 },
  { name: 'Pherkad', ra: 15.345, dec: 71.834, mag: 3.05, color: BLUE_WHITE },
  { name: 'Megrez', ra: 12.257, dec: 57.033, mag: 3.31 },
];

/** Географічна широта Львова — визначає, які зорі взагалі підіймаються над горизонтом */
export const LVIV_LATITUDE = 49.84;

/** Зорі з схиленням нижче цієї межі ніколи не видно з широти Львова */
export const MIN_VISIBLE_DEC = LVIV_LATITUDE - 90;

export const visibleFromLviv = (star: Star) => star.dec >= MIN_VISIBLE_DEC;
