import React, { useRef, Suspense } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { ThreeDots } from 'react-loader-spinner';

const LazyImage = React.lazy(() => import('../shared/Image/Image'));

const Modal = ({ image, onClose }) => {
  const modalRef = useRef(null);

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div ref={modalRef} className={styles.modalContent}>
        <Suspense fallback={<ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rotating-square-loading"
        />}>
          <LazyImage
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash Image'}
            className={styles.modalImage}
          />
        </Suspense>
        {image.alt_description && <p>{image.alt_description}</p>}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;