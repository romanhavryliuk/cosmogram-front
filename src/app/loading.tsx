import { PageLoader } from '@/components/ui/PageLoader';

import styles from './loading.module.css';

/** Server Component: без тексту, тож перекладу не потребує і не тягне клієнтський бандл */
export default function Loading() {
  return (
    <div className={styles.wrap}>
      <PageLoader />
    </div>
  );
}
