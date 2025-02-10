import React from 'react';
import styles from './ImageGrid.module.css';
import CardSkeleton from '../shared/CardSkeleton/CardSkeleton';

const ImageCard = React.lazy(() => import('../ImageCard/ImageCard'));
const ImageGrid = React.memo(({ images, lastElementRef, loading }) => {
  return (
    <div className={styles.gridConatiner}>
      <div className={styles.grid}>
        {/* Show skeletons when initial loading */}
        {loading && images.length === 0 &&
          [...Array(10)].map((_, i) => <CardSkeleton key={i} />)}

        {images.length > 0 &&
          images.map((image, index) => (
            <ImageCard
              image={image}
              key={image.id}
              ref={index === images.length - 1 ? lastElementRef : null}
            />
          ))}
      </div>
    </div>
  );
});

export default ImageGrid;
