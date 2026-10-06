import { create } from 'zustand';

import { getApiErrorMessage } from '@/services/api';
import { profileService } from '@/services/profileService';

import type {
  CreateProfilePayload,
  Profile,
  ProfileSummary,
  UpdateProfilePayload,
} from '@/types/profile.types';

interface ProfileState {
  items: ProfileSummary[];
  current: Profile | null;
  isLoading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  create: (payload: CreateProfilePayload) => Promise<Profile>;
  update: (id: string, payload: UpdateProfilePayload) => Promise<Profile>;
  /** null — доступ за посиланням закрито */
  setShareId: (id: string, shareId: string | null) => void;
  remove: (id: string) => Promise<void>;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  items: [],
  current: null,
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await profileService.getAll();
      set({ items });
    } catch (error) {
      // Гасимо тут — і /profile (гість чи ще не піднявся токен), і реальний
      // збій бекенду не мають валити сторінку необробленим reject'ом
      set({ error: getApiErrorMessage(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const current = await profileService.getById(id);
      set({ current });
    } catch (error) {
      set({ error: getApiErrorMessage(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  create: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await profileService.create(payload);
      set({ current: profile });
      return profile;
    } finally {
      set({ isLoading: false });
    }
  },

  update: async (id, payload) => {
    const profile = await profileService.update(id, payload);
    // Картка в кабінеті показує ім'я, дату й місце — тримаємо її в синхроні,
    // щоб після повернення до списку не висіли старі дані
    set((state) => ({
      current: profile,
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: profile.name,
              birthDate: profile.birthDate,
              place: { label: profile.place.label },
            }
          : item,
      ),
    }));
    return profile;
  },

  setShareId: (id, shareId) =>
    set((state) => ({
      current:
        state.current?.id === id ? { ...state.current, shareId } : state.current,
    })),

  remove: async (id) => {
    const previous = get().items;
    // Оптимістичне видалення — картка зникає одразу, при помилці повертаємо список
    set({ items: previous.filter((item) => item.id !== id) });
    try {
      await profileService.remove(id);
    } catch (error) {
      set({ items: previous });
      throw error;
    }
  },

  reset: () => set({ items: [], current: null, error: null }),
}));
