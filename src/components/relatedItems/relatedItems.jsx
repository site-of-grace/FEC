import React, { lazy, useState, Suspense, useEffect, useRef } from 'react';
import manualSWR from '../../utils/fetchers';
import { useDispatch, useSelector } from 'react-redux';
// import { setMainProduct, } from '../../store/overviewSlice';
import { setProducts } from '../../store/productSlice';
import styles from './styles.module.css';
const RelatedRow = lazy(() => import('./RelatedList.jsx'));

const RelatedItems = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [showRelated, setShowRelated] = useState(false);
  const relatedRef = useRef();
  const onSuccess = (res) => {
    console.log('res', res);
    const products = res.data;
    const productsString = JSON.stringify(products);
    localStorage.setItem('products', productsString);
    dispatch(setProducts(products));
  };

  const { trigger } = manualSWR({ path: '/related', type: 'get', onSuccess });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRelated(true);
          observer.unobserve(relatedRef.current);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(relatedRef.current);

    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      console.log('$$$ cache money $$$');
      dispatch(setProducts(JSON.parse(savedProducts)));
    } else {
      trigger();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1 className={styles.title}>RELATED ITEMS</h1>
      {/* <RelatedRow products={products} /> */}
      <div ref={relatedRef}>
        {showRelated && (
          <Suspense fallback={<div>Loading...</div>}>
            <RelatedRow products={products} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default RelatedItems;
