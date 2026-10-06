import { ARCANA_LABELS } from '@/i18n/arcana';
import { SIGN_LABELS } from '@/i18n/astroLabels';
import { isArcanaNumber } from '@/types/astrology.types';
import { fetchSharedProfile } from '@/utils/fetchSharedProfile';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/utils/ogImage';

// Edge, а не node: див. пояснення в app/opengraph-image.tsx
export const runtime = 'edge';
export const alt = 'A natal chart shared via Cosmogram';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type OpengraphImageProps = {
  params: { shareId: string };
};

/**
 * Персональне прев'ю: ім'я, центральний аркан і знак Сонця — достатньо,
 * щоб посилання в чаті виглядало як «чиясь карта», без дати й місця
 * народження. Мова англійська: локаль отримувача сервер не знає.
 * Якщо доступ вимкнули чи бекенд недоступний — звичайна брендова картинка.
 */
export default async function OpengraphImage({ params }: OpengraphImageProps) {
  const shared = await fetchSharedProfile(params.shareId);
  if (!shared) return renderOgImage({});

  const { center } = shared.destinyMatrix;
  const sun = shared.chart.planets.find(({ planet }) => planet === 'sun');

  const details = [
    sun && `Sun in ${SIGN_LABELS.en[sun.sign]}`,
    isArcanaNumber(center) && `Destiny Matrix centre: ${ARCANA_LABELS.en[center].name}`,
  ].filter((line): line is string => Boolean(line));

  return renderOgImage({ title: shared.name, details });
}
