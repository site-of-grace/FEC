import React from 'react';
import StyleSelector from './styleSelector.jsx';
import Cart from './cart.jsx';


const ProductInformation = (props) => {

  return (
    <div>
      <h1>PRODUCT INFORMATION</h1>
      <div>STAR RATING</div>
      <div>PRODUCT CATEGORY</div>
      <div>PRODUCT TITLE</div>
      <div>PRODUCT PRICE</div>
      <div>PRODUCT OVERVIEW</div>
      <StyleSelector />
      <Cart />
    </div>
  )
}

export default ProductInformation;