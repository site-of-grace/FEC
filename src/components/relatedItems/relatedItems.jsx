import React, { useEffect } from 'react';
import manualSWR from '../../utils/fetchers';
import { useDispatch, useSelector } from 'react-redux';
// import { setMainProduct, } from '../../store/overviewSlice';
import { setProducts } from '../../store/productSlice';
import styles from './styles.module.css';
import Card from './Card.jsx';

const RelatedItems = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const onSuccess = (res) => {
    console.log('res', res);
    const products = res.data;
    const productsString = JSON.stringify(products);
    localStorage.setItem('products', productsString);
    dispatch(setProducts(products));
  };

  const { trigger } = manualSWR({ path: '/related', type: 'get', onSuccess });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      console.log('$$$ cache money $$$');
      dispatch(setProducts(JSON.parse(savedProducts)));
    } else {
      trigger();
    }
  }, []);

  return (
    <>
      <h1 className={styles.title}>RELATED ITEMS</h1>
      <div className={styles.row}>
        {products.map((product) => (
          <Card
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </>
  );
};

export default RelatedItems;
