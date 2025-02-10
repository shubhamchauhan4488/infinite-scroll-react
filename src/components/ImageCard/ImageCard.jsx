import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ImageCard.module.css';
import Image from '../shared/Image/Image';
import CardSkeleton from '../shared/CardSkeleton/CardSkeleton';

const ImageCard = React.memo(({ image, ref }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track image load state

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = (e) => {
    setIsModalOpen(false);
    e?.stopPropagation();
  };

  return (
    <>
      {isLoading && <CardSkeleton />}
      <div className={styles.card} ref={ref} onClick={handleOpenModal}>

        <Image
          loading="lazy"
          src={image.urls.small}
          alt={image.alt_description || 'Unsplash Image'}
          className={styles.image}
          onLoad={() => setIsLoading(false)} // Hide skeleton once loaded
        />

        {isModalOpen && (
          <Modal onClose={handleCloseModal} image={image} />
        )}
      </div>
    </>
  );
});

export default ImageCard;
