import { forwardRef } from 'react';

import styles from './ReadingDetails.module.css';

export type ReadingLine = {
  /** «Що», «Як», «Де» — без мітки рядок іде як звичайний абзац */
  label?: string;
  text: string;
};

export type Reading = {
  title: string;
  /** Додатковий рядок поруч із заголовком: знак і дім, тип аспекту з орбом */
  meta?: string;
  lines: ReadingLine[];
};

type ReadingDetailsProps = {
  reading: Reading | null;
  /** Що показати, поки нічого не обрано */
  hint: string;
};

/** Панель тлумачення елемента натальної карти. ref — щоб її можна було підтягнути в поле зору */
export const ReadingDetails = forwardRef<HTMLDivElement, ReadingDetailsProps>(
  ({ reading, hint }, ref) => {
    if (!reading) {
      return (
        <div ref={ref} className={styles.hintPanel}>
          <p className={styles.hint}>{hint}</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={styles.panel} role="status" aria-live="polite">
        <div className={styles.head}>
          <span className={styles.title}>{reading.title}</span>
          {reading.meta && (
            <span className={`${styles.meta} mono`}>{reading.meta}</span>
          )}
        </div>
        <div className={styles.lines}>
          {reading.lines.map((line) => (
            <p key={line.label ?? line.text} className={styles.line}>
              {line.label && <span className={styles.label}>{line.label}</span>}
              {line.text}
            </p>
          ))}
        </div>
      </div>
    );
  },
);

ReadingDetails.displayName = 'ReadingDetails';
