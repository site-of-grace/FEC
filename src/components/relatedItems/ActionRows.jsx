import React from 'react';
import styles from './styles.module.css';
import Carousel from './Carousel.jsx';
import CarouselR from './Rewrite/Carousel.jsx';
import OutfitList from './OutfitList.jsx';

const ActionRows = ({ products }) => {
  return (
    <>
      {/* <div className={styles.row}>
        <CarouselR products={[...products, ...products]} />
      </div> */}
      <div className={styles.row}>
        <Carousel items={products} />
      </div>
      <OutfitList />
    </>
  );
};

export default React.memo(ActionRows);
