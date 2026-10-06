import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Mono, Inter } from 'next/font/google';

import { CosmicBackground } from '@/components/layout/CosmicBackground';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ToastProvider } from '@/components/ui/Toast';
import { LocaleProvider } from '@/i18n/LocaleProvider';

import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const SITE_NAME = 'Cosmogram';
const SITE_DESCRIPTION =
  'Natal chart and numerology based on your birth date';

/**
 * Абсолютна база для OG-тегів: без неї Next не вміє зробити з відносних
 * шляхів абсолютні URL, і прев'ю в соцмережах не збирається.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    // Сторінки задають лише свою частину, суфікс бренду додається сам
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <LocaleProvider>
          <CosmicBackground />
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastProvider />
        </LocaleProvider>
      </body>
    </html>
  );
}
