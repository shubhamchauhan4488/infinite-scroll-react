import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGrid.module.css';

const ImageGrid = React.memo(({ images, lastElementRef, loading }) => {
  return (
    <div className={styles.gridConatiner}>
      <div className={styles.grid}>
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
