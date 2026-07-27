'use client';

import { useEffect } from 'react';

import { useProfileStore } from '@/store/useProfileStore';

/** Список збережених космограм для кабінету */
export const useProfiles = () => {
  const items = useProfileStore((state) => state.items);
  const isLoading = useProfileStore((state) => state.isLoading);
  const fetchAll = useProfileStore((state) => state.fetchAll);
  const remove = useProfileStore((state) => state.remove);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return { items, isLoading, remove, refetch: fetchAll };
};

/** Одна космограма за id — для сторінки результату */
export const useProfile = (id: string) => {
  const current = useProfileStore((state) => state.current);
  const isLoading = useProfileStore((state) => state.isLoading);
  const fetchById = useProfileStore((state) => state.fetchById);

  useEffect(() => {
    void fetchById(id);
  }, [id, fetchById]);

  return {
    profile: current?.id === id ? current : null,
    isLoading,
  };
};
