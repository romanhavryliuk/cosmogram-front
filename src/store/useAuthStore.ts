import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { setTokens, setUnauthorizedHandler } from '@/services/api';
import { authService } from '@/services/authService';
import { useProfileStore } from '@/store/useProfileStore';

import type {
  AuthTokens,
  LoginPayload,
  RegisterPayload,
  User,
} from '@/types/auth.types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  /** true, поки persist не підняв стан з localStorage — щоб не редіректити передчасно */
  isHydrating: boolean;
  isLoading: boolean;

  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isHydrating: true,
      isLoading: false,

      register: async (payload) => {
        set({ isLoading: true });
        try {
          const { user, ...tokens } = await authService.register(payload);
          setTokens(tokens);
          set({ user, tokens, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (payload) => {
        set({ isLoading: true });
        try {
          const { user, ...tokens } = await authService.login(payload);
          setTokens(tokens);
          set({ user, tokens, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch {
          // Навіть якщо backend не відповів — локальну сесію все одно чистимо
        } finally {
          get().clearSession();
          set({ isLoading: false });
        }
      },

      refreshCurrentUser: async () => {
        if (!get().tokens) return;
        try {
          const user = await authService.getCurrentUser();
          set({ user, isAuthenticated: true });
        } catch {
          // 401 уже обробив інтерсептор (refresh або clearSession).
          // Будь-який інший збій не має валити застосунок необробленим reject'ом.
        }
      },

      clearSession: () => {
        setTokens(null);
        set({ user: null, tokens: null, isAuthenticated: false });
        // Космограми попереднього юзера не мають лишатись у пам'яті:
        // наступний логін на цьому ж браузері побачив би чужі картки
        useProfileStore.getState().reset();
      },
    }),
    {
      name: 'cosmogram-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, tokens: state.tokens }),
    },
  ),
);

/**
 * persist гідратує синхронно ще всередині create(), коли константа useAuthStore
 * не присвоєна — тому onRehydrateStorage там падає на TDZ, а помилку persist
 * ковтає. Тож синхронізуємо стан одразу після створення стора.
 *
 * На сервері localStorage немає, гідратації не було — прапорець лишаємо піднятим,
 * інакше SSR і перший клієнтський рендер розійдуться.
 */
if (typeof window !== 'undefined') {
  const { tokens } = useAuthStore.getState();

  setTokens(tokens);
  useAuthStore.setState({
    isAuthenticated: Boolean(tokens),
    isHydrating: false,
  });

  // localStorage міг пережити сесію: токен відкликано, юзера видалено або
  // перейменовано. Звіряємось із сервером один раз на старті — помилку
  // ковтає сам refreshCurrentUser, тож у fire-and-forget це безпечно.
  if (tokens) {
    void useAuthStore.getState().refreshCurrentUser();
  }
}

// Протух refresh-токен -> інтерсептор гасить сесію
setUnauthorizedHandler(() => {
  useAuthStore.getState().clearSession();
});
