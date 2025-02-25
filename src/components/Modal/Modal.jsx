import React, { useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { Audio, Blocks } from 'react-loader-spinner';

const LazyImage = React.lazy(() => import('../shared/Image/Image'));

const Modal = ({ image, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={styles.modalContent}>
        <Suspense fallback={
          <Blocks
            height="280"
            width="280"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        }>
          <LazyImage
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash Image'}
            loader={<Blocks
              height="180"
              width="180"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />}
            className={styles.modalImage}
          />
          {image.alt_description && <p>{image.alt_description}</p>}
        </Suspense>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;