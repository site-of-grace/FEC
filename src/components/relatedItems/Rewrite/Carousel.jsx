import React, { useState, useRef } from 'react';
import Card from '../Card.jsx';
import styles from './carousel.module.css';

const CarouselR = ({ products }) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const carouselRef = useRef();

  const handleLeftClick = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset + carouselRef.current.clientWidth;
      return Math.min(newOffset, 0);
    });
  };

  const handleRightClick = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset - carouselRef.current.clientWidth;
      const maxOffset = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      return Math.max(newOffset, -maxOffset);
    });
  };

  return (
    <div className={styles['carousel-container']}>
      {currentOffset < 0 && (
        <button className={`${styles['carousel-arrow']} ${styles['carousel-arrow-left']} `} onClick={handleLeftClick}>
          {'<'}
        </button>
      )}
      <div className={styles.carousel} ref={carouselRef} style={{ transform: `translateX(${currentOffset}px)` }}>
        {products.map((product, i) => (
                    <Card
                    product={product}
                    outfit={false}
                    addToOutfit={false}
                    key={product.id}
                    // ref={i === products.length - 1 ? lastproduct : null}
                  />
        ))}
      </div>
      {currentOffset > -(carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth) && (
        <button className={`${styles['carousel-arrow']} ${styles['carousel-arrow-right']}`} onClick={handleRightClick}>
          {'>'}
        </button>
      )}
    </div>
  );
};

export default CarouselR;
