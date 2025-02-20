import React, { useState } from 'react';
import styles from './ImageCard.module.css';
import CardSkeleton from '../shared/CardSkeleton/CardSkeleton';

const LazyImage = React.lazy(() => import('../shared/Image/Image'));
const Modal = React.lazy(() => import('../Modal/Modal'));

const ImageCard = React.memo(({ image, ref }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true); // Track image load state

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = (e) => {
    setIsModalOpen(false);
    e?.stopPropagation();
  };

  return (
    <>
      {/* {isLoading && <CardSkeleton />} */}
      <div className={styles.card} ref={ref} onClick={handleOpenModal}>

        <LazyImage
          // loading="lazy"
          src={image.urls.small}
          alt={image.alt_description || 'Unsplash Image'}
          loader={<CardSkeleton />}
          // onLoad={() => setIsLoading(false)} // Hide skeleton once loaded
        />

        {isModalOpen && (
          <Modal onClose={handleCloseModal} image={image} />
        )}
      </div>
    </>
  );
});

export default ImageCard;
