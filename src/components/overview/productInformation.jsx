import React, { useEffect, useState } from 'react';
import StyleSelector from './styleSelector.jsx';
import Cart from './cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import Stars from '../general/Stars.jsx';

const ProductInformation = (props) => {


  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice

  const { average } = useSelector((state) => state.rating); // store.slice
  const dispatch = useDispatch();



  return (
    <div>
      <h1 onClick={() => {console.log(average)}}>PRODUCT INFORMATION</h1>
      <div><b>STAR RATING</b></div>
      <div>{ (Number(average) ? Stars({number: average}) : '')}</div>
      <div><b>PRODUCT CATEGORY</b></div>
      <div>{mainProduct.category}</div>
      <div><b>PRODUCT TITLE</b></div>
      <div>{mainProduct.name}</div>
      <div><b>PRODUCT PRICE</b></div>
      <span id='productPrice'>{mainProduct.default_price}</span>
      <span id='salePrice'></span>
      <StyleSelector />
      <Cart />
    </div>
  );
};

export default ProductInformation;