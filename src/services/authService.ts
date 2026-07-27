import { api } from './api';

import type {
  AuthResponse,
  AuthTokens,
  LoginPayload,
  RegisterPayload,
  User,
} from '@/types/auth.types';

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refresh: async (refreshToken: string): Promise<AuthTokens> => {
    const { data } = await api.post<AuthTokens>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },

  /** Поточний юзер за збереженим токеном — використовується при гідратації сесії */
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/current');
    return data;
  },
};
