import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ToastProvider } from '@/components/ui/Toast';

import './globals.css';

export const metadata: Metadata = {
  title: 'Cosmogram',
  description: 'Натальна карта та нумерологія за датою народження',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
