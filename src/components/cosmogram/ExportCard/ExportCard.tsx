'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { ZodiacWheel } from '@/components/cosmogram/ZodiacWheel';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/i18n/LocaleProvider';
import { exportService } from '@/services/exportService';
import type { ExportFormat } from '@/services/exportService';
import { formatBirthDate } from '@/utils/dateHelpers';

import styles from './ExportCard.module.css';

type ExportCardProps = {
  profileId: string;
  birthDate: string;
  placeLabel: string;
};

export const ExportCard = ({
  profileId,
  birthDate,
  placeLabel,
}: ExportCardProps) => {
  const { t } = useLocale();
  const [pendingFormat, setPendingFormat] = useState<ExportFormat | null>(null);

  const sharePicture = async (url: string) => {
    // Web Share API є переважно на мобільних — на десктопі кладемо посилання в буфер
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ url, title: t.exportCard.caption });
      } catch {
        // Юзер закрив системний діалог — це не помилка
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    toast.success(t.exportCard.linkCopied);
  };

  const runExport = async (format: ExportFormat) => {
    setPendingFormat(format);

    try {
      const { url } = await exportService.createExport(profileId, format);

      if (format === 'pdf') {
        window.open(url, '_blank', 'noopener');
        return;
      }

      await sharePicture(url);
    } catch {
      toast.error(t.exportCard.genericError);
    } finally {
      setPendingFormat(null);
    }
  };

  const isBusy = pendingFormat !== null;

  return (
    <div className={styles.strip}>
      <figure className={styles.card}>
        <ZodiacWheel size={70} />
        <figcaption className={styles.caption}>
          <span className={styles.captionTag}>{t.exportCard.caption}</span>
          <span className={styles.captionName}>
            {formatBirthDate(birthDate)} · {placeLabel}
          </span>
        </figcaption>
      </figure>

      <div className={styles.actions}>
        <Button
          onClick={() => void runExport('pdf')}
          isLoading={pendingFormat === 'pdf'}
          disabled={isBusy}
        >
          {pendingFormat === 'pdf'
            ? t.exportCard.preparing
            : t.exportCard.downloadPdf}
        </Button>
        <Button
          variant="ghost"
          onClick={() => void runExport('png')}
          isLoading={pendingFormat === 'png'}
          disabled={isBusy}
        >
          {pendingFormat === 'png'
            ? t.exportCard.preparing
            : t.exportCard.shareImage}
        </Button>
      </div>
    </div>
  );
};
