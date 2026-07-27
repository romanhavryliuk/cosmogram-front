/** "1994-08-17" -> "17.08.1994" */
export const formatBirthDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}.${month}.${year}`;
};

/** ISO-таймстемп -> "17 серпня 1994" */
export const formatLongDate = (isoString: string): string =>
  new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoString));

/** Максимальна дата для <input type="date"> — сьогодні */
export const todayAsInputValue = (): string =>
  new Date().toISOString().slice(0, 10);

/**
 * Сума всіх цифр дати народження, зведена до 1–22.
 * Базове число для матриці долі та квадрата Піфагора.
 */
export const digitSum = (isoDate: string, limit = 22): number => {
  let sum = isoDate
    .replace(/\D/g, '')
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);

  while (sum > limit) {
    sum = String(sum)
      .split('')
      .reduce((acc, digit) => acc + Number(digit), 0);
  }

  return sum;
};

/** Повних років на сьогодні */
export const getAge = (isoDate: string): number => {
  const birth = new Date(isoDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
};
