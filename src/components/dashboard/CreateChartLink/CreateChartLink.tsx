import Link from 'next/link';

import { useLocale } from '@/i18n/LocaleProvider';

import styles from './CreateChartLink.module.css';

type CreateChartLinkProps = {
  /** За замовчуванням «Побудувати нову карту» — для гостей і чужих карт свій текст */
  label?: string;
};

export const CreateChartLink = ({ label }: CreateChartLinkProps) => {
  const { t } = useLocale();

  return (
    <Link href="/profile/new" className={styles.link}>
      {label ?? t.profileActions.createNewCta}
    </Link>
  );
};
