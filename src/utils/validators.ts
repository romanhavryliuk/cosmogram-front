import { z } from 'zod';

import type { Dictionary } from '@/i18n/dictionaries';

type ValidationMessages = Dictionary['auth']['validation'];
type BirthValidationMessages = Dictionary['birthForm']['validation'];

export const createLoginSchema = (t: ValidationMessages) =>
  z.object({
    email: z.string().min(1, t.emailRequired).email(t.emailInvalid),
    password: z.string().min(1, t.passwordRequired),
  });

export const createRegisterSchema = (t: ValidationMessages) =>
  z
    .object({
      name: z.string().min(2, t.nameMin).max(32, t.nameMax),
      email: z.string().min(1, t.emailRequired).email(t.emailInvalid),
      password: z
        .string()
        .min(8, t.passwordMin)
        .regex(/[a-zA-Z]/, t.passwordLetter)
        .regex(/\d/, t.passwordDigit),
      confirmPassword: z.string().min(1, t.confirmPasswordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.passwordMismatch,
      path: ['confirmPassword'],
    });

/**
 * Місце народження приходить готовим об'єктом з геокодера, тому валідуємо
 * лише те, що юзер справді обрав підказку, а не залишив вільний текст.
 */
const createBirthPlaceSchema = (t: BirthValidationMessages) =>
  z.object(
    {
      label: z.string().min(1, t.placeRequired),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      timezone: z.string().min(1, t.placeRequired),
    },
    // Поле порожнє або юзер набрав текст, не обравши підказку
    { required_error: t.placeRequired, invalid_type_error: t.placeRequired },
  );

export const createBirthDataSchema = (t: BirthValidationMessages) =>
  z.object({
    name: z.string().min(2, t.nameMin).max(32, t.nameMax),
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, t.dateFormat)
      .refine((value) => !Number.isNaN(Date.parse(value)), t.dateInvalid)
      .refine((value) => new Date(value) <= new Date(), t.dateFuture),
    birthTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, t.timeFormat),
    place: createBirthPlaceSchema(t),
  });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
export type BirthDataFormValues = z.infer<
  ReturnType<typeof createBirthDataSchema>
>;
