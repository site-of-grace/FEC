import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setProducts } from '../../store/overviewSlice';
import styles from './styles.module.css';
import Card from './card.jsx';

const RelatedItems = () => {
  // const fakeData = {
  //   category: 'Jackets',
  //   name: 'Camo Jacket',
  //   price: '140.00',
  //   rating: '4.5',
  //   image:
  //     'https://images.unsplash.com/photo-1613419489076-15da367b38df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  // };

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  return (
    <>
      <h1 className={styles.title}>RELATED ITEMS</h1>
      <div className={styles.row}>
        {/* <Card product={fakeData} /> */}
        <Card />
      </div>
    </>
  );
};

export default RelatedItems;
