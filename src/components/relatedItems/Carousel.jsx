import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './styles.module.css';
import Card from './Card.jsx';

export default function Carousel({ items }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const itemWidth = 260;

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const moveNext = () => {
    if (carousel.current !== null && currentIndex * itemWidth < maxScrollWidth.current) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const isDisabled = direction => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      console.log('current', carousel.current.offsetWidth * currentIndex, 'maxScrollWidth.current', maxScrollWidth.current);
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = currentIndex * itemWidth;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className={styles.row} ref={maxScrollWidth}>
      <span className={`${styles['chevron-row']}`}>
        <span
          className={`${styles['chevron-hover']} ${styles.slider} ${styles['chevron-group']}`}
        />
        <ChevronLeft
          className={`${styles.chevron}`}
          onClick={movePrev}
          style={{ opacity: `${isDisabled('prev') ? '0' : '1'}` }}
        />
        <ChevronRight
          className={`${styles.chevron}`}
          onClick={moveNext}
          style={{ opacity: `${isDisabled('next') ? '0' : '1'}` }}
        />
      </span>
      <div
        className={styles['carousel-container']}
        ref={carousel}
      >
        {items.map(item => (
          <Card
            product={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
