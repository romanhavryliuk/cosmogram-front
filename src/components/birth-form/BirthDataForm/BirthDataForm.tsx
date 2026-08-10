'use client';

import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { PlaceAutocomplete } from '@/components/birth-form/PlaceAutocomplete';
import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLocale } from '@/i18n/LocaleProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { todayAsInputValue } from '@/utils/dateHelpers';
import { createBirthDataSchema } from '@/utils/validators';
import type { BirthDataFormValues } from '@/utils/validators';

import styles from './BirthDataForm.module.css';

export const BirthDataForm = () => {
  const { t } = useLocale();
  const router = useRouter();
  const createProfile = useProfileStore((state) => state.create);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  // Сесія лежить у localStorage, тому на сервері вона невідома. Показуємо
  // підказку лише після монтування — інакше SSR і гідратація розійдуться.
  useEffect(() => setIsMounted(true), []);

  // Форма доступна завжди — гостю лише не даємо зберегти результат
  const needsAuth = isMounted && !isAuthenticated;

  const schema = useMemo(
    () => createBirthDataSchema(t.birthForm.validation),
    [t],
  );
  const maxDate = useMemo(() => todayAsInputValue(), []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BirthDataFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', birthDate: '', birthTime: '' },
  });

  const onSubmit = async (values: BirthDataFormValues) => {
    // Введене лишаємо в полях — юзер логіниться і тисне "Розрахувати" ще раз
    if (!isAuthenticated) {
      toast.error(t.birthForm.authRequired);
      return;
    }

    try {
      const profile = await createProfile(values);
      router.push(`/profile/${profile.id}`);
    } catch {
      toast.error(t.birthForm.genericError);
    }
  };

  return (
    <div className={styles.panel}>
      <form
        className={styles.inner}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.fields}>
          <Input
            label={t.birthForm.nameLabel}
            placeholder={t.birthForm.namePlaceholder}
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label={t.birthForm.dateLabel}
            type="date"
            max={maxDate}
            error={errors.birthDate?.message}
            {...register('birthDate')}
          />
          <Input
            label={t.birthForm.timeLabel}
            type="time"
            error={errors.birthTime?.message}
            {...register('birthTime')}
          />
          <Controller
            control={control}
            name="place"
            render={({ field, fieldState }) => (
              <PlaceAutocomplete
                label={t.birthForm.placeLabel}
                placeholder={t.birthForm.placePlaceholder}
                searchingText={t.birthForm.placeSearching}
                noResultsText={t.birthForm.placeNoResults}
                value={field.value ?? null}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="submit"
            className={styles.submit}
            isLoading={isSubmitting}
          >
            {isSubmitting
              ? t.birthForm.submitLoadingCta
              : t.birthForm.submitCta}
          </Button>
          {needsAuth && (
            <p className={styles.authNotice}>
              {t.birthForm.authRequired}{' '}
              <Link href="/login">{t.nav.login}</Link>
              {' · '}
              <Link href="/register">{t.nav.signUp}</Link>
            </p>
          )}
          <p className={styles.note}>{t.birthForm.note}</p>
        </div>

        <div className={styles.visual}>
          <ZodiacWheel
            size={240}
            lineColor="var(--teal)"
            glyphColor="var(--parchment-dim)"
          />
        </div>
      </form>
    </div>
  );
};
