import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { profileService } from '@/services/profileService';

import type {
  CreateProfilePayload,
  PreviewResult,
} from '@/types/profile.types';

interface PreviewState {
  /** Порахована, але ще не збережена карта гостя */
  result: PreviewResult | null;
  calculate: (payload: CreateProfilePayload) => Promise<PreviewResult>;
  clear: () => void;
}

/**
 * Гостьовий результат живе в sessionStorage: переживає перезавантаження
 * й перехід на реєстрацію, але не лишається назавжди на чужому комп'ютері.
 * Після входу кабінет забирає звідси дані народження й зберігає карту.
 */
export const usePreviewStore = create<PreviewState>()(
  persist(
    (set) => ({
      result: null,

      calculate: async (payload) => {
        const result = await profileService.preview(payload);
        set({ result });
        return result;
      },

      clear: () => set({ result: null }),
    }),
    {
      name: 'cosmogram-preview',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
