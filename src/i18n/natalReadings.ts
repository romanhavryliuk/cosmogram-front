import type { AspectType, Planet, ZodiacSign } from '@/types/astrology.types';

import type { Locale } from './locales';

/**
 * Тлумачення натальної карти складаються з частин: планета каже «що»,
 * знак — «як», дім — «де». Окремий текст на кожне поєднання дав би 120
 * варіантів на мову; композиція чесніша й підтримувана.
 *
 * Формулювання описові, без передбачень — як і для арканів.
 */
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const isHouseNumber = (value: number): value is HouseNumber =>
  Number.isInteger(value) && value >= 1 && value <= 12;

type NatalReadings = {
  planet: Record<Planet, string>;
  sign: Record<ZodiacSign, string>;
  house: Record<HouseNumber, string>;
  aspect: Record<AspectType, string>;
};

export const NATAL_READINGS: Record<Locale, NatalReadings> = {
  en: {
    planet: {
      sun: 'The core of the personality: will, self-expression, what you live for.',
      moon: 'Emotions and needs: what makes you feel safe and how you react before you think.',
      mercury: 'Mind and speech: how you think, learn and exchange ideas.',
      venus: 'Love and values: what you find beautiful, how you attract and relate.',
      mars: 'Drive and action: how you go after what you want and handle conflict.',
      jupiter: 'Growth and meaning: where you expand, trust life and seek a bigger picture.',
      saturn: 'Structure and responsibility: where life asks for discipline and patience.',
      uranus: 'Change and freedom: where you break patterns and need independence.',
      neptune: 'Imagination and ideals: where you dream, sense subtly — and can lose clarity.',
      pluto: 'Depth and transformation: where you meet power, crisis and rebirth.',
    },
    sign: {
      aries: 'Directly and boldly — first to start, impatient with waiting.',
      taurus: 'Steadily and sensually — through stability, comfort and persistence.',
      gemini: 'Curiously and lightly — through words, variety and quick connections.',
      cancer: 'Protectively and emotionally — through care, home and memory.',
      leo: 'Generously and visibly — through creativity, warmth and the wish to shine.',
      virgo: 'Precisely and usefully — through attention to detail and improvement.',
      libra: 'Diplomatically and aesthetically — through balance, fairness and partnership.',
      scorpio: 'Intensely and deeply — through all-or-nothing commitment and insight.',
      sagittarius: 'Broadly and freely — through exploration, belief and a search for meaning.',
      capricorn: 'Ambitiously and soberly — through long-term goals and earned authority.',
      aquarius: 'Independently and inventively — through ideas, community and the unusual.',
      pisces: 'Gently and intuitively — through empathy, imagination and letting go.',
    },
    house: {
      1: 'In the 1st house — in how you appear and step into the world.',
      2: 'In the 2nd house — in money, possessions and self-worth.',
      3: 'In the 3rd house — in communication, learning and close surroundings.',
      4: 'In the 4th house — in home, family and inner foundations.',
      5: 'In the 5th house — in creativity, romance, play and children.',
      6: 'In the 6th house — in daily work, routine and health.',
      7: 'In the 7th house — in partnerships, marriage and open opponents.',
      8: 'In the 8th house — in intimacy, shared resources and transformation.',
      9: 'In the 9th house — in travel, higher learning and worldview.',
      10: 'In the 10th house — in career, reputation and public life.',
      11: 'In the 11th house — in friends, groups and hopes for the future.',
      12: 'In the 12th house — in solitude, the hidden and the unconscious.',
    },
    aspect: {
      conjunction: 'Conjunction: the two energies merge and act as one — amplifying each other for better or worse.',
      sextile: 'Sextile: an opportunity — the energies cooperate easily once you make a move.',
      square: 'Square: tension that pushes for action — friction that becomes growth when worked with.',
      trine: 'Trine: natural harmony — the energies flow together with little effort.',
      opposition: 'Opposition: a pull between two poles — the task is balance, often through other people.',
    },
  },

  uk: {
    planet: {
      sun: 'Ядро особистості: воля, самовираження, те, заради чого живеш.',
      moon: 'Емоції й потреби: що дає відчуття безпеки і як реагуєш, ще не подумавши.',
      mercury: 'Розум і мова: як думаєш, вчишся й обмінюєшся ідеями.',
      venus: 'Любов і цінності: що вважаєш красивим, як притягуєш і будуєш стосунки.',
      mars: 'Напір і дія: як ідеш до бажаного й поводишся в конфлікті.',
      jupiter: 'Зростання й сенс: де розширюєшся, довіряєш життю й шукаєш ширшу картину.',
      saturn: 'Структура й відповідальність: де життя вимагає дисципліни й терпіння.',
      uranus: 'Зміни й свобода: де ламаєш шаблони й потребуєш незалежності.',
      neptune: 'Уява й ідеали: де мрієш, тонко відчуваєш — і можеш втратити ясність.',
      pluto: 'Глибина й перетворення: де стикаєшся з владою, кризою і відродженням.',
    },
    sign: {
      aries: 'Прямо й сміливо — першим починаєш, не любиш чекати.',
      taurus: 'Неспішно й чуттєво — через стабільність, комфорт і наполегливість.',
      gemini: 'Допитливо й легко — через слова, різноманіття й швидкі зв\'язки.',
      cancer: 'Дбайливо й емоційно — через турботу, дім і пам\'ять.',
      leo: 'Щедро й помітно — через творчість, тепло й бажання сяяти.',
      virgo: 'Точно й корисно — через увагу до деталей і вдосконалення.',
      libra: 'Дипломатично й естетично — через рівновагу, справедливість і партнерство.',
      scorpio: 'Інтенсивно й глибоко — через «все або нічого» і проникливість.',
      sagittarius: 'Широко й вільно — через пошук, віру й прагнення сенсу.',
      capricorn: 'Амбітно й тверезо — через довгі цілі й заслужений авторитет.',
      aquarius: 'Незалежно й винахідливо — через ідеї, спільноту й незвичне.',
      pisces: 'М\'яко й інтуїтивно — через співчуття, уяву й уміння відпускати.',
    },
    house: {
      1: 'У I домі — у тому, як ти виглядаєш і входиш у світ.',
      2: 'У II домі — у грошах, власності й самооцінці.',
      3: 'У III домі — у спілкуванні, навчанні й найближчому оточенні.',
      4: 'У IV домі — у домі, родині й внутрішньому підґрунті.',
      5: 'У V домі — у творчості, романтиці, грі й дітях.',
      6: 'У VI домі — у щоденній роботі, рутині й здоров\'ї.',
      7: 'У VII домі — у партнерстві, шлюбі й відкритих суперниках.',
      8: 'У VIII домі — в інтимності, спільних ресурсах і трансформації.',
      9: 'У IX домі — у подорожах, вищій освіті й світогляді.',
      10: 'У X домі — у кар\'єрі, репутації й публічному житті.',
      11: 'У XI домі — у друзях, спільнотах і надіях на майбутнє.',
      12: 'У XII домі — у самоті, прихованому й підсвідомому.',
    },
    aspect: {
      conjunction: 'З\'єднання: дві енергії зливаються й діють як одна — підсилюють одна одну на краще чи на гірше.',
      sextile: 'Секстиль: можливість — енергії легко співпрацюють, щойно зробиш крок.',
      square: 'Квадрат: напруга, що штовхає до дії — тертя, яке стає ростом, якщо з ним працювати.',
      trine: 'Тригон: природна гармонія — енергії течуть разом майже без зусиль.',
      opposition: 'Опозиція: тяжіння між двома полюсами — завдання знайти баланс, часто через інших людей.',
    },
  },

  pl: {
    planet: {
      sun: 'Rdzeń osobowości: wola, wyrażanie siebie, to, dla czego żyjesz.',
      moon: 'Emocje i potrzeby: co daje poczucie bezpieczeństwa i jak reagujesz, zanim pomyślisz.',
      mercury: 'Umysł i mowa: jak myślisz, uczysz się i wymieniasz idee.',
      venus: 'Miłość i wartości: co uważasz za piękne, jak przyciągasz i budujesz relacje.',
      mars: 'Napęd i działanie: jak dążysz do celu i radzisz sobie z konfliktem.',
      jupiter: 'Wzrost i sens: gdzie się rozwijasz, ufasz życiu i szukasz szerszego obrazu.',
      saturn: 'Struktura i odpowiedzialność: gdzie życie wymaga dyscypliny i cierpliwości.',
      uranus: 'Zmiana i wolność: gdzie łamiesz schematy i potrzebujesz niezależności.',
      neptune: 'Wyobraźnia i ideały: gdzie marzysz, subtelnie czujesz — i możesz stracić jasność.',
      pluto: 'Głębia i przemiana: gdzie spotykasz władzę, kryzys i odrodzenie.',
    },
    sign: {
      aries: 'Wprost i odważnie — pierwszy zaczynasz, nie lubisz czekać.',
      taurus: 'Spokojnie i zmysłowo — przez stabilność, komfort i wytrwałość.',
      gemini: 'Ciekawie i lekko — przez słowa, różnorodność i szybkie połączenia.',
      cancer: 'Opiekuńczo i emocjonalnie — przez troskę, dom i pamięć.',
      leo: 'Hojnie i widocznie — przez twórczość, ciepło i chęć błyszczenia.',
      virgo: 'Precyzyjnie i użytecznie — przez dbałość o szczegóły i ulepszanie.',
      libra: 'Dyplomatycznie i estetycznie — przez równowagę, sprawiedliwość i partnerstwo.',
      scorpio: 'Intensywnie i głęboko — przez „wszystko albo nic” i przenikliwość.',
      sagittarius: 'Szeroko i swobodnie — przez poszukiwanie, wiarę i dążenie do sensu.',
      capricorn: 'Ambitnie i trzeźwo — przez długie cele i zasłużony autorytet.',
      aquarius: 'Niezależnie i pomysłowo — przez idee, wspólnotę i to, co nietypowe.',
      pisces: 'Łagodnie i intuicyjnie — przez empatię, wyobraźnię i umiejętność odpuszczania.',
    },
    house: {
      1: 'W I domu — w tym, jak wyglądasz i wchodzisz w świat.',
      2: 'W II domu — w pieniądzach, posiadaniu i poczuciu własnej wartości.',
      3: 'W III domu — w komunikacji, nauce i najbliższym otoczeniu.',
      4: 'W IV domu — w domu, rodzinie i wewnętrznych fundamentach.',
      5: 'W V domu — w twórczości, romansie, zabawie i dzieciach.',
      6: 'W VI domu — w codziennej pracy, rutynie i zdrowiu.',
      7: 'W VII domu — w partnerstwie, małżeństwie i otwartych przeciwnikach.',
      8: 'W VIII domu — w bliskości, wspólnych zasobach i przemianie.',
      9: 'W IX domu — w podróżach, wyższej nauce i światopoglądzie.',
      10: 'W X domu — w karierze, reputacji i życiu publicznym.',
      11: 'W XI domu — w przyjaciołach, grupach i nadziejach na przyszłość.',
      12: 'W XII domu — w samotności, ukrytym i nieświadomym.',
    },
    aspect: {
      conjunction: 'Koniunkcja: dwie energie łączą się i działają jak jedna — wzmacniają się na dobre i na złe.',
      sextile: 'Sekstyl: szansa — energie łatwo współpracują, gdy zrobisz pierwszy krok.',
      square: 'Kwadratura: napięcie, które popycha do działania — tarcie staje się wzrostem, gdy się nad nim pracuje.',
      trine: 'Trygon: naturalna harmonia — energie płyną razem niemal bez wysiłku.',
      opposition: 'Opozycja: przyciąganie między dwoma biegunami — zadaniem jest równowaga, często przez innych ludzi.',
    },
  },
};
