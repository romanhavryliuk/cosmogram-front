'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { useLocale } from '@/i18n/LocaleProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { usePreviewStore } from '@/store/usePreviewStore';
import { useProfileStore } from '@/store/useProfileStore';

/**
 * Гість порахував карту, потім увійшов чи зареєструвався — і будь-який шлях
 * входу веде в кабінет. Тут кабінет забирає збережені дані народження,
 * створює з них профіль і відкриває його: нічого не треба вводити вдруге.
 *
 * Повертає true, поки триває збереження.
 */
export const usePendingPreviewClaim = () => {
  const router = useRouter();
  const { t } = useLocale();
  const pending = usePreviewStore((state) => state.result);
  const clearPending = usePreviewStore((state) => state.clear);
  const createProfile = useProfileStore((state) => state.create);
  const isHydrating = useAuthStore((state) => state.isHydrating);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isClaiming, setIsClaiming] = useState(false);

  // StrictMode у dev запускає ефект двічі — без цього карта створилась би двічі
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isHydrating || !isAuthenticated || !pending || hasStartedRef.current) {
      return;
    }
    hasStartedRef.current = true;
    setIsClaiming(true);

    const { name, birthDate, birthTime, place } = pending;

    createProfile({ name, birthDate, birthTime, place })
      .then((profile) => {
        clearPending();
        router.replace(`/profile/${profile.id}`);
      })
      .catch(() => {
        // Чистимо й при помилці: інакше кабінет пробував би знову щоразу
        clearPending();
        setIsClaiming(false);
        toast.error(t.guest.saveError);
      });
  }, [
    isHydrating,
    isAuthenticated,
    pending,
    createProfile,
    clearPending,
    router,
    t.guest.saveError,
  ]);

  return isClaiming;
};
