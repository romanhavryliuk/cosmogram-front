import { forwardRef } from 'react';
import type { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, className, as: Tag = 'div' }, ref) => {
    return (
      <Tag ref={ref} className={clsx(styles.wrap, className)}>
        {children}
      </Tag>
    );
  },
);

Container.displayName = 'Container';
