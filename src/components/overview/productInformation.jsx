import React, { useEffect, useState } from 'react';
import StyleSelector from './styleSelector.jsx';
import Cart from './cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import Stars from '../general/Stars.jsx';

const ProductInformation = (props) => {


  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice

  const { average, ratingMeta, reviews, ratingMetaTotal } = useSelector((state) => state.rating); // store.slice
  const dispatch = useDispatch();


  //This will restart the strike through and sales price if the before product was on sale and we 'change' main product.
  useEffect(() => {
    document.querySelector('#productPrice').classList.remove('strikeThrough');
    document.getElementById('salePrice').innerText = '';
  }, [mainProduct]);


  return (
    <div id='productInformation'>
      <div id='Overview-Rating-Review'>
        <div id='Overview-Rating' onClick={() => {console.log(reviews)}}>{Stars({number: average})}</div>
        <div id='Overview-Review'>{(average !== 0) ? <a href='#Rating'>Read all&nbsp;{ratingMetaTotal}&nbsp;reviews</a> : ''}</div>
      </div>
      <div id='Overview-Product-Info'>
        <h3 style={{color: 'grey', 'margin-bottom': '-10px'}}>{mainProduct.category}</h3>
        <h1>{mainProduct.name}</h1>
        <span id='productPrice'>{mainProduct.default_price}</span>
        <span id='salePrice'></span>
      </div>
        <StyleSelector />
        <div id='Overview_Cart'>
          <Cart setCart={props.setCart} cart={props.cart}/>
        </div>
    </div>
  );
};

export default ProductInformation;