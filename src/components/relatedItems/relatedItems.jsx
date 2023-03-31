import React, { lazy, useState, Suspense, useEffect, useRef } from 'react';
import manualSWR, { fetcher } from '../../utils/fetchers';
import { useDispatch, useSelector } from 'react-redux';
import { setOutfits } from '../../store/overviewSlice';
import { setProducts, addToCache } from '../../store/productSlice';
import styles from './styles.module.css';
const ActionRows = lazy(() => import('./ActionRows.jsx'));

const RelatedItems = () => {
  const dispatch = useDispatch();
  const { products, cacheArray } = useSelector(state => state.products);
  const { myOutfit, mainProduct, prevProduct } = useSelector(state => state.overview);
  const [showRelated, setShowRelated] = useState(false);
  const relatedRef = useRef();
  const onSuccess = data => {
    console.log('related api call res', data);
    const products = data;
    if (prevProduct?.id) {
      products.push({ ...prevProduct, mainProduct: mainProduct.id });
    }
    const productsString = JSON.stringify(products);
    if (!products) {
      return;
    }
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

    const savedProducts = JSON.parse(localStorage.getItem('products'));
    const cachedMainProduct = JSON.parse(localStorage.getItem('mainProduct'));

    function initialCacheMatch(saved, main) {
      console.log('savedProducts', saved, main);
      if (!main) {
        return false;
      }

      const result = saved.some(product => product.mainProduct === main.id);
      console.log('savedProducts result', result);
      return result;
    }

    if (savedProducts && initialCacheMatch(savedProducts, cachedMainProduct)) {
      console.log('$$$ cache money $$$');
      dispatch(setProducts(savedProducts));
    } else {
      console.log('no cache or mainProduct.id changed');
      trigger();
    }

    const savedOutfits = localStorage.getItem('outfits');
    if (savedOutfits) {
      const outfits = JSON.parse(savedOutfits);
      dispatch(setOutfits(outfits));
    } else {
      localStorage.setItem('outfits', JSON.stringify(myOutfit));
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem('outfits', JSON.stringify(myOutfit));
  }, [myOutfit]);

  useEffect(() => {
    dispatch(addToCache(mainProduct));
    const cachedMainProduct = JSON.parse(localStorage.getItem('mainProduct'));
    if (!cachedMainProduct && mainProduct.validPhotos) {
      localStorage.setItem('mainProduct', JSON.stringify(mainProduct));
    }
  }, [mainProduct.validPhotos]);

  useEffect(() => {
    if (prevProduct?.id) {
      fetcher(
        '/related?id=' + mainProduct.id,
        { cache: [...cacheArray, prevProduct.id] },
        onSuccess
      );
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
