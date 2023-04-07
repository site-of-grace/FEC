import React, { useState, useCallback, forwardRef } from 'react';
import Stars from '../general/Stars.jsx';
import ActionButton from './ActionButton.jsx';
import CardCarousel from './CardCarousel.jsx';
import styles from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setMainPhotos, setMyOutfit } from '../../store/overviewSlice';
import { findFirstThumbnail } from '../../utils/traverse.js';

const Card = forwardRef(({ product, outfit, addToOutfit }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [photo, setPhoto] = useState(findFirstThumbnail(product?.styles));
  const { mainProduct } = useSelector(state => state.overview);
  const dispatch = useDispatch();
  const onClick = () => {
    if (addToOutfit) {
      const savedOutfits = localStorage.getItem('outfits');
      if (savedOutfits && product.id !== '001') {
        const outfits = JSON.parse(savedOutfits);
        const newOutfits = [...outfits, product];
        localStorage.setItem('outfits', JSON.stringify(newOutfits));
      }
      dispatch(setMyOutfit(mainProduct));
      return;
    }
    dispatch(setMainProduct(product));
    dispatch(setMainPhotos(product.styles[0].photos));
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
      className={`${styles.card} slide`}
      ref={ref}
    >
      {!addToOutfit && <ActionButton product={product} related={!outfit}/>}
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
          onClick={onClick}
        />
      </span>
      <span className={styles.details} onClick={onClick}>
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

export default React.memo(Card);
