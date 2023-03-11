import React from 'react';
import Stars from '../general/Stars.jsx';
import styles from './styles.module.css';

export default function Card({ product = { 
  category: 'Category',
  name: 'Expanded Product Name with Extra Text',
  price: '$0.00',
  rating: '0',
}}) {
  

  return (
    <div className={styles.card}>
      <span className={styles.imageContainer}>
        <img
          className={styles.image}
          src={product.image}
          alt="product"
        />
      </span>
      <span className={styles.details}>
        <span className={styles.category}>{product.category.toUpperCase()}</span>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>{product.price}</span>
        <Stars number={product.rating} />
      </span>
    </div>
  );
}
