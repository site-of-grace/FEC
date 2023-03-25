import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './styles.module.css';
import Card from './Card.jsx';

const disabledStyle = {
  opacity: 0,
  pointerEvents: 'none'
};

const defaultStyle = {
  opacity: 1
};

export default function Carousel({ items }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(252);
  const carousel = useRef(null);
  const lastItem = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const movePrev = () => {
    setItemWidth(lastItem.current.offsetWidth);
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const moveNext = () => {
    setItemWidth(lastItem.current.offsetWidth);
    if (!!carousel.current && currentIndex * itemWidth < maxScrollWidth.current) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const isDisabled = direction => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && !!carousel.current) {
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
    if (!!carousel && !!carousel.current) {
      carousel.current.scrollLeft = currentIndex * itemWidth;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;

    if (lastItem.current) {
      // debugging
      // console.log('maxScrollWidth.current', maxScrollWidth.current, 'lastItem scroll & offsetWidth', lastItem.current.scrollWidth, lastItem.current.offsetWidth);
    }
  }, [maxScrollWidth, width]);

  useEffect(() => {
    let observer;
    const handleResize = () => {
      setCurrentIndex(0);
      console.log('screen resizing');
      if (observer) observer.disconnect();
      setWidth(window.innerWidth);

      if (lastItem.current) {
        setItemWidth(lastItem.current.offsetWidth);
        // debugging
        // console.log('lastItem.offsetWidth', lastItem.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Create an options object to specify the root, rootMargin and threshold values for the intersection observer
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  };

  // Use the useEffect hook to create an intersection observer instance with our callback and options
  useEffect(() => {
    // Create a new observer
    const observer = new IntersectionObserver(callback, options);

    // Get the current element from the ref
    const current = lastItem.current;

    // Observe the element if it exists
    if (current) {
      observer.observe(current);
    }

    // Return a cleanup function that unobserves the element
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [lastItem, options]);

  return (
    <div
      className={styles.row}
      ref={maxScrollWidth}
    >
      <span className={`${styles['chevron-row']}`}>
        <span className={`${styles['chevron-hover']} ${styles.slider}`} />
        <ChevronLeft
          className={`${styles.chevron} ${styles['chevron-left']}`}
          onClick={movePrev}
          style={isDisabled('prev') ? disabledStyle : defaultStyle}
        />
        {!isVisible && (
        <ChevronRight
          className={`${styles.chevron} ${styles['chevron-right']}`}
          onClick={moveNext}
          style={isDisabled('next') ? disabledStyle : defaultStyle}
        />)}
      </span>
      <div
        className={styles['carousel-container']}
        ref={carousel}
      >
        {items.map((item, i) => (
          <Card
            product={item}
            key={item.id}
            ref={i === items.length - 1 ? lastItem : null}
          />
        ))}
      </div>
    </div>
  );
}
