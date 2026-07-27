import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Введіть email')
  .email('Некоректний email');

export const passwordSchema = z
  .string()
  .min(8, 'Пароль має містити щонайменше 8 символів')
  .regex(/[a-zA-Z]/, 'Пароль має містити літеру')
  .regex(/\d/, 'Пароль має містити цифру');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Введіть пароль'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Ім'я має містити щонайменше 2 символи")
      .max(32, "Ім'я задовге"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Підтвердіть пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
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

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BirthDataFormValues = z.infer<typeof birthDataSchema>;
