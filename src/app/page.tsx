import { BirthDataSection } from '@/components/birth-form/BirthDataSection';
import { ResultSection } from '@/components/cosmogram/ResultSection';
import { DashboardSection } from '@/components/dashboard/DashboardSection';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/hero/how-it-works/HowItWorks';

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
