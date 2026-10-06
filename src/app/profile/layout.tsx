import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Усе під /profile — особисті дані користувача: кабінет, форма створення
 * і сама карта. Такі сторінки не повинні потрапляти в індекс, тому
 * noindex ставимо один раз на весь сегмент, а не на кожну сторінку.
 */
export const metadata: Metadata = {
  // Шаблон діє лише на один рівень вниз, тому повторюємо його тут:
  // інакше вкладені сторінки лишаються без суфікса бренду в заголовку
  title: {
    default: 'Your Charts',
    template: '%s · Cosmogram',
  },
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
