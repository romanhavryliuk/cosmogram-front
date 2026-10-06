import type { PythagoreanDigit } from '@/types/astrology.types';

import type { Locale } from './locales';

export type Dictionary = {
  nav: {
    login: string;
    signUp: string;
    howItWorks: string;
    menu: string;
    logout: string;
    skipToContent: string;
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
    /** Час необов'язковий: без нього карта рахується без домів і асцендента */
    timeOptionalHint: string;
    placeSearchError: string;
    placeRateLimited: string;
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
    sunSignPrefix: string;
    elementsTitle: string;
    elementsDominant: string;
    summaryTitle: string;
    summarySunLabel: string;
    summaryElementLabel: string;
    summaryCenterLabel: string;
    summaryElementTie: string;
    wheelLabel: string;
    retrograde: string;
    midheavenPrefix: string;
    timeUnknownNote: string;
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
    /** Підказка в панелі тлумачення, поки аркан не обрано */
    arcanaHint: string;
    /** Підпис позиції обраного аркана в матриці */
    arcanaSourceCenter: string;
    arcanaSourcePersonal: string;
    arcanaSourceKarmic: string;
    /** Тлумачення натальної карти: планета («що»), знак («як»), дім («де») */
    readingHint: string;
    readingWhat: string;
    readingHow: string;
    readingWhere: string;
    readingRetrograde: string;
    readingOrbNote: string;
    squareTitle: string;
    squareSubtitle: string;
    /** Заглушка в клітинці квадрата, якщо цифри немає в даті */
    emptyCell: string;
    squareHint: string;
    squareLinesTitle: string;
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
    /** Межа помилок: неперехоплений збій рендеру */
    crashTitle: string;
    crashText: string;
    /** Підпис до error.digest — єдиного ідентифікатора збою, видимого в проді */
    crashCodePrefix: string;
  };
  notFound: {
    title: string;
    text: string;
    cta: string;
  };
  /** Результат гостя: порахований бекендом, але ще не збережений */
  guest: {
    heading: string;
    saveTitle: string;
    saveText: string;
    emptyTitle: string;
    emptyText: string;
    emptyCta: string;
    saving: string;
    saveError: string;
    previewError: string;
  };
  share: {
    shareCta: string;
    copyLink: string;
    linkCopied: string;
    stopSharing: string;
    stopped: string;
    error: string;
    activeHint: string;
    publicHeading: string;
    publicCta: string;
    unavailableTitle: string;
    unavailableText: string;
  };
  editProfile: {
    editCta: string;
    heading: string;
    saveCta: string;
    savingCta: string;
    cancelCta: string;
    success: string;
    error: string;
  };
};

