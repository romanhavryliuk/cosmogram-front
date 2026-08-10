'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLocale } from '@/i18n/LocaleProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { createLoginSchema } from '@/utils/validators';
import type { LoginFormValues } from '@/utils/validators';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const { t } = useLocale();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const schema = useMemo(() => createLoginSchema(t.auth.validation), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      router.replace('/profile');
    } catch {
      toast.error(t.auth.login.genericError);
    }
  };

  return (
    <AuthLayout
      title={t.auth.login.title}
      switchText={t.auth.login.switchText}
      switchLinkText={t.auth.login.switchLinkText}
      switchHref="/register"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t.auth.login.emailLabel}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={t.auth.login.passwordLabel}
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className={styles.submit} isLoading={isSubmitting}>
          {isSubmitting ? t.auth.login.submitLoadingCta : t.auth.login.submitCta}
        </Button>
      </form>
    </AuthLayout>
  );
};
