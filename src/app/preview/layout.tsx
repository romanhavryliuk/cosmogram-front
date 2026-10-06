import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/** Результат гостя існує лише в його вкладці — індексувати тут нічого */
export const metadata: Metadata = {
  title: 'Your Chart',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children;
}