const en: Dictionary = {
  nav: {
    login: 'Sign In',
    signUp: 'Sign Up',
    howItWorks: 'How It Works',
    menu: 'Menu',
    logout: 'Log Out',
    skipToContent: 'Skip to content',
  },
  hero: {
    eyebrow: 'Astrology + Numerology',
    titleBefore: 'The sky at the moment of your ',
    titleEmphasis: 'birth',
    titleAfter: ', broken down into numbers.',
    lead: 'Enter your birth date, place and — if you know it — time. Get a natal chart, a Destiny Matrix and a Pythagorean Square in one card, each explained in plain words.',
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
        text: 'Only the date and city are required. The exact time adds houses and the ascendant — the parts that depend on the minute of birth.',
      },
      {
        num: '02',
        title: 'Three Systems',
        text: 'Astrology shows where the planets stood; the Destiny Matrix turns the date into 22 archetypes; the Pythagorean Square counts how often each digit repeats.',
      },
      {
        num: '03',
        title: 'A Reading to Keep',
        text: 'Tap any planet, arcanum or cell to read what it means. Sign up to save charts to your dashboard and share them by link.',
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
    timeLabel: 'Time of Birth (optional)',
    timeOptionalHint:
      "Don't know the exact time? Leave it empty — the chart will be built without houses and the ascendant.",
    placeSearchError: 'City search is unavailable right now. Please try again later.',
    placeRateLimited: 'Too many searches. Please wait a few minutes.',
    placeLabel: 'City of Birth',
    placePlaceholder: 'Lviv, Ukraine',
    placeSearching: 'Searching…',
    placeNoResults: 'Nothing found',
    submitCta: 'Calculate →',
    submitLoadingCta: 'Calculating…',
    note: 'The city is automatically converted into coordinates and a time zone — both are needed to place the houses precisely.',
    authRequired:
      'No account needed to see your chart — sign in only if you want to keep it.',
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
    sunSignPrefix: 'Zodiac sign (Sun) —',
    elementsTitle: 'Balance of elements',
    elementsDominant: 'Dominant',
    summaryTitle: 'The chart at a glance',
    summarySunLabel: 'Zodiac sign · Sun',
    summaryElementLabel: 'Dominant element',
    summaryCenterLabel: 'Destiny Matrix centre',
    summaryElementTie:
      'Several elements are equally strong — no single temperament leads. See the balance of elements under the natal chart.',
    wheelLabel: 'Natal chart with planet positions',
    retrograde: 'Retrograde',
    midheavenPrefix: 'Midheaven —',
    timeUnknownNote:
      'Birth time unknown — houses, ascendant and midheaven are not calculated; the Moon may be off by a few degrees.',
    aspectsTitle: 'Aspects',
    chartDescription:
      'Your zodiac sign is the sign the Sun was in. The ascendant is a different point — the sign rising on the horizon at the minute of birth — so it often differs from your zodiac sign. The chart itself is a snapshot of the sky at the moment you were born. The outer ring carries the twelve zodiac signs, the thin spokes mark the house cusps, and the lines crossing the centre are aspects — the angles between planets. Teal lines are harmonious, red ones are tense.',
    matrixDescription:
      'Your birth date folded down into the 22 Major Arcana. The number in the centre is the core energy of the chart; the eight points around it alternate between personal and karmic arcana.',
    squareDescription:
      'How often each digit from 1 to 9 appears in your birth date. The more repetitions in a cell, the more pronounced that quality is considered to be — a dash means the digit is absent.',
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
    arcanaHint: 'Tap any number on the diagram to read what that arcanum means.',
    arcanaSourceCenter: 'Centre',
    arcanaSourcePersonal: 'Personal',
    arcanaSourceKarmic: 'Karmic',
    readingHint: 'Tap a planet or an aspect to read what it means in your chart.',
    readingWhat: 'What',
    readingHow: 'How',
    readingWhere: 'Where',
    readingRetrograde:
      'Retrograde: this energy turns inward and works through rethinking and returning to the past.',
    readingOrbNote:
      'Orb is the deviation from the exact angle — the smaller it is, the more strongly the aspect is felt.',
    squareTitle: 'Pythagorean Square',
    squareSubtitle: 'Digit frequency from your birth date',
    emptyCell: '—',
    squareHint: 'Tap a cell to read what that number of repetitions means.',
    squareLinesTitle: 'Lines of the square',
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
    crashTitle: 'Something went wrong',
    crashText:
      'This section failed to render. Trying again usually helps — your saved charts are not affected.',
    crashCodePrefix: 'Error code:',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist, or the link has expired.',
    cta: 'Go Home',
  },
  guest: {
    heading: 'Your Chart',
    saveTitle: 'Keep this chart',
    saveText:
      'Create a free account and this chart will be saved to your dashboard automatically — nothing to fill in again.',
    emptyTitle: 'No chart yet',
    emptyText: 'Build a chart first — it takes under a minute.',
    emptyCta: 'Build a Chart',
    saving: 'Saving your chart…',
    saveError: "We couldn't save the chart. Please build it again.",
    previewError: "We couldn't calculate the chart. Please try again.",
  },
  share: {
    shareCta: 'Share',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied',
    stopSharing: 'Stop Sharing',
    stopped: 'The link no longer works',
    error: "Couldn't change sharing. Please try again.",
    activeHint: 'Anyone with this link can view the chart — without your coordinates or account.',
    publicHeading: 'Shared Chart',
    publicCta: 'Build Your Own Chart',
    unavailableTitle: 'This link is not available',
    unavailableText: 'The owner may have turned sharing off, or the link is mistyped.',
  },
  editProfile: {
    editCta: 'Edit',
    heading: 'Edit Chart',
    saveCta: 'Save Changes →',
    savingCta: 'Saving…',
    cancelCta: 'Cancel',
    success: 'Chart updated',
    error: "Couldn't save the changes. Please try again.",
  },
};

