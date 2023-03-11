import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos, setSelectedstyle, setMyOutfit } from '../../store/overviewSlice';


const Cart = () => {
  const { mainProduct, styles, mainPhotos, selectedStyle, myOutfit } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();



  const selectOutfit = () => {
    var outfit = {
      product: mainProduct,
      style: selectedStyle
    };

    dispatch(setMyOutfit(outfit));
  };



  return (
    <div>
      <h1 onClick={() => { console.log(myOutfit); }}>CART</h1>

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
          <button onClick={() => {selectOutfit();}} id='favoriteButton'>☆</button>
        </div>
      </div>
    </div>
  );
};


export default Cart;