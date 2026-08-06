import { create } from 'zustand';

import { profileService } from '@/services/profileService';

import type {
  CreateProfilePayload,
  Profile,
  ProfileSummary,
} from '@/types/profile.types';

interface ProfileState {
  items: ProfileSummary[];
  current: Profile | null;
  isLoading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  create: (payload: CreateProfilePayload) => Promise<Profile>;
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
    } finally {
      set({ isLoading: false });
    }
  },

  fetchById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const current = await profileService.getById(id);
      set({ current });
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
