'use client';

import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode, TouchEvent } from 'react';
import clsx from 'clsx';

import { useLocale } from '@/i18n/LocaleProvider';

import styles from './ChartCarousel.module.css';

export type ChartSlide = {
  id: string;
  /** Коротка назва для вкладки — довгі заголовки не влазять на мобільному */
  tabLabel: string;
  title: string;
  subtitle?: ReactNode;
  description: string;
  content: ReactNode;
};

type ChartCarouselProps = {
  slides: ChartSlide[];
};

/** Мінімальний зсув пальцем, який рахуємо свайпом, а не тремтінням руки */
const SWIPE_THRESHOLD_PX = 50;

/**
 * Слайдер розділів результату: вкладки + стрілки + свайп.
 * Реалізовано вкладками (одна активна панель), а не стрічкою прокрутки —
 * розділи різні за висотою, і панель природної висоти не лишає порожнечі
 * під короткими блоками.
 */
export const ChartCarousel = ({ slides }: ChartCarouselProps) => {
  const { t } = useLocale();
  const baseId = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const touchStartX = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = slides.length;
  const active = slides[index];

  const goTo = (nextIndex: number, viaKeyboard = false) => {
    if (nextIndex === index || nextIndex < 0 || nextIndex >= total) return;
    setDirection(nextIndex > index ? 'next' : 'prev');
    setIndex(nextIndex);
    // У шаблоні вкладок фокус іде за активною вкладкою, інакше клавіатурна
    // навігація "загубить" користувача на попередній кнопці
    if (viaKeyboard) tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1 >= total ? 0 : index + 1, true);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1 < 0 ? total - 1 : index - 1, true);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goTo(0, true);
    }
    if (event.key === 'End') {
      event.preventDefault();
      goTo(total - 1, true);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <section className={styles.carousel} aria-roledescription="carousel">
      <div className={styles.head}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label={t.result.carousel.label}
          onKeyDown={handleTabKeyDown}
        >
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              ref={(node) => {
                tabRefs.current[slideIndex] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${slide.id}`}
              aria-controls={`${baseId}-panel-${slide.id}`}
              aria-selected={slideIndex === index}
              tabIndex={slideIndex === index ? 0 : -1}
              className={clsx(
                styles.tab,
                slideIndex === index && styles.tabActive,
              )}
              onClick={() => goTo(slideIndex)}
            >
              {slide.tabLabel}
            </button>
          ))}
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.arrow}
            aria-label={t.result.carousel.previous}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className={`${styles.counter} mono`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            className={styles.arrow}
            aria-label={t.result.carousel.next}
            disabled={index === total - 1}
            onClick={() => goTo(index + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <article
        // key змушує React перемонтувати панель, щоб CSS-анімація програлась заново
        key={active.id}
        id={`${baseId}-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className={clsx(
          styles.panel,
          direction === 'next' ? styles.fromRight : styles.fromLeft,
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <header className={styles.panelHead}>
          <h3 className={styles.title}>{active.title}</h3>
          {active.subtitle && <p className={styles.sub}>{active.subtitle}</p>}
          <p className={styles.description}>{active.description}</p>
        </header>
        {active.content}
      </article>

      <div className={styles.dots} aria-hidden="true">
        {slides.map((slide, slideIndex) => (
          <span
            key={slide.id}
            className={clsx(
              styles.dot,
              slideIndex === index && styles.dotActive,
            )}
          />
        ))}
      </div>
    </section>
  );
};
