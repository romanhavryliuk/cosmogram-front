'use client';

import type { ReactNode } from 'react';

import { Button } from '@/components/ui/Button';

import styles from './ErrorState.module.css';

type ErrorStateProps = {
  title: string;
  text: string;
  /** Текст помилки з бекенду — показуємо дрібним, щоб було що сказати підтримці */
  detail?: string | null;
  retryLabel?: string;
  onRetry?: () => void;
  /** Додаткова дія поруч із "Спробувати ще раз", напр. посилання назад до списку */
  action?: ReactNode;
};

export const ErrorState = ({
  title,
  text,
  detail,
  retryLabel,
  onRetry,
  action,
}: ErrorStateProps) => {
  return (
    <div className={styles.error} role="alert">
      <svg
        className={styles.mark}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 7.5v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {detail && <p className={styles.detail}>{detail}</p>}

      {(onRetry || action) && (
        <div className={styles.actions}>
          {onRetry && retryLabel && (
            <Button variant="ghost" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
};
