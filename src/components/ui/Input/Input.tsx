'use client';

import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { useLocale } from '@/i18n/LocaleProvider';

import styles from './Input.module.css';

type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, type, ...rest }, ref) => {
    const { t } = useLocale();
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const isPassword = type === 'password';
    const [isRevealed, setIsRevealed] = useState(false);

    return (
      <div className={styles.group}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <div className={styles.fieldWrap}>
          <input
            id={inputId}
            ref={ref}
            type={isPassword && isRevealed ? 'text' : type}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={clsx(
              styles.field,
              isPassword && styles.fieldWithToggle,
              error && styles.fieldError,
              className,
            )}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              className={styles.toggleBtn}
              aria-label={
                isRevealed
                  ? t.auth.passwordToggle.hide
                  : t.auth.passwordToggle.show
              }
              onClick={() => setIsRevealed((value) => !value)}
            >
              {isRevealed ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 3l18 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.4 4.3M6.4 6.4C3.8 8.1 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4.2-.9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} className={styles.errorMsg} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
