import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/utils/ogImage';

// У Next 14 node-версія @vercel/og будує шлях до шрифту через path.join —
// на Windows виходить невалідний URL і збірка падає. Edge цього не робить.
export const runtime = 'edge';
export const alt = 'Cosmogram — natal chart, Destiny Matrix and Pythagorean Square';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({});
}
