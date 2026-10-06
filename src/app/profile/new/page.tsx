import type { Metadata } from 'next';

import { BirthDataSection } from '@/components/birth-form/BirthDataSection';

// robots: noindex успадковується з layout сегмента /profile
export const metadata: Metadata = {
  title: 'New Chart',
};

export default function NewProfilePage() {
  return <BirthDataSection showStepTag={false} />;
}
