import type { CSSProperties } from 'react';

import { Container } from '@/components/layout/Container';
import { Loader } from '@/components/ui/Loader';

import styles from './AuthLoadingPanel.module.css';

const loaderStyle: CSSProperties = {
  ['--loader-size' as string]: '22px',
  ['--loader-color' as string]: 'var(--parchment)',
  ['--loader-track' as string]: 'rgba(237, 230, 214, 0.2)',
};

/**
 * Заглушка на місці форми логіну/реєстрації, поки auth-стан ще не піднявся
 * з localStorage або триває редирект уже залогіненого юзера — без неї на
 * мить блимає форма, розрахована на протилежний стан.
 */
export const AuthLoadingPanel = () => {
  return (
    <section className={styles.section}>
      <Container className={styles.wrap}>
        <div className={styles.panel}>
          <Loader style={loaderStyle} />
        </div>
      </Container>
    </section>
  );
};
