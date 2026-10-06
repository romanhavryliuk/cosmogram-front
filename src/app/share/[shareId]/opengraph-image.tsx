import { ARCANA_LABELS } from '@/i18n/arcana';
import { SIGN_LABELS } from '@/i18n/astroLabels';
import { isArcanaNumber } from '@/types/astrology.types';
import type { SharedProfile } from '@/types/profile.types';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/utils/ogImage';

// Edge, а не node: див. пояснення в app/opengraph-image.tsx
export const runtime = 'edge';
export const alt = 'A natal chart shared via Cosmogram';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Месенджери кешують прев'ю самі, тож частіше години перераховувати нема сенсу
const REVALIDATE_SECONDS = 3600;

type OpengraphImageProps = {
  params: { shareId: string };
};

const fetchShared = async (shareId: string): Promise<SharedProfile | null> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/share/${encodeURIComponent(shareId)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return response.ok ? ((await response.json()) as SharedProfile) : null;
  } catch {
    return null;
  }
};

/**
 * Персональне прев'ю: ім'я, центральний аркан і знак Сонця — достатньо,
 * щоб посилання в чаті виглядало як «чиясь карта», без дати й місця
 * народження. Мова англійська: локаль отримувача сервер не знає.
 * Якщо доступ вимкнули чи бекенд недоступний — звичайна брендова картинка.
 */
export default async function OpengraphImage({ params }: OpengraphImageProps) {
  const shared = await fetchShared(params.shareId);
  if (!shared) return renderOgImage({});

  const { center } = shared.destinyMatrix;
  const sun = shared.chart.planets.find(({ planet }) => planet === 'sun');

  const details = [
    sun && `Sun in ${SIGN_LABELS.en[sun.sign]}`,
    isArcanaNumber(center) && `Destiny Matrix centre: ${ARCANA_LABELS.en[center].name}`,
  ].filter((line): line is string => Boolean(line));

  return renderOgImage({ title: shared.name, details });
}