const uk: Dictionary = {
  nav: {
    login: 'Вхід',
    signUp: 'Реєстрація',
    howItWorks: 'Як це працює',
    menu: 'Меню',
    logout: 'Вийти',
    skipToContent: 'Перейти до вмісту',
  },
  hero: {
    eyebrow: 'Астрологія + нумерологія',
    titleBefore: 'Небо в момент свого ',
    titleEmphasis: 'народження',
    titleAfter: ', розкладене на цифри.',
    lead: 'Вкажи дату й місце народження, а якщо знаєш — і час. Отримаєш натальну карту, Матрицю Долі та Квадрат Піфагора в одній картці, кожну з поясненням простими словами.',
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
        text: 'Обов’язкові лише дата й місто. Точний час додає доми й асцендент — те, що залежить від хвилини народження.',
      },
      {
        num: '02',
        title: 'Три системи',
        text: 'Астрологія показує, де стояли планети; Матриця Долі перетворює дату на 22 архетипи; Квадрат Піфагора рахує, скільки разів повторюється кожна цифра.',
      },
      {
        num: '03',
        title: 'Тлумачення, яке лишається',
        text: 'Натисни на планету, аркан чи клітинку — і прочитаєш, що вони означають. Зареєструйся, щоб зберігати карти в кабінеті й ділитися ними за посиланням.',
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
    timeLabel: "Час народження (необов'язково)",
    timeOptionalHint:
      'Не знаєш точного часу? Залиш порожнім — карту буде побудовано без домів і асцендента.',
    placeSearchError: 'Пошук міста зараз недоступний. Спробуй трохи пізніше.',
    placeRateLimited: 'Забагато запитів. Зачекай кілька хвилин.',
    placeLabel: 'Місто народження',
    placePlaceholder: 'Львів, Україна',
    placeSearching: 'Шукаємо…',
    placeNoResults: 'Нічого не знайшли',
    submitCta: 'Розрахувати →',
    submitLoadingCta: 'Рахуємо…',
    note: 'Місто автоматично конвертується в координати та часовий пояс — вони потрібні для точного розрахунку будинків.',
    authRequired:
      'Щоб побачити карту, акаунт не потрібен — увійди, лише якщо хочеш її зберегти.',
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
    sunSignPrefix: 'Знак зодіаку (Сонце) —',
    elementsTitle: 'Баланс стихій',
    elementsDominant: 'Переважає',
    summaryTitle: 'Коротко про карту',
    summarySunLabel: 'Знак зодіаку · Сонце',
    summaryElementLabel: 'Провідна стихія',
    summaryCenterLabel: 'Центр матриці долі',
    summaryElementTie:
      'Кілька стихій однаково сильні — жоден темперамент не домінує. Деталі — у балансі стихій під натальною картою.',
    wheelLabel: 'Натальна карта з позиціями планет',
    retrograde: 'Ретроградний',
    midheavenPrefix: 'Середина неба —',
    timeUnknownNote:
      'Час народження невідомий — доми, асцендент і середину неба не розраховано; Місяць може зсунутись на кілька градусів.',
    aspectsTitle: 'Аспекти',
    chartDescription:
      'Твій знак зодіаку — це знак, у якому стояло Сонце. Асцендент — інший показник: знак, що сходив на горизонті в хвилину народження, тому він часто не збігається зі знаком зодіаку. Сама карта — знімок неба в момент твого народження. Зовнішнє коло — дванадцять знаків зодіаку, тонкі промені позначають межі домів, а лінії через центр — це аспекти, кути між планетами. Бірюзові лінії гармонійні, червоні — напружені.',
    matrixDescription:
      'Дата народження, згорнута до 22 Старших Арканів. Число в центрі — ключова енергія карти; вісім точок навколо нього чергують особисті та кармічні аркани.',
    squareDescription:
      'Скільки разів кожна цифра від 1 до 9 трапляється в даті народження. Що більше повторень у клітинці, то виразнішою вважається ця якість — риска означає, що цифри немає.',
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
    arcanaHint: 'Натисни на будь-яке число на схемі, щоб прочитати значення аркана.',
    arcanaSourceCenter: 'Центр',
    arcanaSourcePersonal: 'Особистий',
    arcanaSourceKarmic: 'Кармічний',
    readingHint: 'Натисни на планету чи аспект, щоб прочитати, що вони означають у твоїй карті.',
    readingWhat: 'Що',
    readingHow: 'Як',
    readingWhere: 'Де',
    readingRetrograde:
      'Ретроградність: ця енергія спрямована всередину й проявляється через переосмислення та повернення до минулого.',
    readingOrbNote:
      'Орб — відхилення від точного кута: що він менший, то сильніше відчувається аспект.',
    squareTitle: 'Квадрат Піфагора',
    squareSubtitle: 'Повторення цифр у даті народження',
    emptyCell: '—',
    squareHint: 'Натисни на клітинку, щоб прочитати, що означає така кількість повторень.',
    squareLinesTitle: 'Лінії квадрата',
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
    crashTitle: 'Щось пішло не так',
    crashText:
      'Цей розділ не вдалося відобразити. Зазвичай допомагає повторна спроба — збережені карти не постраждали.',
    crashCodePrefix: 'Код помилки:',
  },
  notFound: {
    title: 'Сторінку не знайдено',
    text: 'Такої сторінки не існує, або посилання застаріло.',
    cta: 'На головну',
  },
  guest: {
    heading: 'Твоя карта',
    saveTitle: 'Збережи цю карту',
    saveText:
      'Створи безкоштовний акаунт — і карта сама збережеться в кабінеті, нічого не доведеться заповнювати знову.',
    emptyTitle: 'Карти ще немає',
    emptyText: 'Спершу побудуй карту — це менше хвилини.',
    emptyCta: 'Побудувати карту',
    saving: 'Зберігаємо твою карту…',
    saveError: 'Не вдалося зберегти карту. Побудуй її ще раз.',
    previewError: 'Не вдалося розрахувати карту. Спробуй ще раз.',
  },
  share: {
    shareCta: 'Поділитися',
    copyLink: 'Скопіювати посилання',
    linkCopied: 'Посилання скопійовано',
    stopSharing: 'Закрити доступ',
    stopped: 'Посилання більше не працює',
    error: 'Не вдалося змінити доступ. Спробуй ще раз.',
    activeHint: 'Будь-хто з цим посиланням побачить карту — без твоїх координат і акаунта.',
    publicHeading: 'Карта за посиланням',
    publicCta: 'Побудувати свою карту',
    unavailableTitle: 'Посилання недоступне',
    unavailableText: 'Можливо, власник закрив доступ або в посиланні помилка.',
  },
  editProfile: {
    editCta: 'Редагувати',
    heading: 'Редагування карти',
    saveCta: 'Зберегти зміни →',
    savingCta: 'Зберігаємо…',
    cancelCta: 'Скасувати',
    success: 'Карту оновлено',
    error: 'Не вдалося зберегти зміни. Спробуй ще раз.',
  },
};

