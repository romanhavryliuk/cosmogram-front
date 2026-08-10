import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { Loader } from '@/components/ui/Loader';

import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.btn,
        variant === 'primary' ? styles.btnPrimary : styles.btnGhost,
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
};
