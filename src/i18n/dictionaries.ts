import type { Locale } from './locales';

export type Dictionary = {
  nav: {
    login: string;
    howItWorks: string;
  };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleEmphasis: string;
    titleAfter: string;
    lead: string;
    primaryCta: string;
    ghostCta: string;
  };
  howItWorks: {
    tag: string;
    heading: string;
    steps: { num: string; title: string; text: string }[];
  };
};

const en: Dictionary = {
  nav: {
    login: 'Sign In',
    howItWorks: 'How It Works',
  },
  hero: {
    eyebrow: 'Astrology + Numerology',
    titleBefore: 'The sky at the moment of your ',
    titleEmphasis: 'birth',
    titleAfter: ', broken down into numbers.',
    lead: 'Enter your birth date, time, and place — get your natal chart and Destiny Matrix in one card you can save or share with the world.',
    primaryCta: 'Build My Chart',
    ghostCta: 'See Example Result',
  },
  howItWorks: {
    tag: 'Process',
    heading: 'Three Steps to Your Chart',
    steps: [
      {
        num: '01',
        title: 'Date, Time, Place',
        text: 'Enter your birth details — accuracy to the minute affects your ascendant and houses.',
      },
      {
        num: '02',
        title: 'Calculation',
        text: 'The server computes planetary positions and the Destiny Matrix simultaneously, in parallel requests.',
      },
      {
        num: '03',
        title: 'Card to Keep',
        text: 'Get a visual card — download it as a PDF or share the image.',
      },
    ],
  },
};

const uk: Dictionary = {
  nav: {
    login: 'Вхід',
    howItWorks: 'Як це працює',
  },
  hero: {
    eyebrow: 'Астрологія + нумерологія',
    titleBefore: 'Небо в момент свого ',
    titleEmphasis: 'народження',
    titleAfter: ', розкладене на цифри.',
    lead: 'Вкажи дату, час і місце народження — отримаєш натальну карту та Матрицю Долі в одній картці, яку можна зберегти або показати світу.',
    primaryCta: 'Побудувати мою карту',
    ghostCta: 'Приклад результату',
  },
  howItWorks: {
    tag: 'Процес',
    heading: 'Три кроки до карти',
    steps: [
      {
        num: '01',
        title: 'Дата, час, місце',
        text: 'Вводиш дані народження — точність до хвилини впливає на асцендент і будинки.',
      },
      {
        num: '02',
        title: 'Розрахунок',
        text: 'Сервер рахує позиції планет та Матрицю Долі одночасно, паралельними запитами.',
      },
      {
        num: '03',
        title: 'Картка на збереження',
        text: 'Отримуєш візуальну картку — завантажуєш як PDF або ділишся зображенням.',
      },
    ],
  },
};

const pl: Dictionary = {
  nav: {
    login: 'Zaloguj się',
    howItWorks: 'Jak to działa',
  },
  hero: {
    eyebrow: 'Astrologia + numerologia',
    titleBefore: 'Niebo w chwili twoich ',
    titleEmphasis: 'narodzin',
    titleAfter: ', rozłożone na liczby.',
    lead: 'Podaj datę, godzinę i miejsce urodzenia — otrzymasz mapę natalną i Matrycę Przeznaczenia w jednej karcie, którą możesz zapisać lub pokazać światu.',
    primaryCta: 'Zbuduj moją mapę',
    ghostCta: 'Zobacz przykładowy wynik',
  },
  howItWorks: {
    tag: 'Proces',
    heading: 'Trzy kroki do mapy',
    steps: [
      {
        num: '01',
        title: 'Data, godzina, miejsce',
        text: 'Wprowadzasz dane urodzenia — dokładność co do minuty wpływa na ascendent i domy.',
      },
      {
        num: '02',
        title: 'Obliczenia',
        text: 'Serwer oblicza pozycje planet i Matrycę Przeznaczenia jednocześnie, równoległymi zapytaniami.',
      },
      {
        num: '03',
        title: 'Karta do zachowania',
        text: 'Otrzymujesz wizualną kartę — pobierz jako PDF lub udostępnij jako obraz.',
      },
    ],
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, uk, pl };
