import Link from 'next/link';
import styles from './style.module.scss';

export default function Error({ message, code }) {
  return (
    <div className={styles.error}>
      <h1 className={styles.errorTitle}>
        {code}
        {' '}
        |
        {' '}
        {message}
      </h1>
      <Link href="/admin" className={styles.errorHomelink}>
        Go back to home
      </Link>
    </div>
  );
}
