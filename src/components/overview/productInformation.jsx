import React, { useEffect, useState } from 'react';
import StyleSelector from './styleSelector.jsx';
import Cart from './cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct } from '../../store/overviewSlice';
var axios = require('axios');

const ProductInformation = (props) => {

  const { mainProduct } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();



  return (
    <div>
      <h1>PRODUCT INFORMATION</h1>
      <div><b>STAR RATING</b></div>
      <div><b>PRODUCT CATEGORY</b></div>
      <div>{mainProduct.category}</div>
      <div><b>PRODUCT TITLE</b></div>
      <div>{mainProduct.name}</div>1
      <div><b>PRODUCT PRICE</b></div>
      <span id='productPrice'>{mainProduct.default_price}</span>
      <span id='salePrice'></span>
      <StyleSelector />
      <Cart />
    </div>
  );
};

export default ProductInformation;