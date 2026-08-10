import styles from './Loader.module.css';

export const Loader = () => {
  return <span className={styles.spinner} role="status" aria-hidden="true" />;
};
