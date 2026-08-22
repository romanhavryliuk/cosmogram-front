'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/Button';

import styles from './ConfirmDialog.module.css';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  // Портал напряму в body — інакше fixed-оверлей ловиться в stacking context
  // будь-якого позиціонованого предка (напр. Section із власним z-index)
  // і програє елементам поза ним, навіть маючи вищий z-index локально.
  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
        <div className={styles.actions}>
          <Button variant="danger" isLoading={isLoading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button variant="ghost" ref={cancelRef} onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
