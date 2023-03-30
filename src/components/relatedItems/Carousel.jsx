import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import Card from './Card.jsx';

const disabledStyle = {
  opacity: 0,
  pointerEvents: 'none'
};

const defaultStyle = {
  opacity: 1
};

export default function Carousel({ items, outfits = false }) {
  //   const { products } = useSelector((state) => state.products);
  const { myOutfit } = useSelector((state) => state.overview);
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(252);
  const carouselRef = useRef(null);
  const lastItemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [currentOffset, setCurrentOffset] = useState(0);

  const callback = entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const movePrev = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset + carouselRef.current.clientWidth;
      return Math.min(newOffset, 0);
    });

    if (lastItemRef.current) {
      setItemWidth(lastItemRef.current.scrollWidth);
    }
    
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const moveNext = () => {
    setCurrentOffset((prevOffset) => {
      const newOffset = prevOffset - carouselRef.current.clientWidth;
      const maxOffset = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      return Math.max(newOffset, -maxOffset);
    });

    if (lastItemRef.current) {
      setItemWidth(lastItemRef.current.scrollWidth);
    }

    if (!!carouselRef.current && currentIndex * itemWidth < maxScrollWidth.current) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const isDisabled = direction => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && !!carouselRef.current) {
      // debugging

      // console.log(
      //   'carousel.current.scrollWidth',
      //   carousel.current.scrollWidth,
      //   'itemWidth * currentIndex',
      //   itemWidth * currentIndex,
      //   'maxScrollWidth.current',
      //   maxScrollWidth.current,
      //   'screen width',
      //   width
      // );
      return itemWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (outfits && myOutfit.length > 1) {
      setCurrentIndex(items.length - 1);
      moveNext();
    }
  }, [myOutfit]);

  useEffect(() => {
    if (!!carouselRef && !!carouselRef.current) {
      carouselRef.current.scrollLeft = currentIndex * itemWidth;
    }
  }, [currentIndex, items]);

  useEffect(() => {
    maxScrollWidth.current = carouselRef.current
      ? carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      : 0;

    if (lastItemRef.current) {
      // debugging
      // console.log('maxScrollWidth.current', maxScrollWidth.current, 'lastItem scroll & offsetWidth', lastItem.current.scrollWidth, lastItem.current.offsetWidth);
    }
  }, [maxScrollWidth, width]);

  useEffect(() => {
    let observer;
    const handleResize = () => {
      setCurrentIndex(0);
      movePrev();
      console.log('screen resizing');
      if (observer) observer.disconnect();
      setWidth(window.innerWidth);

      if (lastItemRef.current) {
        setItemWidth(lastItemRef.current.scrollWidth);
        // debugging
        // console.log('lastItem.offsetWidth', lastItem.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.95
    };
    const observer = new IntersectionObserver(callback, options);
    const current = lastItemRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [lastItemRef]);

  return (
    <div
      className={styles.row}
      ref={maxScrollWidth}
    >
      <span className={`${styles['chevron-row']}`}>
        <span className={`${styles['chevron-hover']} ${styles.slider}`} />
        <ChevronLeft
          data-testid="chevron-left"
          className={`${styles.chevron} ${styles['chevron-left']}`}
          onClick={movePrev}
          style={currentOffset < 0 ? defaultStyle : disabledStyle}
        />
        {(
        <ChevronRight
          data-testid="chevron-right"
          className={`${styles.chevron} ${styles['chevron-right']}`}
          onClick={moveNext}
          style={currentOffset > -(carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth) ? defaultStyle : disabledStyle}
        />)}
      </span>
      <div
        className={`${styles['carousel-container']} carousel`}
        ref={carouselRef}
        data-testid="carousel"
      >
        {items.map((item, i) => (
          <Card
            product={item}
            outfit={outfits}
            addToOutfit={outfits && i === 0}
            key={item.id}
            ref={i === items.length - 1 ? lastItemRef : null}
          />
        ))}
      </div>
    </div>
  );
}
