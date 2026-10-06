import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { fetchSharedProfile } from '@/utils/fetchSharedProfile';

const FALLBACK_TITLE = 'Shared Chart';
const DESCRIPTION =
  'A natal chart, Destiny Matrix and Pythagorean Square shared via Cosmogram.';

type ShareLayoutProps = {
  params: { shareId: string };
};

/**
 * Власник відкрив карту тим, у кого є посилання, — а не пошуковикам.
 * Тому noindex: прев'ю в месенджерах працює й так, а в видачу особисті
 * дані народження не потраплять.
 *
 * Ім'я в заголовку робить прев'ю в чаті впізнаваним («чия це карта»).
 * Мова англійська з тієї ж причини, що й в OG-картинці: локаль
 * отримувача сервер не знає.
 */
export async function generateMetadata({
  params,
}: ShareLayoutProps): Promise<Metadata> {
  const shared = await fetchSharedProfile(params.shareId);
  const title = shared ? `${shared.name} — Natal Chart` : FALLBACK_TITLE;

  return {
    title,
    description: DESCRIPTION,
    robots: { index: false, follow: false },
    // Тут шаблон «· Cosmogram» не діє — дописуємо бренд самі
    openGraph: { title: `${title} · Cosmogram`, description: DESCRIPTION },
    twitter: { title: `${title} · Cosmogram`, description: DESCRIPTION },
  };
}

export default function ShareLayout({ children }: { children: ReactNode }) {
  return children;
}
