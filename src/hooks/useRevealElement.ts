'use client';

import { useCallback, useRef } from 'react';

/**
 * Підтягує елемент у поле зору, якщо він за межами екрана. Потрібно для
 * панелей тлумачення: на телефоні вона стоїть вище за число, яке натиснули,
 * і без цього відкрилась би невидимо. Рух вимикається, якщо так налаштовано
 * в системі.
 */
export const useRevealElement = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  const reveal = useCallback(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    // Після рендеру панель уже містить новий текст — міряємо правильну висоту
    requestAnimationFrame(() =>
      ref.current?.scrollIntoView({
        block: 'nearest',
        behavior: reduceMotion ? 'auto' : 'smooth',
      }),
    );
  }, []);

  return { ref, reveal };
};
