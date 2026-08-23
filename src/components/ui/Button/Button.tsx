import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { Loader } from '@/components/ui/Loader';

import styles from './Button.module.css';

const VARIANT_CLASS = {
  primary: 'btnPrimary',
  ghost: 'btnGhost',
  danger: 'btnDanger',
} as const;

type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'danger';
  isLoading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading = false,
      disabled,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.btn,
          styles[VARIANT_CLASS[variant]],
          isLoading && styles.isLoading,
          className,
        )}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading && <Loader />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
