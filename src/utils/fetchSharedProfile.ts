import type { SharedProfile } from '@/types/profile.types';

// Месенджери кешують прев'ю самі, тож частіше години перераховувати нема сенсу
const REVALIDATE_SECONDS = 3600;

/**
 * Серверний запит публічної карти — для метаданих і OG-картинки сторінки
 * /share. Не через axios-клієнт: тому потрібні браузерні токени, а тут
 * лише публічний ендпоінт і кеш Next через fetch.
 * null — доступ вимкнено, токен невідомий або бекенд недоступний.
 */
export const fetchSharedProfile = async (
  shareId: string,
): Promise<SharedProfile | null> => {
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
