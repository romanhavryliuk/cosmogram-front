'use client';

import { AuthLoadingPanel } from '@/components/auth/AuthLoadingPanel';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { isAuthenticated, isHydrating } = useAuth({
    redirectIfAuthenticated: true,
  });

  // Поки не з'ясовано реальний стан або триває редирект залогіненого —
  // не показуємо форму, розраховану на протилежний стан
  if (isHydrating || isAuthenticated) {
    return <AuthLoadingPanel />;
  }

  return <RegisterForm />;
}
