import type { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export const Container = ({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) => {
  return <Tag className={clsx(styles.wrap, className)}>{children}</Tag>;
};
