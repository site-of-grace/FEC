import React, { lazy, useState, Suspense, useEffect, useRef, useCallback } from 'react';
import manualSWR, { fetcher } from '../../utils/fetchers';
import { useDispatch, useSelector } from 'react-redux';
import { setOutfits, } from '../../store/overviewSlice';
import { setProducts } from '../../store/productSlice';
import styles from './styles.module.css';
const ActionRows = lazy(() => import('./ActionRows.jsx'));


const RelatedItems = () => {
  const dispatch = useDispatch();
  const { products, cacheArray } = useSelector((state) => state.products);
  const { myOutfit, mainProduct, prevProduct } = useSelector((state) => state.overview);
  const [showRelated, setShowRelated] = useState(false);
  const relatedRef = useRef();
  const onSuccess = (data) => {
    console.log('related api call res', data);
    const products = data;
    if (prevProduct?.id) {
      products.push({...prevProduct, mainProduct: mainProduct.id});
    }
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
    // write a function to check if all saveproducts.mainProduct === mainProduct.id

    function allSavedProductsMatchMainProductId(savedProducts, mainProduct) {
      console.log('savedProducts', savedProducts, mainProduct);
      // if (!mainProduct.id) return true;
      const result = savedProducts.every(product => product.mainProduct === mainProduct.id);
      console.log('savedProducts result', result);
    }
      
    if (savedProducts && (allSavedProductsMatchMainProductId(JSON.parse(savedProducts), mainProduct))) {
      console.log('$$$ cache money $$$');
      dispatch(setProducts(JSON.parse(savedProducts)));
    } else {
      console.log('no cache or mainProduct.id changed');
      trigger();
    }

    const savedOutfits = localStorage.getItem('outfits');
    if (savedOutfits) {
      const outfits = JSON.parse(savedOutfits);
      dispatch(setOutfits(outfits));
    } else {
      // setTimeout(() => {
        localStorage.setItem('outfits', JSON.stringify(myOutfit));
      // }, 1000);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem('outfits', JSON.stringify(myOutfit));
  }, [myOutfit]);

  useEffect(() => {
    // const { trigger: getRelated } = manualSWR({ path: '/related', params: {cache: cacheArray}, type: 'get', onSuccess });
    if (prevProduct?.id) {
      fetcher('/related?id=' + mainProduct.id, {cache: [...cacheArray, prevProduct.id]}, onSuccess );
    }

  }, [prevProduct]);

  return (
    <>
      <h1 className={styles.title}>RELATED ITEMS</h1>
      <div ref={relatedRef}>
        {showRelated && (
          <Suspense fallback={<div>Loading...</div>}>
            <ActionRows products={products} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default RelatedItems;
