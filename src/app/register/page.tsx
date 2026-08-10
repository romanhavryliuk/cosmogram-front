'use client';

import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  useAuth({ redirectIfAuthenticated: true });

  return <RegisterForm />;
}
