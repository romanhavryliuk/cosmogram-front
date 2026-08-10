'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  useAuth({ redirectIfAuthenticated: true });

  return <LoginForm />;
}
