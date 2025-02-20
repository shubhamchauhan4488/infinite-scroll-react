import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardSkeleton.module.css';

const CardSkeleton = ({ count = 1, highlightColor = '#7e7e7e', height = 300, ...props }) => {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton count={count} highlightColor={highlightColor} height={height} {...props} />
    </div>
  );
};

export default CardSkeleton;