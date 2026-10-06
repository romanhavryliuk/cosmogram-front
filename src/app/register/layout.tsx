import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/** Metadata живе в layout, бо сама сторінка реєстрації — клієнтський компонент */
export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create a Cosmogram account to build and keep your natal charts.',
  alternates: { canonical: '/register' },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
