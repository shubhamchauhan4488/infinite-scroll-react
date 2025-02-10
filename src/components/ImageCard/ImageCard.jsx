import styles from './ImageCard.module.css';

const ImageCard = ({ image, ref }) => {
  return (
    <div className={styles.card} ref={ref}>
      <img
        loading="lazy"
        src={image.urls.small}
        alt={image.alt_description || 'Unsplash Image'}
        className={styles.image}
        onLoad={() => setIsLoading(false)} // Hide skeleton once loaded
      />
    </div>
  );
};

export default ImageCard;
