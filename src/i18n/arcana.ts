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
