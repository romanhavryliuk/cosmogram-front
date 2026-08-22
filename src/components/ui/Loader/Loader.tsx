import type { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './Loader.module.css';

type LoaderProps = {
  className?: string;
  /** Дає перевизначити --loader-size/--loader-color/--loader-track для нестандартного фону */
  style?: CSSProperties;
};

export const Loader = ({ className, style }: LoaderProps = {}) => {
  return (
    <span
      className={clsx(styles.spinner, className)}
      style={style}
      role="status"
      aria-hidden="true"
    />
  );
};
