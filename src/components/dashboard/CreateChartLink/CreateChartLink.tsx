import Link from 'next/link';

import { useLocale } from '@/i18n/LocaleProvider';

import styles from './CreateChartLink.module.css';

export const CreateChartLink = () => {
  const { t } = useLocale();

  return (
    <Link href="/profile/new" className={styles.link}>
      {t.profileActions.createNewCta}
    </Link>
  );
};
