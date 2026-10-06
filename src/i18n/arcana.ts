import type { ArcanaNumber } from '@/types/astrology.types';

import type { Locale } from './locales';

export type ArcanaEntry = {
  /** Назва аркана — те, що бачить користувач замість голого числа */
  name: string;
  /** Коротке тлумачення: опис енергії, а не передбачення подій */
  meaning: string;
};

/**
 * Назви й тлумачення 22 Старших Арканів. Тримаємо окремо від dictionaries.ts:
 * там UI-копірайт, а тут предметний контент — так само, як назви планет
 * і знаків живуть в astroLabels.ts.
 *
 * Формулювання свідомо описові («про що ця енергія»), без обіцянок подій:
 * підпис під матрицею прямо каже, що це інструмент самопізнання.
 */
export const ARCANA_LABELS: Record<
  Locale,
  Record<ArcanaNumber, ArcanaEntry>
> = {
  en: {
    1: {
      name: 'The Magician',
      meaning:
        'Initiative and will. The ability to start, to turn an intention into a first step — and the temptation to rely on cleverness alone.',
    },
    2: {
      name: 'The High Priestess',
      meaning:
        'Inner knowing and quiet. Listening before acting, trusting what you sense but cannot yet prove.',
    },
    3: {
      name: 'The Empress',
      meaning:
        'Creation and abundance. Bringing things to life and caring for them — in work, in a home, in people.',
    },
    4: {
      name: 'The Emperor',
      meaning:
        'Structure and boundaries. Authority over your own life: rules you set and actually keep.',
    },
    5: {
      name: 'The Hierophant',
      meaning:
        'Tradition and learning. Looking for meaning in what was passed down — and deciding what of it is truly yours.',
    },
    6: {
      name: 'The Lovers',
      meaning:
        'Choice and relationship. Not only who you are with, but which values you choose when they conflict.',
    },
    7: {
      name: 'The Chariot',
      meaning:
        'Movement and drive. Holding direction under pressure, steering forces that pull in different ways.',
    },
    8: {
      name: 'Justice',
      meaning:
        'Balance and consequence. Honesty with yourself about what your choices actually cost.',
    },
    9: {
      name: 'The Hermit',
      meaning:
        'Solitude and depth. Stepping back from noise to understand what you actually think.',
    },
    10: {
      name: 'Wheel of Fortune',
      meaning:
        'Cycles and change. What returns in your life in circles, and how you meet it the next time around.',
    },
    11: {
      name: 'Strength',
      meaning:
        'Endurance and gentle power. Holding your ground without force, taming what is wild in you rather than cutting it out.',
    },
    12: {
      name: 'The Hanged Man',
      meaning:
        'Pause and reversal. A stop that is not a failure: seeing the same thing from another angle.',
    },
    13: {
      name: 'Death',
      meaning:
        'Ending and transformation. Letting go of what is finished so something else has room.',
    },
    14: {
      name: 'Temperance',
      meaning:
        'Measure and patience. Mixing opposites in the right proportion instead of swinging between them.',
    },
    15: {
      name: 'The Devil',
      meaning:
        'Attachment and shadow. What holds you — habits, dependencies, the parts you would rather not look at.',
    },
    16: {
      name: 'The Tower',
      meaning:
        'Breakage and sudden truth. What collapses was often already hollow; freedom arrives through the crack.',
    },
    17: {
      name: 'The Star',
      meaning:
        'Hope and orientation. A quiet reference point that keeps direction when nothing is certain.',
    },
    18: {
      name: 'The Moon',
      meaning:
        'Illusion and the unconscious. Fears and imaginings that look like facts until you examine them.',
    },
    19: {
      name: 'The Sun',
      meaning:
        'Clarity and openness. Being seen as you are, and the simple joy that comes with it.',
    },
    20: {
      name: 'Judgement',
      meaning:
        'Reckoning and awakening. Summing up a stage honestly and hearing the call to the next one.',
    },
    21: {
      name: 'The World',
      meaning:
        'Wholeness and completion. A cycle closed, scale widened — the view from a finished piece of work.',
    },
    22: {
      name: 'The Fool',
      meaning:
        'Freedom and beginning. Readiness to step forward without guarantees, carrying little.',
    },
  },

  uk: {
    1: {
      name: 'Маг',
      meaning:
        'Ініціатива й воля. Здатність почати, перетворити намір на перший крок — і спокуса покластися лише на спритність.',
    },
    2: {
      name: 'Жриця',
      meaning:
        'Внутрішнє знання й тиша. Слухати, перш ніж діяти; довіряти тому, що відчуваєш, але ще не можеш довести.',
    },
    3: {
      name: 'Імператриця',
      meaning:
        'Творення й достаток. Давати життя справам і дбати про них — у роботі, у домі, у людях.',
    },
    4: {
      name: 'Імператор',
      meaning:
        'Структура й межі. Влада над власним життям: правила, які сам ставиш і справді дотримуєш.',
    },
    5: {
      name: 'Ієрофант',
      meaning:
        'Традиція й навчання. Шукати сенс у переданому — і вирішувати, що з нього справді твоє.',
    },
    6: {
      name: 'Закохані',
      meaning:
        'Вибір і стосунки. Не лише з ким ти поруч, а які цінності обираєш, коли вони суперечать одна одній.',
    },
    7: {
      name: 'Колісниця',
      meaning:
        'Рух і напір. Тримати напрямок під тиском, керувати силами, що тягнуть у різні боки.',
    },
    8: {
      name: 'Справедливість',
      meaning:
        'Рівновага й наслідки. Чесність із собою щодо того, у що насправді обходяться твої рішення.',
    },
    9: {
      name: 'Відлюдник',
      meaning:
        'Самота й глибина. Відійти від шуму, щоб зрозуміти, що ти думаєш насправді.',
    },
    10: {
      name: 'Колесо Фортуни',
      meaning:
        'Цикли й зміни. Те, що повертається в житті по колу, і як ти зустрічаєш це наступного разу.',
    },
    11: {
      name: 'Сила',
      meaning:
        "М'яка сила й витримка. Стояти на своєму без тиску, приборкувати в собі дике, а не вирізати його.",
    },
    12: {
      name: 'Повішений',
      meaning:
        'Пауза й переворот. Зупинка, яка не є поразкою: побачити те саме під іншим кутом.',
    },
    13: {
      name: 'Смерть',
      meaning:
        'Завершення й перетворення. Відпустити те, що скінчилось, щоб звільнити місце для іншого.',
    },
    14: {
      name: 'Помірність',
      meaning:
        'Міра й терпіння. Змішувати протилежності у правильній пропорції замість кидатися між ними.',
    },
    15: {
      name: 'Диявол',
      meaning:
        "Прив'язаність і тінь. Те, що тримає: звички, залежності, частини себе, на які не хочеться дивитись.",
    },
    16: {
      name: 'Вежа',
      meaning:
        'Злам і раптова правда. Те, що руйнується, часто вже було порожнім усередині; свобода приходить через тріщину.',
    },
    17: {
      name: 'Зірка',
      meaning:
        'Надія й орієнтир. Тиха точка опори, що тримає напрямок, коли нічого не певно.',
    },
    18: {
      name: 'Місяць',
      meaning:
        'Ілюзії й підсвідоме. Страхи та домисли, що виглядають як факти, доки їх не роздивишся.',
    },
    19: {
      name: 'Сонце',
      meaning:
        'Ясність і відкритість. Бути побаченим таким, який ти є, і проста радість, що з цим приходить.',
    },
    20: {
      name: 'Суд',
      meaning:
        'Підсумок і пробудження. Чесно підбити етап і почути поклик до наступного.',
    },
    21: {
      name: 'Світ',
      meaning:
        'Цілісність і завершення. Замкнений цикл, ширший масштаб — погляд із завершеної справи.',
    },
    22: {
      name: 'Шут',
      meaning:
        'Свобода й початок. Готовність зробити крок без гарантій, маючи при собі небагато.',
    },
  },

  pl: {
    1: {
      name: 'Mag',
      meaning:
        'Inicjatywa i wola. Zdolność rozpoczynania, zamiany zamiaru w pierwszy krok — i pokusa polegania wyłącznie na sprycie.',
    },
    2: {
      name: 'Kapłanka',
      meaning:
        'Wewnętrzna wiedza i cisza. Słuchać, zanim się zadziała; ufać temu, co się czuje, choć jeszcze nie da się udowodnić.',
    },
    3: {
      name: 'Cesarzowa',
      meaning:
        'Tworzenie i obfitość. Powoływać rzeczy do życia i troszczyć się o nie — w pracy, w domu, w ludziach.',
    },
    4: {
      name: 'Cesarz',
      meaning:
        'Struktura i granice. Władza nad własnym życiem: zasady, które sam stawiasz i naprawdę utrzymujesz.',
    },
    5: {
      name: 'Hierofant',
      meaning:
        'Tradycja i nauka. Szukanie sensu w tym, co przekazane — i decyzja, co z tego jest naprawdę twoje.',
    },
    6: {
      name: 'Kochankowie',
      meaning:
        'Wybór i relacja. Nie tylko z kim jesteś, ale które wartości wybierasz, gdy stoją w sprzeczności.',
    },
    7: {
      name: 'Rydwan',
      meaning:
        'Ruch i napęd. Utrzymać kierunek pod presją, kierować siłami, które ciągną w różne strony.',
    },
    8: {
      name: 'Sprawiedliwość',
      meaning:
        'Równowaga i konsekwencje. Uczciwość wobec siebie co do tego, ile naprawdę kosztują twoje wybory.',
    },
    9: {
      name: 'Pustelnik',
      meaning:
        'Samotność i głębia. Odejść od hałasu, by zrozumieć, co naprawdę myślisz.',
    },
    10: {
      name: 'Koło Fortuny',
      meaning:
        'Cykle i zmiana. To, co wraca w życiu po okręgu, i jak spotykasz to następnym razem.',
    },
    11: {
      name: 'Siła',
      meaning:
        'Łagodna moc i wytrwałość. Obstawać przy swoim bez przemocy, oswajać w sobie dzikie, a nie wycinać je.',
    },
    12: {
      name: 'Wisielec',
      meaning:
        'Pauza i odwrócenie. Zatrzymanie, które nie jest porażką: zobaczyć to samo pod innym kątem.',
    },
    13: {
      name: 'Śmierć',
      meaning:
        'Zakończenie i przemiana. Puścić to, co się skończyło, by zrobić miejsce czemuś innemu.',
    },
    14: {
      name: 'Umiarkowanie',
      meaning:
        'Miara i cierpliwość. Mieszać przeciwieństwa we właściwej proporcji zamiast miotać się między nimi.',
    },
    15: {
      name: 'Diabeł',
      meaning:
        'Przywiązanie i cień. To, co trzyma: nawyki, zależności, części siebie, na które wolisz nie patrzeć.',
    },
    16: {
      name: 'Wieża',
      meaning:
        'Pęknięcie i nagła prawda. To, co się wali, często było już puste w środku; wolność przychodzi przez szczelinę.',
    },
    17: {
      name: 'Gwiazda',
      meaning:
        'Nadzieja i punkt odniesienia. Cichy drogowskaz, który trzyma kierunek, gdy nic nie jest pewne.',
    },
    18: {
      name: 'Księżyc',
      meaning:
        'Złudzenia i nieświadomość. Lęki i domysły, które wyglądają jak fakty, dopóki się im nie przyjrzysz.',
    },
    19: {
      name: 'Słońce',
      meaning:
        'Jasność i otwartość. Być widzianym takim, jakim się jest, i prosta radość, która z tym przychodzi.',
    },
    20: {
      name: 'Sąd',
      meaning:
        'Podsumowanie i przebudzenie. Uczciwie zamknąć etap i usłyszeć wezwanie do następnego.',
    },
    21: {
      name: 'Świat',
      meaning:
        'Pełnia i dopełnienie. Zamknięty cykl, szersza skala — widok z ukończonej pracy.',
    },
    22: {
      name: 'Głupiec',
      meaning:
        'Wolność i początek. Gotowość zrobienia kroku bez gwarancji, z niewielkim bagażem.',
    },
  },
};

