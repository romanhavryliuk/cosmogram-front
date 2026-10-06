'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/Button';
import { useLocale } from '@/i18n/LocaleProvider';
import { profileService } from '@/services/profileService';
import { useProfileStore } from '@/store/useProfileStore';

import styles from './ShareControls.module.css';

type ShareControlsProps = {
  profileId: string;
  /** Профілі, створені до появи шерингу, приходять без цього поля */
  shareId?: string | null;
};

const buildShareUrl = (shareId: string) =>
  `${window.location.origin}/share/${shareId}`;

export const ShareControls = ({ profileId, shareId }: ShareControlsProps) => {
  const { t } = useLocale();
  const setShareId = useProfileStore((state) => state.setShareId);
  const [isBusy, setIsBusy] = useState(false);

  const copyLink = async (id: string) => {
    try {
      await navigator.clipboard.writeText(buildShareUrl(id));
      toast.success(t.share.linkCopied);
    } catch {
      // Буфер обміну недоступний (http, старий браузер) — посилання все одно
      // видно в полі, його можна виділити й скопіювати вручну
    }
  };

  const handleShare = async () => {
    setIsBusy(true);
    try {
      const newShareId = await profileService.enableShare(profileId);
      setShareId(profileId, newShareId);
      await copyLink(newShareId);
    } catch {
      toast.error(t.share.error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleStop = async () => {
    setIsBusy(true);
    try {
      await profileService.disableShare(profileId);
      setShareId(profileId, null);
      toast.success(t.share.stopped);
    } catch {
      toast.error(t.share.error);
    } finally {
      setIsBusy(false);
    }
  };

  if (!shareId) {
    return (
      <div className={styles.wrap}>
        <Button variant="ghost" onClick={() => void handleShare()} isLoading={isBusy}>
          {t.share.shareCta}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.linkRow}>
        <input
          className={`${styles.linkField} mono`}
          value={buildShareUrl(shareId)}
          readOnly
          aria-label={t.share.shareCta}
          // Один клік виділяє все посилання — зручно, якщо буфер недоступний
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button onClick={() => void copyLink(shareId)} disabled={isBusy}>
          {t.share.copyLink}
        </Button>
        <Button
          variant="ghost"
          onClick={() => void handleStop()}
          isLoading={isBusy}
        >
          {t.share.stopSharing}
        </Button>
      </div>
      <p className={styles.hint}>{t.share.activeHint}</p>
    </div>
  );
};
