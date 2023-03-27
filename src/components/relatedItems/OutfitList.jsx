import React from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import Carousel from './Carousel.jsx';

const OutfitList = () => {
  const { myOutfit } = useSelector(state => state.overview);
  return (
    <>
      <div className={styles.row}>
        <Carousel items={myOutfit} outfits={true}/>
      </div>
    </>
  );
};

export default React.memo(OutfitList);
