import { Loader } from '@/components/ui/Loader';

import styles from './loading.module.css';

// Базовий лоадер розрахований на золоту кнопку, на темному тлі його не видно
const LOADER_STYLE = {
  ['--loader-size' as string]: '26px',
  ['--loader-color' as string]: 'var(--gold)',
  ['--loader-track' as string]: 'rgba(217, 179, 77, 0.2)',
};

/** Server Component: без тексту, тож перекладу не потребує і не тягне клієнтський бандл */
export default function Loading() {
  return (
    <div className={styles.wrap}>
      <Loader style={LOADER_STYLE} />
    </div>
  );
}
