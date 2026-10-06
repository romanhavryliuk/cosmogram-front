import type { ZodiacSign } from '@/types/astrology.types';

import type { Locale } from './locales';

export const ELEMENTS = ['fire', 'earth', 'air', 'water'] as const;

export type Element = (typeof ELEMENTS)[number];

/** Класичний розподіл: кожна стихія — три знаки через один */
export const SIGN_ELEMENT: Record<ZodiacSign, Element> = {
  aries: 'fire',
  taurus: 'earth',
  gemini: 'air',
  cancer: 'water',
  leo: 'fire',
  virgo: 'earth',
  libra: 'air',
  scorpio: 'water',
  sagittarius: 'fire',
  capricorn: 'earth',
  aquarius: 'air',
  pisces: 'water',
};

type ElementEntry = {
  name: string;
  /** Що означає перевага цієї стихії — описово, без передбачень */
  meaning: string;
};

/**
 * Баланс стихій — підсумок усієї карти одним абзацом. Окремі планети
 * пояснюють деталі, а тут видно загальний «темперамент»: через що людина
 * передусім сприймає світ.
 */
export const ELEMENT_READINGS: Record<Locale, Record<Element, ElementEntry>> = {
  en: {
    fire: {
      name: 'Fire',
      meaning:
        'You meet the world through action and enthusiasm: quick to start, warm, direct. The flip side is impatience and burning out on long, slow tasks.',
    },
    earth: {
      name: 'Earth',
      meaning:
        'You meet the world through the practical and the tangible: steady, reliable, focused on results. The flip side is resistance to change and too much caution.',
    },
    air: {
      name: 'Air',
      meaning:
        'You meet the world through ideas and conversation: curious, sociable, quick to connect things. The flip side is living in your head and scattering attention.',
    },
    water: {
      name: 'Water',
      meaning:
        'You meet the world through feelings and intuition: empathetic, perceptive, deeply attached. The flip side is taking on other people’s moods and getting hurt easily.',
    },
  },
  uk: {
    fire: {
      name: 'Вогонь',
      meaning:
        'Ти сприймаєш світ через дію й ентузіазм: швидкий старт, тепло, прямота. Зворотний бік — нетерплячість і вигорання на довгих повільних справах.',
    },
    earth: {
      name: 'Земля',
      meaning:
        'Ти сприймаєш світ через практичне й відчутне: стабільність, надійність, зосередженість на результаті. Зворотний бік — опір змінам і зайва обережність.',
    },
    air: {
      name: 'Повітря',
      meaning:
        'Ти сприймаєш світ через ідеї та спілкування: допитливість, товариськість, уміння швидко поєднувати думки. Зворотний бік — життя в голові й розпорошена увага.',
    },
    water: {
      name: 'Вода',
      meaning:
        'Ти сприймаєш світ через почуття й інтуїцію: емпатія, чутливість, глибока прив’язаність. Зворотний бік — схильність переймати чужі настрої і легко ранитися.',
    },
  },
  pl: {
    fire: {
      name: 'Ogień',
      meaning:
        'Odbierasz świat przez działanie i entuzjazm: szybki start, ciepło, bezpośredniość. Druga strona to niecierpliwość i wypalenie przy długich, powolnych sprawach.',
    },
    earth: {
      name: 'Ziemia',
      meaning:
        'Odbierasz świat przez to, co praktyczne i namacalne: stabilność, niezawodność, skupienie na wyniku. Druga strona to opór przed zmianami i nadmierna ostrożność.',
    },
    air: {
      name: 'Powietrze',
      meaning:
        'Odbierasz świat przez idee i rozmowę: ciekawość, towarzyskość, umiejętność szybkiego łączenia myśli. Druga strona to życie w głowie i rozproszona uwaga.',
    },
    water: {
      name: 'Woda',
      meaning:
        'Odbierasz świat przez uczucia i intuicję: empatia, wrażliwość, głębokie przywiązanie. Druga strona to skłonność do przejmowania cudzych nastrojów i łatwe zranienie.',
    },
  },
};
