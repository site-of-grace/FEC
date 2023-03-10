import React from 'react';

const Cart = () => {

  return (
    <div>
      <h1>CART</h1>

      <div className='cart'>
        <div id='sizeSelector'>
            <label htmlFor='size'>SELECT SIZE</label>
              <select name='size' className='dropDown'></select>
          </div>

          <div id='quantitySelector'>
            <label htmlFor='quantity'>-</label>
            <select name='quantity' className='dropDown'></select>
          </div>
      </div>

      <div className='cart'>
        <div id='addToBag'>
          <label htmlFor='add'>ADD TO BAG</label>
          <button name='add' className='dropDown'>+</button>
        </div>
        <div id='favorite'>
          <button id='favoriteButton'>☆</button>
        </div>
      </div>
    </div>
  );
};


export default Cart;