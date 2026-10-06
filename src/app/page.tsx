import type { Metadata } from 'next';

import { BirthDataSection } from '@/components/birth-form/BirthDataSection';
import { ResultSection } from '@/components/cosmogram/ResultSection';
import { DashboardSection } from '@/components/dashboard/DashboardSection';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/hero/how-it-works/HowItWorks';

const HOME_TITLE = 'Cosmogram — your natal chart and Destiny Matrix';
const HOME_DESCRIPTION =
  'Enter your birth date, time and place to get a natal chart with houses and aspects, a Destiny Matrix and a Pythagorean Square — in one card.';

export const metadata: Metadata = {
  // Головна не бере шаблон із суфіксом: назва бренду тут і є заголовком
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  // Next не переносить title у og:title автоматично — задаємо явно,
  // інакше прев'ю головної дублює загальний опис сайту
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BirthDataSection />
      <ResultSection />
      <DashboardSection />
    </>
  );
}