export type MatrixPositionKey =
  | 'center'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'money'
  | 'love'
  | 'familyPower'
  | 'purposePersonal'
  | 'purposeSocial'
  | 'purposeSpiritual'
  | 'paternal-first'
  | 'paternal-second'
  | 'paternal-total'
  | 'maternal-first'
  | 'maternal-second'
  | 'maternal-total';

/**
 * Що означає сама позиція в матриці — незалежно від того, який аркан на
 * ній випав. Без цього «Особистий» чи «Кармічний» нічого не пояснюють:
 * незрозуміло, чому аркан тут і за яку сферу він відповідає.
 * Звідки береться кожне число — так само, як рахує бекенд
 * (numerology-service): A — день, B — місяць, C — рік, D — їхня сума,
 * кармічні точки — суми сусідніх особистих.
 */
export const MATRIX_POSITION_NOTES: Record<
  Locale,
  Record<MatrixPositionKey, string>
> = {
  en: {
    center:
      'The sum of all four personal arcana — the core of the chart: the energy you feel most at home in.',
    a: 'From your birth day — how you come across: your first impression and visible character.',
    b: 'From your birth month — spiritual potential, intuition and the talents you can lean on.',
    c: 'From your birth year — the material side: money, work and how you build your life in the world.',
    d: 'The sum of day, month and year — the main lesson of the chart, a quality that grows through effort.',
    e: 'Day + month, the upper point of the paternal line — the spiritual programme passed down through your father’s side.',
    f: 'Month + year, the upper point of the maternal line — the spiritual programme from your mother’s side.',
    g: 'Year + lesson, the lower point of the paternal line — the material programme of your father’s side: money, work, ways of living.',
    h: 'Lesson + day, the lower point of the maternal line — the material programme of your mother’s side.',
    money: 'Centre + year (C), the entry to the money channel — the kind of work and attitude through which income comes most naturally.',
    love: 'Centre + lesson (D), the entry to the relationship channel — how you love and what you look for in a close bond.',
    familyPower:
      'The sum of the four karmic arcana — the support your family line gives you, the strength you can draw on from your roots.',
    purposePersonal:
      'Sky (B + D) + Earth (A + C) — finding yourself and your own path. Tradition links it to roughly ages 20–40.',
    purposeSocial:
      'Paternal line + maternal line — your role among people: work, family, community. Tradition links it to roughly ages 40–60.',
    purposeSpiritual:
      'Personal + social purpose — what ties the two together and gives life meaning in its later years.',
    'paternal-first':
      'The upper point of the paternal line (E, day + month) — the spiritual programme from your father’s side.',
    'paternal-second':
      'The lower point of the paternal line (G, year + lesson) — the material programme from your father’s side.',
    'paternal-total':
      'E + G — the overall programme of the paternal line: what it asks you to continue or rework.',
    'maternal-first':
      'The upper point of the maternal line (F, month + year) — the spiritual programme from your mother’s side.',
    'maternal-second':
      'The lower point of the maternal line (H, lesson + day) — the material programme from your mother’s side.',
    'maternal-total':
      'F + H — the overall programme of the maternal line: what it asks you to continue or rework.',
  },
  uk: {
    center:
      'Сума всіх чотирьох особистих арканів — серце матриці: енергія, у якій тобі найкомфортніше.',
    a: 'З дня народження — як тебе бачать інші: перше враження й помітні риси характеру.',
    b: 'З місяця народження — духовний потенціал, інтуїція й таланти, на які можна спертися.',
    c: 'З року народження — матеріальний бік: гроші, робота й те, як ти будуєш життя у світі.',
    d: 'Сума дня, місяця й року — головний урок матриці, якість, що розвивається через зусилля.',
    e: 'День + місяць, верхня точка батьківської лінії — духовна програма, що прийшла з боку батька.',
    f: 'Місяць + рік, верхня точка материнської лінії — духовна програма з боку матері.',
    g: 'Рік + урок, нижня точка батьківської лінії — матеріальна програма роду батька: гроші, робота, уклад життя.',
    h: 'Урок + день, нижня точка материнської лінії — матеріальна програма роду матері.',
    money: 'Центр + рік (C), вхід у грошовий канал — справа й підхід, через які дохід приходить найприродніше.',
    love: 'Центр + урок (D), вхід у канал стосунків — як ти любиш і чого шукаєш у близьких стосунках.',
    familyPower:
      'Сума чотирьох кармічних арканів — підтримка твого роду, сила, яку можна черпати з коріння.',
    purposePersonal:
      'Небо (B + D) + Земля (A + C) — пошук себе й власного шляху. Традиція пов’язує його приблизно з віком 20–40 років.',
    purposeSocial:
      'Батьківська лінія + материнська — твоя роль серед людей: робота, сім’я, спільнота. Традиція пов’язує його приблизно з віком 40–60 років.',
    purposeSpiritual:
      'Особисте + соціальне призначення — те, що поєднує обидва й надає життю сенсу в зрілі роки.',
    'paternal-first':
      'Верхня точка батьківської лінії (E, день + місяць) — духовна програма з боку батька.',
    'paternal-second':
      'Нижня точка батьківської лінії (G, рік + урок) — матеріальна програма з боку батька.',
    'paternal-total':
      'E + G — загальна програма батьківської лінії: що вона пропонує продовжити чи переосмислити.',
    'maternal-first':
      'Верхня точка материнської лінії (F, місяць + рік) — духовна програма з боку матері.',
    'maternal-second':
      'Нижня точка материнської лінії (H, урок + день) — матеріальна програма з боку матері.',
    'maternal-total':
      'F + H — загальна програма материнської лінії: що вона пропонує продовжити чи переосмислити.',
  },
  pl: {
    center:
      'Suma wszystkich czterech arkanów osobistych — serce matrycy: energia, w której czujesz się najswobodniej.',
    a: 'Z dnia urodzenia — jak cię odbierają: pierwsze wrażenie i widoczne cechy charakteru.',
    b: 'Z miesiąca urodzenia — potencjał duchowy, intuicja i talenty, na których możesz się oprzeć.',
    c: 'Z roku urodzenia — strona materialna: pieniądze, praca i to, jak budujesz życie w świecie.',
    d: 'Suma dnia, miesiąca i roku — główna lekcja matrycy, cecha, która rozwija się przez wysiłek.',
    e: 'Dzień + miesiąc, górny punkt linii ojca — duchowy program przekazany ze strony ojca.',
    f: 'Miesiąc + rok, górny punkt linii matki — duchowy program ze strony matki.',
    g: 'Rok + lekcja, dolny punkt linii ojca — materialny program rodu ojca: pieniądze, praca, sposób życia.',
    h: 'Lekcja + dzień, dolny punkt linii matki — materialny program rodu matki.',
    money: 'Centrum + rok (C), wejście do kanału pieniędzy — zajęcie i podejście, przez które dochód przychodzi najnaturalniej.',
    love: 'Centrum + lekcja (D), wejście do kanału relacji — jak kochasz i czego szukasz w bliskiej relacji.',
    familyPower:
      'Suma czterech arkanów karmicznych — wsparcie twojego rodu, siła, którą możesz czerpać z korzeni.',
    purposePersonal:
      'Niebo (B + D) + Ziemia (A + C) — odnalezienie siebie i własnej drogi. Tradycja wiąże je mniej więcej z wiekiem 20–40 lat.',
    purposeSocial:
      'Linia ojca + linia matki — twoja rola wśród ludzi: praca, rodzina, społeczność. Tradycja wiąże je mniej więcej z wiekiem 40–60 lat.',
    purposeSpiritual:
      'Przeznaczenie osobiste + społeczne — to, co łączy oba i nadaje życiu sens w dojrzałych latach.',
    'paternal-first':
      'Górny punkt linii ojca (E, dzień + miesiąc) — duchowy program ze strony ojca.',
    'paternal-second':
      'Dolny punkt linii ojca (G, rok + lekcja) — materialny program ze strony ojca.',
    'paternal-total':
      'E + G — ogólny program linii ojca: co proponuje kontynuować lub przemyśleć.',
    'maternal-first':
      'Górny punkt linii matki (F, miesiąc + rok) — duchowy program ze strony matki.',
    'maternal-second':
      'Dolny punkt linii matki (H, lekcja + dzień) — materialny program ze strony matki.',
    'maternal-total':
      'F + H — ogólny program linii matki: co proponuje kontynuować lub przemyśleć.',
  },
};

export const isMatrixPositionKey = (key: string): key is MatrixPositionKey =>
  key in MATRIX_POSITION_NOTES.en;
