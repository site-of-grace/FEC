import React from 'react';
import Stars from '../general/Stars.jsx';
import styles from './card.module.css';
import { useDispatch } from 'react-redux';
import { setMainProduct, } from '../../store/overviewSlice';

export default function Card({ product = { 
  category: 'Category',
  name: 'Expanded Product Name with Extra Text',
  price: '$0.00',
  rating: '0',
}}) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setMainProduct(product));
  };
  

  return (
    <div className={styles.card} onClick={onClick} >
      <span className={styles.imageContainer}>
        <img
          className={styles.image}
          src={product.styles[0].photos[0].thumbnail_url}
          alt="product"
        />
      </span>
      <span className={styles.details}>
        <span className={styles.category}>{product.category.toUpperCase()}</span>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>{product.default_price}</span>
        <Stars number={product.rating} hide={true}/>
      </span>
    </div>
  );
}
