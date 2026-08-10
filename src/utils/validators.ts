import { z } from 'zod';

import type { Dictionary } from '@/i18n/dictionaries';

type ValidationMessages = Dictionary['auth']['validation'];

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

export const birthPlaceSchema = z.object({
  label: z.string().min(1, 'Оберіть місце народження'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.string().min(1),
});

export const birthDataSchema = z.object({
  name: z.string().min(2, "Введіть ім'я").max(32, "Ім'я задовге"),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата у форматі РРРР-ММ-ДД')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Некоректна дата')
    .refine(
      (value) => new Date(value) <= new Date(),
      'Дата народження не може бути в майбутньому',
    ),
  birthTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Час у форматі ГГ:ХХ'),
  place: birthPlaceSchema,
});

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
export type BirthDataFormValues = z.infer<typeof birthDataSchema>;
