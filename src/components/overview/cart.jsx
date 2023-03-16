import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos, setSelectedstyle, setMyOutfit } from '../../store/overviewSlice';


const Cart = () => {
  const { mainProduct, styles, mainPhotos, selectedStyle, myOutfit } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();



  const [quantityList, setQuantityList] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);







  useEffect(() => {
    setQuantityList(0);
    document.getElementById('quantitySelect').setAttribute('disabled', '');
    setSize('');
    setQuantity(1);
  }, [selectedStyle]);


  const selectOutfit = () => {
    var outfit = {
      product: mainProduct,
      style: selectedStyle
    };
    dispatch(setMyOutfit(outfit));
  };


  var sizeDropDown = (skuObject) => {
    var skus = Object.keys(skuObject);
    if (skus.length === 0) {
      document.getElementById('skuSelect').setAttribute('disabled', '');
      return <option value="none" selected disabled hidden>OUT OF STOCK</option>
    } else {
      return skus.map((sku) => {
        return <option value={skuObject[sku].quantity}>{skuObject[sku].size}</option>
      });
    }
  };


  var quantityDropDown = () => {
    document.getElementById('quantitySelect').removeAttribute('disabled');

    var resultArray = [];

    if (quantityList >= 15) {
      // do this loop to 15
      for (var i = 1; i <= 15; i++) {
        resultArray.push(i);
      }
      return resultArray.map((quantity) => {
        return <option>{quantity}</option>
      });
    } else {
      for (var j = 1; j <= quantityList; j++) {
        resultArray.push(j);
      }
      return resultArray.map((quantity) => {
        return <option>{quantity}</option>
      });
    }
  };



  var selectedSize = () => {
    var sizeTag = document.getElementById('skuSelect');
    setQuantityList(sizeTag.value);
    setSize(sizeTag.options[sizeTag.selectedIndex].text);
    sizeTag.blur();
  };

  var checkOut = () => {
    if (document.getElementById('skuSelect').value === 'none') {
      //open drop down
      //message should appear above drop down stating please select size
      // document.querySelector('#skuSelect').classList.remove('dropDown');
      // console.log('hi');

      document.getElementById('skuSelect').focus();
      document.getElementById()
    }

  };


  return (
    <div>
      <h1 onClick={() => {console.log(Object.keys(selectedStyle.skus).length)}}>CART</h1>

      <div>PLEASE SELECT SIZE</div>
      <div className='cart'>
        <div id='sizeSelector'>
              <select id='skuSelect'name='size' onFocus={(e)=>{ Object.keys(selectedStyle.skus).length ? e.target.size=Object.keys(selectedStyle.skus).length : null}}  onBlur={(e)=>{e.target.size='0'}} className='dropDown' onChange={() => {selectedSize()}}>
                {!quantityList ? <option value="none" selected disabled hidden>SELECT SIZE</option> : null}

                {selectedStyle.skus ? sizeDropDown(selectedStyle.skus) : null}
              </select>
          </div>

          <div id='quantitySelector'>
            <select id='quantitySelect' name='quantitytest' onFocus={(e) => { quantityList ? e.target.size=quantityList : null}} onBlur={(e)=>{e.target.size='0'}} className='dropDown' disabled='disabled'
            onChange={() => {setQuantity(document.getElementById('quantitySelect').value), document.getElementById('quantitySelect').blur()}}>
              {quantityList ? quantityDropDown() :  <option value="none" selected disabled hidden>-</option>}
            </select>
          </div>
      </div>

      <div className='cart'>
        <div id='addToBag'>
          <label htmlFor='skuSelect'>ADD TO BAG</label>
          <button name='add' className='dropDown' onClick={() => {checkOut()}}>+</button>
        </div>

        <div id='favorite'>
          <button onClick={() => {selectOutfit();}} id='favoriteButton'>☆</button>
        </div>
      </div>
    </div>
  );
};


export default Cart;