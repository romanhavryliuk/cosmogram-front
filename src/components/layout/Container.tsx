import type { ElementType, ReactNode } from 'react';

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
  return <Tag className={className}>{children}</Tag>;
};
