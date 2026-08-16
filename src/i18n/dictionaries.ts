import type { PythagoreanDigit } from '@/types/astrology.types';

import type { Locale } from './locales';

export type Dictionary = {
  nav: {
    login: string;
    signUp: string;
    howItWorks: string;
    menu: string;
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
  auth: {
    login: {
      title: string;
      emailLabel: string;
      passwordLabel: string;
      submitCta: string;
      submitLoadingCta: string;
      switchText: string;
      switchLinkText: string;
      genericError: string;
    };
    register: {
      title: string;
      nameLabel: string;
      emailLabel: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      submitCta: string;
      submitLoadingCta: string;
      switchText: string;
      switchLinkText: string;
      genericError: string;
    };
    validation: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordMin: string;
      passwordLetter: string;
      passwordDigit: string;
      nameMin: string;
      nameMax: string;
      confirmPasswordRequired: string;
      passwordMismatch: string;
    };
  };
  birthForm: {
    tag: string;
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    dateLabel: string;
    timeLabel: string;
    placeLabel: string;
    placePlaceholder: string;
    placeSearching: string;
    placeNoResults: string;
    submitCta: string;
    submitLoadingCta: string;
    note: string;
    /** Гостю: форма працює, але зберегти карту можна тільки залогіненим */
    authRequired: string;
    genericError: string;
    validation: {
      nameMin: string;
      nameMax: string;
      dateFormat: string;
      dateInvalid: string;
      dateFuture: string;
      timeFormat: string;
      placeRequired: string;
    };
  };
  result: {
    tag: string;
    heading: string;
    chartTitle: string;
    ascendantPrefix: string;
    wheelLabel: string;
    retrograde: string;
    squareTitle: string;
    squareSubtitle: string;
    /** Заглушка в клітинці квадрата, якщо цифри немає в даті */
    emptyCell: string;
    squareLabels: Record<PythagoreanDigit, string>;
  };
  exportCard: {
    caption: string;
    downloadPdf: string;
    shareImage: string;
    preparing: string;
    linkCopied: string;
    genericError: string;
  };
};

