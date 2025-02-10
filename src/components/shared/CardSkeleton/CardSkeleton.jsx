import Skeleton from 'react-loading-skeleton';
import styles from './CardSkeleton.module.css';

export const CardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton highlightColor='#7e7e7e' height="100%" />
    </div>
  );
}