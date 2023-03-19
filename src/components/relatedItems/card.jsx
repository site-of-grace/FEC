import React, { useState, useCallback } from 'react';
import Stars from '../general/Stars.jsx';
import CardCarousel from './CardCarousel.jsx';
import styles from './card.module.css';
import { useDispatch } from 'react-redux';
import { setMainProduct } from '../../store/overviewSlice';
import { findFirstThumbnail } from '../../utils/traverse.js';

const Card = React.memo(({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [photo, setPhoto] = useState(findFirstThumbnail(product.styles));
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setMainProduct(product));
  };
  const changePhoto = (url) => {
    setPhoto(url);
  };

  const categoryStyle = useCallback(
    (category) => {
      const current = category.toLowerCase();

      if (current.includes('pants')) {
        return styles['pants'];
      } else if (current.includes('kicks') || current.includes('shoes')) {
        return styles['shoes'];
      } else if (current.includes('Jackets')) {
        return styles.jackets;
      } else if (current.includes('Shirts')) {
        return styles.shirts;
      } else if (current.includes('Accessories')) {
        return styles.accessories;
      } else {
        return styles.default;
      }
    },
    [product.category]
  );

  const photoStyles = Object.entries(product.validPhotos).map((arr) => ({
    id: arr[0],
    url: arr[1]
  }));

  return (
    <div
      className={styles.card}
      onClick={onClick}
    >
      <span className={styles.imageContainer}>
        <CardCarousel
          show={isHovered}
          cardItems={photoStyles}
          changePhoto={changePhoto}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <img
          className={`${styles.image} image-container`}
          id={photo.includes('placeholder') ? styles['placeholder'] : categoryStyle(product.category)}
          style={{
            opacity: isHovered ? 1 : 0.75
          }}
          src={photo}
          alt="product"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </span>
      <span className={styles.details}>
        <span className={styles.category}>{product.category.toUpperCase()}</span>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>{product.default_price}</span>
        <Stars
          number={product.rating}
          hide={true}
        />
      </span>
    </div>
  );
});

export default Card;
