import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Сторінка входу — клієнтський компонент, а Client Components не можуть
 * експортувати metadata. Тому тримаємо її тут, у серверному layout сегмента.
 */
export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to Cosmogram to open your saved charts.',
  alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
