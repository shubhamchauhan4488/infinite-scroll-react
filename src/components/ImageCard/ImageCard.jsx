import React, { useState } from 'react';
import styles from './ImageCard.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageCard = React.memo(({ image, ref }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.card} ref={ref}>
      {/* Skeleton overlay for smooth transition */}
      {isLoading && <Skeleton highlightColor='#7e7e7e' height="100%" width='100%' />}

      {/* Image is always rendered but hidden until loaded */}
      <img
        loading="lazy"
        src={image.urls.small}
        alt={image.alt_description || 'Unsplash Image'}
        className={styles.image}
        onLoad={() => setIsLoading(false)} // Hide skeleton once loaded
      />
    </div>
  );
});

export default ImageCard;
