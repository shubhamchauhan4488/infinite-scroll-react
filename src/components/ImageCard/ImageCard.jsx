import React, { Suspense, useState } from 'react';
import styles from './ImageCard.module.css';
import CardSkeleton from '../shared/CardSkeleton/CardSkeleton';

const LazyImage = React.lazy(() => import('../shared/Image/Image'));
const Modal = React.lazy(() => import('../Modal/Modal'));

const ImageCard = React.memo(({ image, eager, ref }) => {
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
        {image.alt_description}
        <Suspense fallback={<CardSkeleton highlightColor='#eb7474d5' />}>
          <LazyImage
            src={image.urls.small}
            alt={image.alt_description || 'Unsplash Image'}
            loader={<CardSkeleton />}
          />
        </Suspense>
        {isModalOpen && (
          <Modal onClose={handleCloseModal} image={image} />
        )}
      </div>
    </>
  );
});

export default ImageCard;
