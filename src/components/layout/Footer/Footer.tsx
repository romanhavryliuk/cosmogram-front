import { Container } from '@/components/layout/Container';

import styles from './Footer.module.css';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container as="footer" className={styles.footer}>
      <span>Cosmogram · {year}</span>
    </Container>
  );
};