const en: Dictionary = {
  nav: {
    login: 'Sign In',
    signUp: 'Sign Up',
    howItWorks: 'How It Works',
    menu: 'Menu',
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
  auth: {
    login: {
      title: 'Sign In',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      submitCta: 'Sign In →',
      submitLoadingCta: 'Signing in…',
      switchText: "Don't have an account?",
      switchLinkText: 'Sign up',
      genericError: 'Incorrect email or password',
    },
    register: {
      title: 'Registration',
      nameLabel: 'Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      submitCta: 'Create Account →',
      submitLoadingCta: 'Creating account…',
      switchText: 'Already have an account?',
      switchLinkText: 'Sign in',
      genericError: 'Something went wrong. Please try again.',
    },
    validation: {
      emailRequired: 'Enter your email',
      emailInvalid: 'Invalid email',
      passwordRequired: 'Enter your password',
      passwordMin: 'Password must be at least 8 characters',
      passwordLetter: 'Password must contain a letter',
      passwordDigit: 'Password must contain a digit',
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name is too long',
      confirmPasswordRequired: 'Confirm your password',
      passwordMismatch: "Passwords don't match",
    },
  },
  birthForm: {
    tag: 'Step 01',
    heading: 'Birth Details',
    nameLabel: 'Name',
    namePlaceholder: 'Maria',
    dateLabel: 'Date of Birth',
    timeLabel: 'Time of Birth',
    placeLabel: 'City of Birth',
    placePlaceholder: 'Lviv, Ukraine',
    placeSearching: 'Searching…',
    placeNoResults: 'Nothing found',
    submitCta: 'Calculate →',
    submitLoadingCta: 'Calculating…',
    note: 'The city is automatically converted into coordinates and a time zone — both are needed to place the houses precisely.',
    authRequired:
      'Sign in to build and save your chart — what you entered stays here.',
    genericError: "We couldn't build the chart. Please try again.",
    validation: {
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name is too long',
      dateFormat: 'Date must be in YYYY-MM-DD format',
      dateInvalid: 'Invalid date',
      dateFuture: 'Birth date cannot be in the future',
      timeFormat: 'Time must be in HH:MM format',
      placeRequired: 'Pick a city from the list',
    },
  },
  result: {
    tag: 'Step 02',
    heading: 'Result',
    chartTitle: 'Natal Chart',
    ascendantPrefix: 'Ascendant —',
    wheelLabel: 'Natal chart with planet positions',
    retrograde: 'Retrograde',
    squareTitle: 'Destiny Matrix',
    squareSubtitle: 'Pythagorean square from your birth date',
    emptyCell: '—',
    squareLabels: {
      '1': 'character',
      '2': 'energy',
      '3': 'interest',
      '4': 'health',
      '5': 'luck',
      '6': 'duty',
      '7': 'talent',
      '8': 'memory',
      '9': 'spirit',
    },
  },
  exportCard: {
    caption: 'Destiny Chart',
    downloadPdf: 'Download PDF',
    shareImage: 'Share Image',
    preparing: 'Preparing…',
    linkCopied: 'Link copied',
    genericError: "We couldn't create the file. Please try again.",
  },
};

const uk: Dictionary = {
  nav: {
    login: 'Вхід',
    signUp: 'Реєстрація',
    howItWorks: 'Як це працює',
    menu: 'Меню',
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
  auth: {
    login: {
      title: 'Вхід',
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      submitCta: 'Увійти →',
      submitLoadingCta: 'Входимо…',
      switchText: 'Немає акаунта?',
      switchLinkText: 'Зареєструйся',
      genericError: 'Невірний email або пароль',
    },
    register: {
      title: 'Реєстрація',
      nameLabel: "Ім'я",
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Підтвердіть пароль',
      submitCta: 'Створити акаунт →',
      submitLoadingCta: 'Створюємо акаунт…',
      switchText: 'Вже є акаунт?',
      switchLinkText: 'Увійти',
      genericError: 'Щось пішло не так. Спробуйте ще раз.',
    },
    validation: {
      emailRequired: 'Введіть email',
      emailInvalid: 'Некоректний email',
      passwordRequired: 'Введіть пароль',
      passwordMin: 'Пароль має містити щонайменше 8 символів',
      passwordLetter: 'Пароль має містити літеру',
      passwordDigit: 'Пароль має містити цифру',
      nameMin: "Ім'я має містити щонайменше 2 символи",
      nameMax: "Ім'я задовге",
      confirmPasswordRequired: 'Підтвердіть пароль',
      passwordMismatch: 'Паролі не збігаються',
    },
  },
  birthForm: {
    tag: 'Крок 01',
    heading: 'Дані народження',
    nameLabel: "Ім'я",
    namePlaceholder: 'Марія',
    dateLabel: 'Дата народження',
    timeLabel: 'Час народження',
    placeLabel: 'Місто народження',
    placePlaceholder: 'Львів, Україна',
    placeSearching: 'Шукаємо…',
    placeNoResults: 'Нічого не знайшли',
    submitCta: 'Розрахувати →',
    submitLoadingCta: 'Рахуємо…',
    note: 'Місто автоматично конвертується в координати та часовий пояс — вони потрібні для точного розрахунку будинків.',
    authRequired:
      'Увійдіть, щоб побудувати й зберегти карту — введені дані залишаться.',
    genericError: 'Не вдалося побудувати карту. Спробуйте ще раз.',
    validation: {
      nameMin: "Ім'я має містити щонайменше 2 символи",
      nameMax: "Ім'я задовге",
      dateFormat: 'Дата у форматі РРРР-ММ-ДД',
      dateInvalid: 'Некоректна дата',
      dateFuture: 'Дата народження не може бути в майбутньому',
      timeFormat: 'Час у форматі ГГ:ХХ',
      placeRequired: 'Оберіть місто зі списку',
    },
  },
  result: {
    tag: 'Крок 02',
    heading: 'Результат',
    chartTitle: 'Натальна карта',
    ascendantPrefix: 'Асцендент —',
    wheelLabel: 'Натальна карта з позиціями планет',
    retrograde: 'Ретроградний',
    squareTitle: 'Матриця Долі',
    squareSubtitle: 'Квадрат Піфагора за датою народження',
    emptyCell: '—',
    squareLabels: {
      '1': 'характер',
      '2': 'енергія',
      '3': 'інтерес',
      '4': "здоров'я",
      '5': 'удача',
      '6': "обов'язок",
      '7': 'талант',
      '8': "пам'ять",
      '9': 'дух',
    },
  },
  exportCard: {
    caption: 'Карта долі',
    downloadPdf: 'Завантажити PDF',
    shareImage: 'Поділитись зображенням',
    preparing: 'Готуємо…',
    linkCopied: 'Посилання скопійовано',
    genericError: 'Не вдалося створити файл. Спробуйте ще раз.',
  },
};

const pl: Dictionary = {
  nav: {
    login: 'Zaloguj się',
    signUp: 'Zarejestruj się',
    howItWorks: 'Jak to działa',
    menu: 'Menu',
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
  auth: {
    login: {
      title: 'Zaloguj się',
      emailLabel: 'Email',
      passwordLabel: 'Hasło',
      submitCta: 'Zaloguj się →',
      submitLoadingCta: 'Logowanie…',
      switchText: 'Nie masz konta?',
      switchLinkText: 'Zarejestruj się',
      genericError: 'Nieprawidłowy email lub hasło',
    },
    register: {
      title: 'Rejestracja',
      nameLabel: 'Imię',
      emailLabel: 'Email',
      passwordLabel: 'Hasło',
      confirmPasswordLabel: 'Potwierdź hasło',
      submitCta: 'Utwórz konto →',
      submitLoadingCta: 'Tworzymy konto…',
      switchText: 'Masz już konto?',
      switchLinkText: 'Zaloguj się',
      genericError: 'Coś poszło nie tak. Spróbuj ponownie.',
    },
    validation: {
      emailRequired: 'Podaj email',
      emailInvalid: 'Nieprawidłowy email',
      passwordRequired: 'Podaj hasło',
      passwordMin: 'Hasło musi mieć co najmniej 8 znaków',
      passwordLetter: 'Hasło musi zawierać literę',
      passwordDigit: 'Hasło musi zawierać cyfrę',
      nameMin: 'Imię musi mieć co najmniej 2 znaki',
      nameMax: 'Imię jest za długie',
      confirmPasswordRequired: 'Potwierdź hasło',
      passwordMismatch: 'Hasła nie są identyczne',
    },
  },
  birthForm: {
    tag: 'Krok 01',
    heading: 'Dane urodzenia',
    nameLabel: 'Imię',
    namePlaceholder: 'Maria',
    dateLabel: 'Data urodzenia',
    timeLabel: 'Godzina urodzenia',
    placeLabel: 'Miasto urodzenia',
    placePlaceholder: 'Lwów, Ukraina',
    placeSearching: 'Szukamy…',
    placeNoResults: 'Nic nie znaleziono',
    submitCta: 'Oblicz →',
    submitLoadingCta: 'Obliczamy…',
    note: 'Miasto jest automatycznie zamieniane na współrzędne i strefę czasową — są potrzebne do dokładnego wyznaczenia domów.',
    authRequired:
      'Zaloguj się, aby zbudować i zapisać mapę — wpisane dane zostaną.',
    genericError: 'Nie udało się zbudować mapy. Spróbuj ponownie.',
    validation: {
      nameMin: 'Imię musi mieć co najmniej 2 znaki',
      nameMax: 'Imię jest za długie',
      dateFormat: 'Data w formacie RRRR-MM-DD',
      dateInvalid: 'Nieprawidłowa data',
      dateFuture: 'Data urodzenia nie może być w przyszłości',
      timeFormat: 'Godzina w formacie GG:MM',
      placeRequired: 'Wybierz miasto z listy',
    },
  },
  result: {
    tag: 'Krok 02',
    heading: 'Wynik',
    chartTitle: 'Mapa natalna',
    ascendantPrefix: 'Ascendent —',
    wheelLabel: 'Mapa natalna z pozycjami planet',
    retrograde: 'Retrogradacja',
    squareTitle: 'Matryca Przeznaczenia',
    squareSubtitle: 'Kwadrat Pitagorasa z daty urodzenia',
    emptyCell: '—',
    squareLabels: {
      '1': 'charakter',
      '2': 'energia',
      '3': 'zainteresowanie',
      '4': 'zdrowie',
      '5': 'szczęście',
      '6': 'obowiązek',
      '7': 'talent',
      '8': 'pamięć',
      '9': 'duch',
    },
  },
  exportCard: {
    caption: 'Mapa przeznaczenia',
    downloadPdf: 'Pobierz PDF',
    shareImage: 'Udostępnij obraz',
    preparing: 'Przygotowujemy…',
    linkCopied: 'Link skopiowany',
    genericError: 'Nie udało się utworzyć pliku. Spróbuj ponownie.',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, uk, pl };
