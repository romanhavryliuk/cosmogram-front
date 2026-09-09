'use client';

import { useCallback, useEffect } from 'react';

import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

/** Список збережених космограм для кабінету */
export const useProfiles = () => {
  const items = useProfileStore((state) => state.items);
  const isLoading = useProfileStore((state) => state.isLoading);
  const error = useProfileStore((state) => state.error);
  const fetchAll = useProfileStore((state) => state.fetchAll);
  const remove = useProfileStore((state) => state.remove);

  const isHydrating = useAuthStore((state) => state.isHydrating);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Токен ще підіймається з localStorage або юзер не залогінений —
    // запит однаково піде з 401, просто зачекаємо
    if (isHydrating || !isAuthenticated) return;
    void fetchAll();
  }, [isHydrating, isAuthenticated, fetchAll]);

  return {
    items,
    // Поки сесія не піднялась, для сторінки це той самий стан очікування
    isLoading: isLoading || isHydrating,
    error,
    remove,
    refetch: fetchAll,
  };
};

/** Одна космограма за id — для сторінки результату */
export const useProfile = (id: string) => {
  const current = useProfileStore((state) => state.current);
  const isLoading = useProfileStore((state) => state.isLoading);
  const error = useProfileStore((state) => state.error);
  const fetchById = useProfileStore((state) => state.fetchById);

  const isHydrating = useAuthStore((state) => state.isHydrating);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isHydrating || !isAuthenticated) return;
    void fetchById(id);
  }, [id, isHydrating, isAuthenticated, fetchById]);

  const refetch = useCallback(() => void fetchById(id), [fetchById, id]);

  return {
    profile: current?.id === id ? current : null,
    isLoading: isLoading || isHydrating,
    error,
    refetch,
  };
};
