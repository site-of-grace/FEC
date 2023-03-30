import React, { useEffect, useState } from 'react';
import StyleSelector from './styleSelector.jsx';
import Cart from './cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import Stars from '../general/Stars.jsx';

const ProductInformation = (props) => {


  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice

  const { average, ratingMeta, reviews } = useSelector((state) => state.rating); // store.slice
  const dispatch = useDispatch();






  return (
    <div style={{width: '100%'}}>
      <div id='Overview-Rating-Review'>
        <div id='Overview-Rating'>{Stars({number: average})}</div>
        <div id='Overview-Review'>{(average !== 0) ? <a href='#rating-main'>Read all reviews</a> : ''}</div>
      </div>
      <div id='Overview-Product-Info'>
        <div>{mainProduct.category}</div>
        <div>{mainProduct.name}</div>
        <span id='productPrice'>{mainProduct.default_price}</span>
        <span id='salePrice'></span>
      </div>
        <StyleSelector />
        <div id='mainCart'>
          <Cart />
        </div>
    </div>
  );
};

export default ProductInformation;