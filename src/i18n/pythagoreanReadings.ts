import type { PythagoreanDigit } from '@/types/astrology.types';

import type { Locale } from './locales';

/**
 * У квадраті Піфагора сенс має не сама цифра, а скільки разів вона
 * трапилась. Три рівні — «немає», «є», «виражено сильно» — досить, щоб
 * тлумачення відрізнялись по суті й не розпадались на дрібні градації.
 */
export type CellLevel = 'absent' | 'present' | 'strong';

export const getCellLevel = (count: number): CellLevel => {
  if (count === 0) return 'absent';
  if (count <= 2) return 'present';
  return 'strong';
};

/**
 * Класичні лінії квадрата: сума повторень трьох цифр. Набір цифр не
 * залежить від того, як сітка намальована, тож рахуємо саме за ним.
 */
export const PYTHAGOREAN_LINES = {
  purpose: ['1', '4', '7'],
  family: ['2', '5', '8'],
  stability: ['3', '6', '9'],
  selfEsteem: ['1', '2', '3'],
  earning: ['4', '5', '6'],
  talent: ['7', '8', '9'],
  spirituality: ['1', '5', '9'],
  temperament: ['3', '5', '7'],
} as const satisfies Record<string, readonly PythagoreanDigit[]>;

export type PythagoreanLine = keyof typeof PYTHAGOREAN_LINES;

export type LineLevel = 'low' | 'balanced' | 'high';

/** Норма для лінії — 3–4 повторення; менше чи більше — помітний перекіс */
export const getLineLevel = (total: number): LineLevel => {
  if (total <= 2) return 'low';
  if (total <= 4) return 'balanced';
  return 'high';
};

type PythagoreanReadings = {
  cells: Record<PythagoreanDigit, Record<CellLevel, string>>;
  lines: Record<PythagoreanLine, { name: string; meaning: string }>;
  lineLevels: Record<LineLevel, string>;
};

