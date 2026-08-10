import type { ReactNode } from 'react';
import clsx from 'clsx';

import { Container } from '@/components/layout/Container';

import styles from './Section.module.css';

type SectionProps = {
  /** Якір для навігації в хедері */
  id?: string;
  /** Дрібний надпис над заголовком: "Процес", "Крок 01" */
  tag: string;
  heading: string;
  /** Правий блок шапки — на десктопі стає в один рядок із заголовком */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Спільна обгортка секцій: розділювач, шапка з тегом і заголовком */
export const Section = ({
  id,
  tag,
  heading,
  aside,
  children,
  className,
}: SectionProps) => {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <Container>
        <div className={styles.head}>
          <div>
            <p className={styles.tag}>{tag}</p>
            <h2 className={styles.title}>{heading}</h2>
          </div>
          {aside}
        </div>
        {children}
      </Container>
    </section>
  );
};
