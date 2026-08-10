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
import { getApiErrorMessage } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { createRegisterSchema } from '@/utils/validators';
import type { RegisterFormValues } from '@/utils/validators';

import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  const { t } = useLocale();
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);

  const schema = useMemo(() => createRegisterSchema(t.auth.validation), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      router.replace('/profile');
    } catch (error) {
      toast.error(getApiErrorMessage(error, t.auth.register.genericError));
    }
  };

  return (
    <AuthLayout
      title={t.auth.register.title}
      switchText={t.auth.register.switchText}
      switchLinkText={t.auth.register.switchLinkText}
      switchHref="/login"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t.auth.register.nameLabel}
          type="text"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={t.auth.register.emailLabel}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={t.auth.register.passwordLabel}
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label={t.auth.register.confirmPasswordLabel}
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" className={styles.submit} isLoading={isSubmitting}>
          {isSubmitting ? t.auth.register.submitLoadingCta : t.auth.register.submitCta}
        </Button>
      </form>
    </AuthLayout>
  );
};
