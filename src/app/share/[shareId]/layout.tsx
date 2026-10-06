import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Власник відкрив карту тим, у кого є посилання, — а не пошуковикам.
 * Тому noindex: прев'ю в месенджерах працює й так, а в видачу особисті
 * дані народження не потраплять.
 */
export const metadata: Metadata = {
  title: 'Shared Chart',
  description: 'A natal chart, Destiny Matrix and Pythagorean Square shared via Cosmogram.',
  robots: { index: false, follow: false },
};

export default function ShareLayout({ children }: { children: ReactNode }) {
  return children;
}
