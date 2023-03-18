import React, { useEffect } from 'react';
import manualSWR from '../../utils/fetchers';
import { useDispatch, useSelector } from 'react-redux';
// import { setMainProduct, } from '../../store/overviewSlice';
import { setProducts } from '../../store/productSlice';
import styles from './styles.module.css';
import Card from './card.jsx';

const RelatedItems = () => {


  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const onSuccess = (res) => {
    console.log('res', res);
    dispatch(setProducts(res.data));
  };

  const { trigger } = manualSWR({ path: '/related', type: 'get', onSuccess });

  useEffect(() => {
    trigger();
  }, []);

  return (
    <>
      <h1 className={styles.title}>RELATED ITEMS</h1>
      <div className={styles.row}>
        {/* <Card product={fakeData} /> */}
        {products.map((product) => (
          <Card product={product} key={product.id}/>
        ))}
      </div>
    </>
  );
};

export default RelatedItems;
