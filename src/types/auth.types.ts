export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Відповідь backend на /auth/register та /auth/login */
export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshPayload {
  refreshToken: string;
}
