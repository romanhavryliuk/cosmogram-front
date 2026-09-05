import type { PythagoreanDigit } from '@/types/astrology.types';

import type { Locale } from './locales';

export type Dictionary = {
  nav: {
    login: string;
    signUp: string;
    howItWorks: string;
    menu: string;
    logout: string;
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
    passwordToggle: {
      show: string;
      hide: string;
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
    midheavenPrefix: string;
    aspectsTitle: string;
    /** Розгорнуті пояснення до кожного блоку результату */
    chartDescription: string;
    matrixDescription: string;
    squareDescription: string;
    carousel: {
      label: string;
      previous: string;
      next: string;
    };
    matrixTitle: string;
    matrixSubtitle: string;
    matrixWheelLabel: string;
    matrixMoneyLabel: string;
    matrixLoveLabel: string;
    matrixFamilyPowerLabel: string;
    matrixPurposeLabel: string;
    matrixPurposePersonalLabel: string;
    matrixPurposeSocialLabel: string;
    matrixPurposeSpiritualLabel: string;
    matrixAncestralLabel: string;
    matrixPaternalLabel: string;
    matrixMaternalLabel: string;
    matrixMethodNote: string;
    matrixPersonalLegend: string;
    matrixKarmicLegend: string;
    squareTitle: string;
    squareSubtitle: string;
    /** Заглушка в клітинці квадрата, якщо цифри немає в даті */
    emptyCell: string;
    squareLabels: Record<PythagoreanDigit, { short: string; full: string }>;
  };
  exportCard: {
    caption: string;
  };
  dashboard: {
    tag: string;
    heading: string;
    emptyTitle: string;
    emptyText: string;
    emptyCta: string;
  };
  profileActions: {
    deleteCta: string;
    createNewCta: string;
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
    deleteConfirmAction: string;
    deleteCancelAction: string;
    deleteSuccess: string;
    deleteError: string;
  };
  /** Стан «завантажити не вдалося» — список кабінету і сторінка однієї карти */
  errorState: {
    listTitle: string;
    listText: string;
    profileTitle: string;
    profileText: string;
    retryCta: string;
    backToListCta: string;
  };
  notFound: {
    title: string;
    text: string;
    cta: string;
  };
};

const en: Dictionary = {
  nav: {
    login: 'Sign In',
    signUp: 'Sign Up',
    howItWorks: 'How It Works',
    menu: 'Menu',
    logout: 'Log Out',
  },
  hero: {
    eyebrow: 'Astrology + Numerology',
    titleBefore: 'The sky at the moment of your ',
    titleEmphasis: 'birth',
    titleAfter: ', broken down into numbers.',
    lead: 'Enter your birth date, time, and place — get your natal chart and Destiny Matrix in one card, saved to your dashboard.',
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
        text: 'Get a visual card with your natal chart, Destiny Matrix and Pythagorean Square — saved to your dashboard.',
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
    passwordToggle: {
      show: 'Show password',
      hide: 'Hide password',
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
    midheavenPrefix: 'Midheaven —',
    aspectsTitle: 'Aspects',
    chartDescription:
      'A snapshot of the sky at the moment you were born. The outer ring carries the twelve zodiac signs, the thin spokes mark the house cusps, and the lines crossing the centre are aspects — the angles between planets. Teal lines are harmonious, red ones are tense.',
    matrixDescription:
      'Your birth date folded down into the 22 Major Arcana. The number in the centre is the core energy of the chart; the eight points around it alternate between personal and karmic arcana.',
    squareDescription:
      'How often each digit from 1 to 9 appears in your birth date. The more repetitions in a cell, the more pronounced that quality is considered to be — a dash means the digit is absent. Hover a cell for its full meaning.',
    carousel: {
      label: 'Result sections',
      previous: 'Previous section',
      next: 'Next section',
    },
    matrixTitle: 'Destiny Matrix',
    matrixSubtitle: 'Your core energies, from your birth date',
    matrixWheelLabel: 'Destiny matrix diagram',
    matrixMoneyLabel: 'Money',
    matrixLoveLabel: 'Love',
    matrixFamilyPowerLabel: 'Family Power',
    matrixPurposeLabel: 'Purpose',
    matrixPurposePersonalLabel: 'Personal',
    matrixPurposeSocialLabel: 'Social',
    matrixPurposeSpiritualLabel: 'Spiritual',
    matrixAncestralLabel: 'Ancestral Programs',
    matrixPaternalLabel: 'Paternal Line',
    matrixMaternalLabel: 'Maternal Line',
    matrixMethodNote:
      'Calculated from your birth date, using the 22 Major Arcana. A tool for self-reflection, not a scientific prediction.',
    matrixPersonalLegend: 'Personal arcana',
    matrixKarmicLegend: 'Karmic arcana',
    squareTitle: 'Pythagorean Square',
    squareSubtitle: 'Digit frequency from your birth date',
    emptyCell: '—',
    squareLabels: {
      '1': { short: 'character', full: 'Character, will' },
      '2': { short: 'energy', full: 'Energy, bioenergetics' },
      '3': { short: 'interest', full: 'Interest, cognition, science' },
      '4': { short: 'health', full: 'Health, beauty' },
      '5': { short: 'logic', full: 'Logic, intuition' },
      '6': { short: 'work', full: 'Work, mastery' },
      '7': { short: 'luck', full: 'Luck, talent' },
      '8': { short: 'duty', full: 'Duty, debt' },
      '9': { short: 'memory', full: 'Memory, mind' },
    },
  },
  exportCard: {
    caption: 'Destiny Chart',
  },
  dashboard: {
    tag: 'Dashboard',
    heading: 'Saved Charts',
    emptyTitle: 'Nothing here yet',
    emptyText:
      'Build your first chart — it will be saved to your dashboard and available from any device.',
    emptyCta: 'Build a Chart',
  },
  profileActions: {
    deleteCta: 'Delete',
    createNewCta: 'Build New Chart',
    deleteConfirmTitle: 'Delete this chart?',
    deleteConfirmDescription: 'This action can’t be undone.',
    deleteConfirmAction: 'Delete',
    deleteCancelAction: 'Cancel',
    deleteSuccess: 'Chart deleted',
    deleteError: "Couldn't delete the chart. Please try again.",
  },
  errorState: {
    listTitle: "Couldn't load your charts",
    listText:
      'The server did not respond. Check your connection and try again — nothing has been lost.',
    profileTitle: "Couldn't open this chart",
    profileText:
      'It may have been deleted, or the server is unavailable right now.',
    retryCta: 'Try Again',
    backToListCta: 'Back to Saved Charts',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist, or the link has expired.',
    cta: 'Go Home',
  },
};

const uk: Dictionary = {
  nav: {
    login: 'Вхід',
    signUp: 'Реєстрація',
    howItWorks: 'Як це працює',
    menu: 'Меню',
    logout: 'Вийти',
  },
  hero: {
    eyebrow: 'Астрологія + нумерологія',
    titleBefore: 'Небо в момент свого ',
    titleEmphasis: 'народження',
    titleAfter: ', розкладене на цифри.',
    lead: 'Вкажи дату, час і місце народження — отримаєш натальну карту та Матрицю Долі в одній картці, яка збережеться в кабінеті.',
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
        text: 'Отримуєш візуальну картку з натальною картою, Матрицею Долі та Квадратом Піфагора — вона лишається в кабінеті.',
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
    passwordToggle: {
      show: 'Показати пароль',
      hide: 'Приховати пароль',
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
    midheavenPrefix: 'Середина неба —',
    aspectsTitle: 'Аспекти',
    chartDescription:
      'Знімок неба в момент твого народження. Зовнішнє коло — дванадцять знаків зодіаку, тонкі промені позначають межі будинків, а лінії через центр — це аспекти, кути між планетами. Бірюзові лінії гармонійні, червоні — напружені.',
    matrixDescription:
      'Дата народження, згорнута до 22 Старших Арканів. Число в центрі — ключова енергія карти; вісім точок навколо нього чергують особисті та кармічні аркани.',
    squareDescription:
      'Скільки разів кожна цифра від 1 до 9 трапляється в даті народження. Що більше повторень у клітинці, то виразнішою вважається ця якість — риска означає, що цифри немає. Наведи на клітинку, щоб побачити повне значення.',
    carousel: {
      label: 'Розділи результату',
      previous: 'Попередній розділ',
      next: 'Наступний розділ',
    },
    matrixTitle: 'Матриця Долі',
    matrixSubtitle: 'Основні енергії за датою народження',
    matrixWheelLabel: 'Діаграма матриці долі',
    matrixMoneyLabel: 'Гроші',
    matrixLoveLabel: 'Любов',
    matrixFamilyPowerLabel: 'Сила роду',
    matrixPurposeLabel: 'Призначення',
    matrixPurposePersonalLabel: 'Особисте',
    matrixPurposeSocialLabel: 'Соціальне',
    matrixPurposeSpiritualLabel: 'Духовне',
    matrixAncestralLabel: 'Родові програми',
    matrixPaternalLabel: 'Батьківська лінія',
    matrixMaternalLabel: 'Материнська лінія',
    matrixMethodNote:
      'Розрахунок за датою народження, 22 Старших Аркани. Інструмент самопізнання, а не наукове передбачення.',
    matrixPersonalLegend: 'Особисті аркани',
    matrixKarmicLegend: 'Кармічні аркани',
    squareTitle: 'Квадрат Піфагора',
    squareSubtitle: 'Повторення цифр у даті народження',
    emptyCell: '—',
    squareLabels: {
      '1': { short: 'характер', full: "Характер, воля" },
      '2': { short: 'енергія', full: 'Енергія, біоенергетика' },
      '3': { short: 'інтерес', full: 'Інтерес, пізнання, наука' },
      '4': { short: "здоров'я", full: "Здоров'я, краса" },
      '5': { short: 'логіка', full: 'Логіка, інтуїція' },
      '6': { short: 'праця', full: 'Праця, майстерність' },
      '7': { short: 'удача', full: 'Удача, талант' },
      '8': { short: "обов'язок", full: "Обов'язок, борг" },
      '9': { short: "пам'ять", full: "Пам'ять, розум" },
    },
  },
  exportCard: {
    caption: 'Карта долі',
  },
  dashboard: {
    tag: 'Кабінет',
    heading: 'Збережені карти',
    emptyTitle: 'Тут поки порожньо',
    emptyText:
      'Побудуйте першу карту — вона збережеться в кабінеті й буде доступна з будь-якого пристрою.',
    emptyCta: 'Побудувати карту',
  },
  profileActions: {
    deleteCta: 'Видалити',
    createNewCta: 'Побудувати нову карту',
    deleteConfirmTitle: 'Видалити цю карту?',
    deleteConfirmDescription: 'Цю дію не можна скасувати.',
    deleteConfirmAction: 'Видалити',
    deleteCancelAction: 'Скасувати',
    deleteSuccess: 'Карту видалено',
    deleteError: 'Не вдалося видалити карту. Спробуйте ще раз.',
  },
  errorState: {
    listTitle: 'Не вдалося завантажити карти',
    listText:
      'Сервер не відповів. Перевірте зʼєднання і спробуйте ще раз — нічого не втрачено.',
    profileTitle: 'Не вдалося відкрити карту',
    profileText: 'Можливо, її видалено, або сервер зараз недоступний.',
    retryCta: 'Спробувати ще раз',
    backToListCta: 'До збережених карт',
  },
  notFound: {
    title: 'Сторінку не знайдено',
    text: 'Такої сторінки не існує, або посилання застаріло.',
    cta: 'На головну',
  },
};

const pl: Dictionary = {
  nav: {
    login: 'Zaloguj się',
    signUp: 'Zarejestruj się',
    howItWorks: 'Jak to działa',
    menu: 'Menu',
    logout: 'Wyloguj się',
  },
  hero: {
    eyebrow: 'Astrologia + numerologia',
    titleBefore: 'Niebo w chwili twoich ',
    titleEmphasis: 'narodzin',
    titleAfter: ', rozłożone na liczby.',
    lead: 'Podaj datę, godzinę i miejsce urodzenia — otrzymasz mapę natalną i Matrycę Przeznaczenia w jednej karcie, zapisanej w panelu.',
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
        text: 'Otrzymujesz wizualną kartę z mapą natalną, Matrycą Przeznaczenia i Kwadratem Pitagorasa — zostaje w panelu.',
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
    passwordToggle: {
      show: 'Pokaż hasło',
      hide: 'Ukryj hasło',
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
    midheavenPrefix: 'Medium Coeli —',
    aspectsTitle: 'Aspekty',
    chartDescription:
      'Zdjęcie nieba z chwili twoich narodzin. Zewnętrzny pierścień to dwanaście znaków zodiaku, cienkie promienie wyznaczają granice domów, a linie przecinające środek to aspekty — kąty między planetami. Turkusowe linie są harmonijne, czerwone napięte.',
    matrixDescription:
      'Data urodzenia zwinięta do 22 Wielkich Arkanów. Liczba w środku to kluczowa energia mapy; osiem punktów wokół niej na przemian oznacza arkana osobiste i karmiczne.',
    squareDescription:
      'Jak często każda cyfra od 1 do 9 pojawia się w dacie urodzenia. Im więcej powtórzeń w komórce, tym wyraźniejsza jest dana cecha — myślnik oznacza brak cyfry. Najedź na komórkę, aby zobaczyć pełne znaczenie.',
    carousel: {
      label: 'Sekcje wyniku',
      previous: 'Poprzednia sekcja',
      next: 'Następna sekcja',
    },
    matrixTitle: 'Matryca Przeznaczenia',
    matrixSubtitle: 'Twoje główne energie na podstawie daty urodzenia',
    matrixWheelLabel: 'Diagram matrycy przeznaczenia',
    matrixMoneyLabel: 'Pieniądze',
    matrixLoveLabel: 'Miłość',
    matrixFamilyPowerLabel: 'Siła rodu',
    matrixPurposeLabel: 'Przeznaczenie',
    matrixPurposePersonalLabel: 'Osobiste',
    matrixPurposeSocialLabel: 'Społeczne',
    matrixPurposeSpiritualLabel: 'Duchowe',
    matrixAncestralLabel: 'Programy rodowe',
    matrixPaternalLabel: 'Linia ojcowska',
    matrixMaternalLabel: 'Linia macierzysta',
    matrixMethodNote:
      'Obliczenia na podstawie daty urodzenia, 22 Wielkie Arkana. Narzędzie do samopoznania, a nie naukowa prognoza.',
    matrixPersonalLegend: 'Arkana osobiste',
    matrixKarmicLegend: 'Arkana karmiczne',
    squareTitle: 'Kwadrat Pitagorasa',
    squareSubtitle: 'Częstotliwość cyfr w dacie urodzenia',
    emptyCell: '—',
    squareLabels: {
      '1': { short: 'charakter', full: 'Charakter, wola' },
      '2': { short: 'energia', full: 'Energia, bioenergetyka' },
      '3': { short: 'zainteresowanie', full: 'Zainteresowanie, poznanie, nauka' },
      '4': { short: 'zdrowie', full: 'Zdrowie, piękno' },
      '5': { short: 'logika', full: 'Logika, intuicja' },
      '6': { short: 'praca', full: 'Praca, mistrzostwo' },
      '7': { short: 'szczęście', full: 'Szczęście, talent' },
      '8': { short: 'obowiązek', full: 'Obowiązek, dług' },
      '9': { short: 'pamięć', full: 'Pamięć, umysł' },
    },
  },
  exportCard: {
    caption: 'Mapa przeznaczenia',
  },
  dashboard: {
    tag: 'Panel',
    heading: 'Zapisane mapy',
    emptyTitle: 'Na razie pusto',
    emptyText:
      'Zbuduj pierwszą mapę — zapisze się w panelu i będzie dostępna z każdego urządzenia.',
    emptyCta: 'Zbuduj mapę',
  },
  profileActions: {
    deleteCta: 'Usuń',
    createNewCta: 'Zbuduj nową mapę',
    deleteConfirmTitle: 'Usunąć tę mapę?',
    deleteConfirmDescription: 'Tej czynności nie można cofnąć.',
    deleteConfirmAction: 'Usuń',
    deleteCancelAction: 'Anuluj',
    deleteSuccess: 'Mapa usunięta',
    deleteError: 'Nie udało się usunąć mapy. Spróbuj ponownie.',
  },
  errorState: {
    listTitle: 'Nie udało się wczytać map',
    listText:
      'Serwer nie odpowiedział. Sprawdź połączenie i spróbuj ponownie — nic nie zostało utracone.',
    profileTitle: 'Nie udało się otworzyć mapy',
    profileText: 'Mogła zostać usunięta lub serwer jest chwilowo niedostępny.',
    retryCta: 'Spróbuj ponownie',
    backToListCta: 'Wróć do zapisanych map',
  },
  notFound: {
    title: 'Nie znaleziono strony',
    text: 'Taka strona nie istnieje lub link wygasł.',
    cta: 'Strona główna',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, uk, pl };
