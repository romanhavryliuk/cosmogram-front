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
import { usePreviewStore } from '@/store/usePreviewStore';
import { useProfileStore } from '@/store/useProfileStore';
import type { CreateProfilePayload, Profile } from '@/types/profile.types';
import { todayAsInputValue } from '@/utils/dateHelpers';
import { createBirthDataSchema } from '@/utils/validators';
import type { BirthDataFormValues } from '@/utils/validators';

import styles from './BirthDataForm.module.css';

type BirthDataFormProps = {
  /** Переданий профіль вмикає режим редагування */
  profile?: Profile;
};

// Порожнє поле часу у формі — це «час невідомий», бекенд чекає для нього null
const toPayload = (values: BirthDataFormValues): CreateProfilePayload => ({
  ...values,
  birthTime: values.birthTime || null,
});

export const BirthDataForm = ({ profile }: BirthDataFormProps) => {
  const { t } = useLocale();
  const router = useRouter();
  const createProfile = useProfileStore((state) => state.create);
  const updateProfile = useProfileStore((state) => state.update);
  const calculatePreview = usePreviewStore((state) => state.calculate);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  const isEdit = Boolean(profile);

  // Сесія лежить у localStorage, тому на сервері вона невідома. Показуємо
  // підказку лише після монтування — інакше SSR і гідратація розійдуться.
  useEffect(() => setIsMounted(true), []);

  const isGuest = isMounted && !isAuthenticated;

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
    defaultValues: profile
      ? {
          name: profile.name,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime ?? '',
          place: profile.place,
        }
      : { name: '', birthDate: '', birthTime: '' },
  });

  const onSubmit = async (values: BirthDataFormValues) => {
    const payload = toPayload(values);

    if (profile) {
      try {
        await updateProfile(profile.id, payload);
        toast.success(t.editProfile.success);
        router.push(`/profile/${profile.id}`);
      } catch {
        toast.error(t.editProfile.error);
      }
      return;
    }

    // Гість бачить результат одразу, без акаунта; зберегти його можна
    // після реєстрації — кабінет підхопить ці ж дані сам
    if (!isAuthenticated) {
      try {
        await calculatePreview(payload);
        router.push('/preview');
      } catch {
        toast.error(t.guest.previewError);
      }
      return;
    }

    try {
      const created = await createProfile(payload);
      router.push(`/profile/${created.id}`);
    } catch {
      toast.error(t.birthForm.genericError);
    }
  };

  const submitLabel = isEdit
    ? isSubmitting
      ? t.editProfile.savingCta
      : t.editProfile.saveCta
    : isSubmitting
      ? t.birthForm.submitLoadingCta
      : t.birthForm.submitCta;

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
          <div className={styles.fieldWithHint}>
            <Input
              label={t.birthForm.timeLabel}
              type="time"
              error={errors.birthTime?.message}
              aria-describedby="birth-time-hint"
              {...register('birthTime')}
            />
            <p id="birth-time-hint" className={styles.fieldHint}>
              {t.birthForm.timeOptionalHint}
            </p>
          </div>
          <Controller
            control={control}
            name="place"
            render={({ field, fieldState }) => (
              <PlaceAutocomplete
                label={t.birthForm.placeLabel}
                placeholder={t.birthForm.placePlaceholder}
                searchingText={t.birthForm.placeSearching}
                noResultsText={t.birthForm.placeNoResults}
                errorText={t.birthForm.placeSearchError}
                rateLimitedText={t.birthForm.placeRateLimited}
                value={field.value ?? null}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <div className={styles.actions}>
            <Button
              type="submit"
              className={styles.submit}
              isLoading={isSubmitting}
            >
              {submitLabel}
            </Button>
            {profile && (
              <Link href={`/profile/${profile.id}`} className={styles.cancel}>
                {t.editProfile.cancelCta}
              </Link>
            )}
          </div>
          {isGuest && !isEdit && (
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
