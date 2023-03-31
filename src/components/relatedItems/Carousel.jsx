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
  // const { products } = useSelector((state) => state.products);
  const { myOutfit, mainProduct, prevProduct } = useSelector(state => state.overview);
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(252);
  const carouselRef = useRef(null);
  const lastItemRef = useRef(null);
  const [showRight, setShowRight] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);

  const isDisabled = direction => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next') {
      // debugging

      const widthProduct = Math.abs(itemWidth * currentIndex);
      console.log(
        'carousel.current.scrollWidth',
        carouselRef.current.scrollWidth,
        'itemWidth * currentIndex (widthProduct)',
        widthProduct,
        'maxScrollWidth.current',
        maxScrollWidth.current,
        'screen width',
        width
      );
      return widthProduct >= maxScrollWidth.current;
    }

    return false;
  };

  const movePrev = () => {
    setCurrentOffset(prevOffset => {
      const newOffset = prevOffset + carouselRef.current.clientWidth;
      return Math.min(newOffset, 0);
    });

    if (lastItemRef.current) {
      setItemWidth(lastItemRef.current.scrollWidth);
    }

    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }

    setShowRight(!isDisabled('next'));
  };

  const moveNext = () => {
    setCurrentOffset(prevOffset => {
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

    setShowRight(!isDisabled('next'));
  };

  useEffect(() => {
    if (outfits && myOutfit.length > 1) {
      setCurrentIndex(0);
      moveNext();
    }
  }, [myOutfit]);

  useEffect(() => {
    if (!!carouselRef && !!carouselRef.current) {
      carouselRef.current.scrollLeft = currentIndex * itemWidth;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carouselRef.current
      ? carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      : 0;

    if (lastItemRef.current) {
      // debugging
      console.log('maxScrollWidth.current', maxScrollWidth.current, 'lastItem scroll & offsetWidth', lastItemRef.current.scrollWidth, lastItemRef.current.offsetWidth);
      setShowRight(!isDisabled('next'));
    }
  }, [maxScrollWidth, width, itemWidth, currentIndex, items]);

  useEffect(() => {
    setShowRight(!isDisabled('next'));
    const handleResize = () => {
      setCurrentIndex(0);
      setShowRight(!isDisabled('next'));
      console.log('screen resizing');
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
  }, [mainProduct]);

  useEffect(() => {
    if (!prevProduct?.id) {
      return;
    }
    console.log('rerender carousel on new products');
    // setIsVisible(true);
    setCurrentIndex(0);
    setWidth(window.innerWidth);

    if (lastItemRef.current) {
      setItemWidth(lastItemRef.current.scrollWidth);
    }

    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }

    // movePrev();
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
          style={!isDisabled('prev') ? defaultStyle : disabledStyle}
        />
        {(
          <ChevronRight
            data-testid="chevron-right"
            className={`${styles.chevron} ${styles['chevron-right']}`}
            onClick={moveNext}
            // style={currentOffset > -(carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth) ? defaultStyle : disabledStyle}
            // style={!isDisabled('next') ? defaultStyle : disabledStyle}
            style={showRight ? defaultStyle : disabledStyle}
          />
        )}
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
