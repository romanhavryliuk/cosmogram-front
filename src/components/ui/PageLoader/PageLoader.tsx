import type { CSSProperties } from 'react';

import { Loader } from '@/components/ui/Loader';

import styles from './PageLoader.module.css';

// Базовий Loader розрахований на золоту кнопку — на темній сторінці його
// не видно, тож для сторінкового стану перефарбовуємо його через змінні
const PAGE_LOADER_STYLE: CSSProperties = {
  ['--loader-size' as string]: '26px',
  ['--loader-color' as string]: 'var(--gold)',
  ['--loader-track' as string]: 'rgba(217, 179, 77, 0.2)',
};

type PageLoaderProps = {
  /** Що саме відбувається, якщо це варто сказати: «Зберігаємо карту…» */
  label?: string;
};

/** Стан завантаження на місці вмісту сторінки. Без хуків — працює і в Server Components */
export const PageLoader = ({ label }: PageLoaderProps) => (
  <div className={styles.wrap}>
    <Loader style={PAGE_LOADER_STYLE} />
    {label && <p className={styles.label}>{label}</p>}
  </div>
);
