import React from 'react';
import styles from './styles.module.css';
import Carousel from './Carousel.jsx';
import OutfitList from './OutfitList.jsx';

const ActionRows = ({ products }) => {
  return (
    <>
      <div className={styles.row}>
        <Carousel items={products} />
      </div>
      <OutfitList />
    </>
  );
};

export default React.memo(ActionRows);
