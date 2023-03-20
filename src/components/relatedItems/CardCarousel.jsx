import React, { useCallback, useState } from 'react';
// import './styles.css';

const CardCarousel = ({ show, cardItems, changePhoto, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [indexes, setIndexes] = useState({
    lastIndex: (cardItems.length - 2) % cardItems.length,
    previousIndex: cardItems.length - 1,
    currentIndex: 0,
    nextIndex: 1
  });
  if (!cardItems || cardItems.length < 2) {
    return null;
  }
  function determineClasses(indexes, cardIndex) {
    if (indexes.currentIndex === cardIndex) {
      return 'active';
    } else if (indexes.nextIndex === cardIndex) {
      return 'next';
    } else if (indexes.previousIndex === cardIndex) {
      return 'prev';
    } else if (indexes.lastIndex === cardIndex) {
      return 'last';
    }
    return 'inactive';
  }

  const cycleCards = useCallback((index) => {
      console.log('index', index, 'carditems', cardItems);
      changePhoto(cardItems[indexes.nextIndex].url);
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.nextIndex === cardItems.length - 1) {
      setIndexes({
        lastIndex: (cardItems.length - 3) % cardItems.length,
        previousIndex: (cardItems.length - 2) % cardItems.length,
        currentIndex: (cardItems.length - 1) % cardItems.length,
        nextIndex: 0
      });
    } else if (indexes.nextIndex === 0) {
      setIndexes({
        lastIndex: (cardItems.length - 2) % cardItems.length,
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes((prevState) => {
        const obj = {
          lastIndex:
            prevState.currentIndex - 1 === -1
              ? cardItems.length - 1
              : prevState.currentIndex - 1,
          previousIndex: prevState.currentIndex,
          currentIndex: prevState.currentIndex + 1,
          nextIndex:
            prevState.currentIndex + 2 === cardItems.length ? 0 : prevState.currentIndex + 2
        };

        console.log('obj', obj);
        return obj;
      });
    }
  }, [indexes.currentIndex]);

  const cycleCardsBackward = useCallback((index) => {
    changePhoto(cardItems[index].url);
    setIndexes((prevState) => {
      const obj = {
        lastIndex: ((prevState.lastIndex - 1) % cardItems.length) < 0 ? cardItems.length - 1 : (prevState.lastIndex - 1) % cardItems.length,
        previousIndex: prevState.lastIndex,
        currentIndex: prevState.previousIndex,
        nextIndex: prevState.currentIndex,
      };

      console.log('obj', obj);
      return obj;
    });
  }, [indexes.currentIndex]);

  return (
    <ul
      className="card-carousel"
      style={{
        opacity: show || isHovered ? 1 : 0,
        // for testing:
        // opacity: 1
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
    >
      {cardItems.map((card, index) => (
        <li
          key={card.id}
          className={`carousel-card ${determineClasses(indexes, index)}`}
          onClick={indexes.nextIndex === index ? cycleCards.bind(null, index) : cycleCardsBackward.bind(null, index)}
        >
          <img
            src={card.url}
            alt={card.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default CardCarousel;
