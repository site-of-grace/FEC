import React from 'react';
import styles from './styles.module.css';
import Carousel from './Carousel.jsx';
// import { ChevronRight } from 'lucide-react';
// import Card from './Card.jsx';

const Row = ({ products }) => {
  return (
    <>
      <div className={styles.row}>
        <Carousel items={products} />
      </div>
      {/* <div className={styles.row}>
        <Carousel items={products} />
      </div> */}
    </>
  );
};

export default React.memo(Row);
