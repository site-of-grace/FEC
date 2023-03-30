import React from 'react';
import styles from './styles.module.css';
import Carousel from './Carousel.jsx';
import OutfitList from './OutfitList.jsx';
import ComparisonModal from './ComparisonModal.jsx';

const ActionRows = ({ products }) => {
  return (
    <>
      <div className={styles.row}>
        <Carousel items={products} />
      </div>
      <OutfitList />
      <ComparisonModal/>
    </>
  );
};

export default React.memo(ActionRows);
