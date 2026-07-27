import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import type { AuthTokens } from '@/types/auth.types';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Токени тримаємо тут, а не імпортуємо store — інакше вийде цикл
 * store -> service -> store. useAuthStore синхронізує їх через setTokens().
 */
let accessToken: string | null = null;
let refreshToken: string | null = null;

/** Викликається store'ом, коли токени змінилися (login/refresh/logout) */
export const setTokens = (tokens: AuthTokens | null) => {
  accessToken = tokens?.accessToken ?? null;
  refreshToken = tokens?.refreshToken ?? null;
};

/** Store підписується сюди, щоб дізнатись про протухлу сесію */
type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler = () => {};

export const setUnauthorizedHandler = (handler: UnauthorizedHandler) => {
  onUnauthorized = handler;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };

/** Щоб паралельні 401 не запустили кілька refresh-запитів одночасно */
let refreshRequest: Promise<AuthTokens> | null = null;

const requestNewTokens = async (): Promise<AuthTokens> => {
  const { data } = await axios.post<AuthTokens>(
    `${api.defaults.baseURL}/auth/refresh`,
    { refreshToken },
    { headers: { 'Content-Type': 'application/json' } },
  );
  return data;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    const shouldRefresh =
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      Boolean(refreshToken);

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshRequest = refreshRequest ?? requestNewTokens();
      const tokens = await refreshRequest;
      setTokens(tokens);
      return await api(originalRequest);
    } catch (refreshError) {
      setTokens(null);
      onUnauthorized();
      return Promise.reject(refreshError);
    } finally {
      refreshRequest = null;
    }
  },
);

/** Дістає читабельний текст помилки з відповіді backend */
export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Щось пішло не так. Спробуйте ще раз.',
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};
