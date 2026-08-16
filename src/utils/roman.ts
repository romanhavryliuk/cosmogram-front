const ROMAN_HOUSES = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
] as const;

/** Номер будинку 1–12 -> римська цифра. Поза діапазоном віддаємо як є. */
export const houseToRoman = (house: number): string =>
  ROMAN_HOUSES[house - 1] ?? String(house);