const pl: Dictionary = {
  nav: {
    login: 'Zaloguj się',
    signUp: 'Zarejestruj się',
    howItWorks: 'Jak to działa',
    menu: 'Menu',
    logout: 'Wyloguj się',
    skipToContent: 'Przejdź do treści',
  },
  hero: {
    eyebrow: 'Astrologia + numerologia',
    titleBefore: 'Niebo w chwili twoich ',
    titleEmphasis: 'narodzin',
    titleAfter: ', rozłożone na liczby.',
    lead: 'Podaj datę i miejsce urodzenia, a jeśli znasz — także godzinę. Otrzymasz mapę natalną, Matrycę Przeznaczenia i Kwadrat Pitagorasa w jednej karcie, każde z objaśnieniem prostymi słowami.',
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
        text: 'Wymagane są tylko data i miasto. Dokładna godzina dodaje domy i ascendent — to, co zależy od minuty urodzenia.',
      },
      {
        num: '02',
        title: 'Trzy systemy',
        text: 'Astrologia pokazuje, gdzie stały planety; Matryca Przeznaczenia zamienia datę w 22 archetypy; Kwadrat Pitagorasa liczy, ile razy powtarza się każda cyfra.',
      },
      {
        num: '03',
        title: 'Interpretacja na później',
        text: 'Dotknij planety, arkanu lub komórki, aby przeczytać, co oznacza. Załóż konto, aby zapisywać mapy w panelu i udostępniać je linkiem.',
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
    timeLabel: 'Godzina urodzenia (opcjonalnie)',
    timeOptionalHint:
      'Nie znasz dokładnej godziny? Zostaw puste — mapa powstanie bez domów i ascendentu.',
    placeSearchError: 'Wyszukiwanie miasta jest teraz niedostępne. Spróbuj później.',
    placeRateLimited: 'Zbyt wiele wyszukiwań. Poczekaj kilka minut.',
    placeLabel: 'Miasto urodzenia',
    placePlaceholder: 'Lwów, Ukraina',
    placeSearching: 'Szukamy…',
    placeNoResults: 'Nic nie znaleziono',
    submitCta: 'Oblicz →',
    submitLoadingCta: 'Obliczamy…',
    note: 'Miasto jest automatycznie zamieniane na współrzędne i strefę czasową — są potrzebne do dokładnego wyznaczenia domów.',
    authRequired:
      'Aby zobaczyć mapę, konto nie jest potrzebne — zaloguj się tylko, jeśli chcesz ją zachować.',
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
    sunSignPrefix: 'Znak zodiaku (Słońce) —',
    elementsTitle: 'Równowaga żywiołów',
    elementsDominant: 'Przeważa',
    summaryTitle: 'Mapa w skrócie',
    summarySunLabel: 'Znak zodiaku · Słońce',
    summaryElementLabel: 'Dominujący żywioł',
    summaryCenterLabel: 'Centrum Matrycy Przeznaczenia',
    summaryElementTie:
      'Kilka żywiołów jest równie silnych — żaden temperament nie dominuje. Szczegóły w równowadze żywiołów pod mapą natalną.',
    wheelLabel: 'Mapa natalna z pozycjami planet',
    retrograde: 'Retrogradacja',
    midheavenPrefix: 'Medium Coeli —',
    timeUnknownNote:
      'Godzina urodzenia nieznana — domów, ascendentu i Medium Coeli nie obliczono; Księżyc może się przesunąć o kilka stopni.',
    aspectsTitle: 'Aspekty',
    chartDescription:
      'Twój znak zodiaku to znak, w którym stało Słońce. Ascendent to inny punkt — znak wschodzący na horyzoncie w minucie narodzin — dlatego często różni się od znaku zodiaku. Sama mapa to zdjęcie nieba z chwili twoich narodzin. Zewnętrzny pierścień to dwanaście znaków zodiaku, cienkie promienie wyznaczają granice domów, a linie przecinające środek to aspekty — kąty między planetami. Turkusowe linie są harmonijne, czerwone napięte.',
    matrixDescription:
      'Data urodzenia zwinięta do 22 Wielkich Arkanów. Liczba w środku to kluczowa energia mapy; osiem punktów wokół niej na przemian oznacza arkana osobiste i karmiczne.',
    squareDescription:
      'Jak często każda cyfra od 1 do 9 pojawia się w dacie urodzenia. Im więcej powtórzeń w komórce, tym wyraźniejsza jest dana cecha — myślnik oznacza brak cyfry.',
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
    arcanaHint: 'Dotknij dowolnej liczby na diagramie, aby poznać znaczenie arkanu.',
    arcanaSourceCenter: 'Centrum',
    arcanaSourcePersonal: 'Osobisty',
    arcanaSourceKarmic: 'Karmiczny',
    readingHint: 'Dotknij planety lub aspektu, aby przeczytać, co oznaczają w twojej mapie.',
    readingWhat: 'Co',
    readingHow: 'Jak',
    readingWhere: 'Gdzie',
    readingRetrograde:
      'Retrogradacja: ta energia kieruje się do wewnątrz i działa przez przemyślenie i powrót do przeszłości.',
    readingOrbNote:
      'Orb to odchylenie od dokładnego kąta — im mniejszy, tym silniej odczuwa się aspekt.',
    squareTitle: 'Kwadrat Pitagorasa',
    squareSubtitle: 'Częstotliwość cyfr w dacie urodzenia',
    emptyCell: '—',
    squareHint: 'Dotknij komórki, aby przeczytać, co oznacza taka liczba powtórzeń.',
    squareLinesTitle: 'Linie kwadratu',
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
    crashTitle: 'Coś poszło nie tak',
    crashText:
      'Nie udało się wyświetlić tej sekcji. Zwykle pomaga ponowna próba — zapisane mapy są bezpieczne.',
    crashCodePrefix: 'Kod błędu:',
  },
  notFound: {
    title: 'Nie znaleziono strony',
    text: 'Taka strona nie istnieje lub link wygasł.',
    cta: 'Strona główna',
  },
  guest: {
    heading: 'Twoja mapa',
    saveTitle: 'Zachowaj tę mapę',
    saveText:
      'Załóż darmowe konto, a mapa sama zapisze się w panelu — nic nie trzeba wpisywać ponownie.',
    emptyTitle: 'Brak mapy',
    emptyText: 'Najpierw zbuduj mapę — to zajmie mniej niż minutę.',
    emptyCta: 'Zbuduj mapę',
    saving: 'Zapisujemy twoją mapę…',
    saveError: 'Nie udało się zapisać mapy. Zbuduj ją ponownie.',
    previewError: 'Nie udało się obliczyć mapy. Spróbuj ponownie.',
  },
  share: {
    shareCta: 'Udostępnij',
    copyLink: 'Kopiuj link',
    linkCopied: 'Link skopiowany',
    stopSharing: 'Wyłącz udostępnianie',
    stopped: 'Link już nie działa',
    error: 'Nie udało się zmienić udostępniania. Spróbuj ponownie.',
    activeHint: 'Każdy z tym linkiem zobaczy mapę — bez twoich współrzędnych i konta.',
    publicHeading: 'Udostępniona mapa',
    publicCta: 'Zbuduj swoją mapę',
    unavailableTitle: 'Link jest niedostępny',
    unavailableText: 'Właściciel mógł wyłączyć udostępnianie lub link jest błędny.',
  },
  editProfile: {
    editCta: 'Edytuj',
    heading: 'Edycja mapy',
    saveCta: 'Zapisz zmiany →',
    savingCta: 'Zapisujemy…',
    cancelCta: 'Anuluj',
    success: 'Mapa zaktualizowana',
    error: 'Nie udało się zapisać zmian. Spróbuj ponownie.',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, uk, pl };