export const PYTHAGOREAN_READINGS: Record<Locale, PythagoreanReadings> = {
  en: {
    cells: {
      '1': {
        absent: 'The will is quiet: decisions come easier with support, and self-assertion is worth training on purpose.',
        present: 'A steady will — enough to hold your ground without pressing on others.',
        strong: 'A strong will and character: you lead and insist — the task is not to steamroll people.',
      },
      '2': {
        absent: 'Energy is limited and needs topping up: rest and routine matter more for you than for most.',
        present: 'Enough energy for everyday life; it recovers well with rest.',
        strong: 'Plenty of energy to share — people often feel recharged next to you.',
      },
      '3': {
        absent: 'Abstract and technical subjects are not the main drive — practice appeals more than theory.',
        present: 'Curiosity about how things work, enough to learn whatever you need.',
        strong: 'A strong pull towards precise knowledge and analysis — science, technology, research.',
      },
      '4': {
        absent: 'Health asks for attention: prevention and a careful pace pay off.',
        present: 'An average reserve of health that holds up well with reasonable care.',
        strong: 'A strong constitution and resilience — the risk is taking it for granted.',
      },
      '5': {
        absent: 'You rely on logic rather than hunches: plans and checklists serve you well.',
        present: 'Intuition works alongside logic, especially in familiar situations.',
        strong: 'Sharp intuition — you often know the answer before you can explain it.',
      },
      '6': {
        absent: 'Routine manual work is not your drive — you look for work that engages the mind or feelings.',
        present: 'Hands-on work is fine for you when it has a clear purpose.',
        strong: 'A love of making and mastery — you learn best by doing, and work grounds you.',
      },
      '7': {
        absent: 'Luck is not the strategy: results come through effort, which makes them solid.',
        present: 'Some talent and luck — they show when you persist.',
        strong: 'A marked talent and a sense of being guided — worth finding where it shows best.',
      },
      '8': {
        absent: 'Duty is chosen rather than felt: commitments work best when they are truly your own.',
        present: 'A sense of responsibility towards the people close to you.',
        strong: 'A strong sense of duty — you carry others; watch that you do not carry too much.',
      },
      '9': {
        absent: 'Memory likes support: notes and systems free your head for thinking.',
        present: 'Good memory and clear thinking in the areas you care about.',
        strong: 'A strong memory and a broad mind — you hold a lot and connect it.',
      },
    },
    lines: {
      purpose: { name: 'Purpose', meaning: 'The drive to set goals and reach them.' },
      family: { name: 'Family', meaning: 'The weight you give to family and close bonds.' },
      stability: { name: 'Stability', meaning: 'Attachment to habits, routine and a settled life.' },
      selfEsteem: { name: 'Self-esteem', meaning: 'How firmly you value yourself.' },
      earning: { name: 'Earning', meaning: 'The ability to earn and provide.' },
      talent: { name: 'Talent', meaning: 'Natural gifts and the potential to develop them.' },
      spirituality: { name: 'Spirituality', meaning: 'An inclination towards inner search and meaning.' },
      temperament: { name: 'Temperament', meaning: 'Emotional intensity and sensuality.' },
    },
    lineLevels: {
      low: 'Weak',
      balanced: 'Balanced',
      high: 'Strong',
    },
  },

  uk: {
    cells: {
      '1': {
        absent: 'Воля тиха: рішення легше даються з підтримкою, а вміння стояти на своєму варто тренувати свідомо.',
        present: 'Рівна воля — достатньо, щоб відстояти своє, не тиснучи на інших.',
        strong: 'Сильна воля й характер: ти ведеш і наполягаєш — завдання не продавлювати людей.',
      },
      '2': {
        absent: 'Енергії небагато, її треба поповнювати: відпочинок і режим для тебе важливіші, ніж для більшості.',
        present: 'Енергії досить на щоденне життя; з відпочинком вона добре відновлюється.',
        strong: 'Енергії вдосталь, щоб ділитися, — поруч із тобою люди часто відчувають приплив сил.',
      },
      '3': {
        absent: 'Абстрактне й технічне — не головний інтерес: практика приваблює більше за теорію.',
        present: 'Цікавість до того, як усе влаштовано, — досить, щоб вивчити потрібне.',
        strong: 'Сильний потяг до точного знання й аналізу — наука, техніка, дослідження.',
      },
      '4': {
        absent: "Здоров'я просить уваги: профілактика й помірний темп себе виправдовують.",
        present: "Середній запас здоров'я, який добре тримається за розумного догляду.",
        strong: 'Міцна статура й витривалість — ризик лише в тому, щоб сприймати це як належне.',
      },
      '5': {
        absent: 'Ти покладаєшся радше на логіку, ніж на передчуття: плани й списки тобі добре служать.',
        present: 'Інтуїція працює поруч із логікою, особливо в знайомих ситуаціях.',
        strong: 'Гостра інтуїція — ти часто знаєш відповідь раніше, ніж можеш її пояснити.',
      },
      '6': {
        absent: 'Рутинна ручна праця — не твоє: шукаєш роботу, що залучає розум чи почуття.',
        present: 'Робота руками тобі до снаги, коли в ній є зрозуміла мета.',
        strong: 'Любов до створення й майстерності — найкраще вчишся в дії, а праця тебе заземлює.',
      },
      '7': {
        absent: 'Удача — не стратегія: результат приходить через зусилля, і тому він міцний.',
        present: 'Є талант і трохи удачі — вони проявляються, коли не відступаєш.',
        strong: 'Виразний талант і відчуття, що тебе ведуть, — варто знайти, де він розкривається найкраще.',
      },
      '8': {
        absent: "Обов'язок обирається, а не відчувається: зобов'язання працюють, коли вони справді твої.",
        present: 'Почуття відповідальності за близьких людей.',
        strong: "Сильне почуття обов'язку — ти несеш інших; стеж, щоб не взяти забагато.",
      },
      '9': {
        absent: "Пам'ять любить опору: нотатки й системи звільняють голову для думок.",
        present: "Добра пам'ять і ясне мислення в тому, що тобі цікаво.",
        strong: "Сильна пам'ять і широкий розум — ти багато тримаєш у голові й пов'язуєш між собою.",
      },
    },
    lines: {
      purpose: { name: 'Ціль', meaning: 'Прагнення ставити цілі й досягати їх.' },
      family: { name: "Сім'я", meaning: "Вага, яку ти надаєш родині й близьким зв'язкам." },
      stability: { name: 'Стабільність', meaning: "Прив'язаність до звичок, режиму й усталеного життя." },
      selfEsteem: { name: 'Самооцінка', meaning: 'Наскільки твердо ти цінуєш себе.' },
      earning: { name: 'Заробіток', meaning: 'Здатність заробляти й забезпечувати.' },
      talent: { name: 'Талант', meaning: 'Природні здібності й потенціал їх розвинути.' },
      spirituality: { name: 'Духовність', meaning: 'Схильність до внутрішнього пошуку й сенсу.' },
      temperament: { name: 'Темперамент', meaning: 'Емоційна інтенсивність і чуттєвість.' },
    },
    lineLevels: {
      low: 'Слабка',
      balanced: 'Рівновага',
      high: 'Сильна',
    },
  },

  pl: {
    cells: {
      '1': {
        absent: 'Wola jest cicha: decyzje przychodzą łatwiej ze wsparciem, a stawianie na swoim warto ćwiczyć świadomie.',
        present: 'Równa wola — wystarczy, by obronić swoje bez naciskania na innych.',
        strong: 'Silna wola i charakter: prowadzisz i nalegasz — zadaniem jest nie przytłaczać ludzi.',
      },
      '2': {
        absent: 'Energii jest niewiele i trzeba ją uzupełniać: odpoczynek i rytm są dla ciebie ważniejsze niż dla większości.',
        present: 'Energii wystarcza na codzienne życie; dobrze regeneruje się po odpoczynku.',
        strong: 'Energii jest pod dostatkiem, by się nią dzielić — przy tobie ludzie często czują przypływ sił.',
      },
      '3': {
        absent: 'Abstrakcja i technika to nie główny napęd — praktyka pociąga bardziej niż teoria.',
        present: 'Ciekawość tego, jak działa świat — wystarcza, by nauczyć się potrzebnego.',
        strong: 'Silny pociąg do ścisłej wiedzy i analizy — nauka, technika, badania.',
      },
      '4': {
        absent: 'Zdrowie wymaga uwagi: profilaktyka i spokojne tempo się opłacają.',
        present: 'Przeciętny zapas zdrowia, który dobrze się trzyma przy rozsądnej trosce.',
        strong: 'Mocna budowa i odporność — ryzyko polega tylko na traktowaniu tego jako oczywistości.',
      },
      '5': {
        absent: 'Polegasz raczej na logice niż na przeczuciach: plany i listy dobrze ci służą.',
        present: 'Intuicja działa obok logiki, zwłaszcza w znajomych sytuacjach.',
        strong: 'Ostra intuicja — często znasz odpowiedź, zanim potrafisz ją wyjaśnić.',
      },
      '6': {
        absent: 'Rutynowa praca fizyczna to nie twój napęd — szukasz pracy angażującej umysł lub uczucia.',
        present: 'Praca rękami ci odpowiada, gdy ma jasny cel.',
        strong: 'Miłość do tworzenia i mistrzostwa — najlepiej uczysz się w działaniu, a praca cię uziemia.',
      },
      '7': {
        absent: 'Szczęście to nie strategia: wyniki przychodzą przez wysiłek, dlatego są trwałe.',
        present: 'Jest talent i trochę szczęścia — ujawniają się, gdy się nie poddajesz.',
        strong: 'Wyraźny talent i poczucie bycia prowadzonym — warto znaleźć, gdzie najlepiej się ujawnia.',
      },
      '8': {
        absent: 'Obowiązek jest wyborem, a nie odczuciem: zobowiązania działają, gdy są naprawdę twoje.',
        present: 'Poczucie odpowiedzialności za bliskich.',
        strong: 'Silne poczucie obowiązku — nosisz innych; uważaj, by nie wziąć za dużo.',
      },
      '9': {
        absent: 'Pamięć lubi wsparcie: notatki i systemy uwalniają głowę do myślenia.',
        present: 'Dobra pamięć i jasne myślenie w tym, co cię interesuje.',
        strong: 'Silna pamięć i szeroki umysł — dużo pamiętasz i łączysz to ze sobą.',
      },
    },
    lines: {
      purpose: { name: 'Cel', meaning: 'Dążenie do stawiania celów i ich osiągania.' },
      family: { name: 'Rodzina', meaning: 'Waga, jaką przykładasz do rodziny i bliskich więzi.' },
      stability: { name: 'Stabilność', meaning: 'Przywiązanie do nawyków, rytmu i ustabilizowanego życia.' },
      selfEsteem: { name: 'Samoocena', meaning: 'Jak mocno cenisz siebie.' },
      earning: { name: 'Zarobki', meaning: 'Zdolność zarabiania i zapewniania bytu.' },
      talent: { name: 'Talent', meaning: 'Naturalne zdolności i potencjał ich rozwoju.' },
      spirituality: { name: 'Duchowość', meaning: 'Skłonność do wewnętrznych poszukiwań i sensu.' },
      temperament: { name: 'Temperament', meaning: 'Intensywność emocjonalna i zmysłowość.' },
    },
    lineLevels: {
      low: 'Słaba',
      balanced: 'Równowaga',
      high: 'Silna',
    },
  },
};
