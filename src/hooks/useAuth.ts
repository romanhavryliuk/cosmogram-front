'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/useAuthStore';

interface UseAuthOptions {
  /** Кинути на /login, якщо юзер неавторизований (для приватних сторінок) */
  redirectIfUnauthenticated?: boolean;
  /** Кинути на /profile, якщо юзер уже залогінений (для /login та /register) */
  redirectIfAuthenticated?: boolean;
}

export const useAuth = ({
  redirectIfUnauthenticated = false,
  redirectIfAuthenticated = false,
}: UseAuthOptions = {}) => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating);
  const isLoading = useAuthStore((state) => state.isLoading);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Поки persist не піднявся, стан ще не остаточний — редіректити зарано
    if (isHydrating) return;

    if (redirectIfUnauthenticated && !isAuthenticated) {
      router.replace('/login');
    }

    if (redirectIfAuthenticated && isAuthenticated) {
      router.replace('/profile');
    }
  }, [
    isHydrating,
    isAuthenticated,
    redirectIfUnauthenticated,
    redirectIfAuthenticated,
    router,
  ]);

  return {
    user,
    isAuthenticated,
    isHydrating,
    isLoading,
    login,
    register,
    logout,
  };
};
