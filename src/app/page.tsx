import { BirthDataSection } from '@/components/birth-form/BirthDataSection';
import { ResultSection } from '@/components/cosmogram/ResultSection';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/hero/how-it-works/HowItWorks';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BirthDataSection />
      <ResultSection />
    </>
  );
}
