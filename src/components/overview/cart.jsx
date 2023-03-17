import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos, setSelectedstyle, setMyOutfit } from '../../store/overviewSlice';
var axios = require('axios');

const Cart = () => {
  const { mainProduct, styles, mainPhotos, selectedStyle, myOutfit } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();


  const [sizeList, setSizeList] = useState(1);
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


      var skuDropDown = skus.map((sku) => {

        console.log(skuObject[sku].size);
        if (skuObject[sku].quantity !== 0) {
          return <option value={`${sku}-${skuObject[sku].quantity}`}>{skuObject[sku].size}</option>
        }
      });

      console.log(skuDropDown, '<----');


      var resultArray = [];

      for (var i = 0; i < skuDropDown.length; i++) {
        if (skuDropDown[i] !== undefined) {
          resultArray.push(skuDropDown[i]);
        }
      }

      console.log(resultArray, '<---- resultarray')


      if (resultArray.length === 0) {
        document.getElementById('tester').innerText = 'OUT OF STOCK';
        document.getElementById('skuSelect').setAttribute('disabled', '');
        document.getElementById('hideButton').classList.add('hide');
      } else {
        return resultArray;
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
    var skuNumber = sizeTag.value.split('-')[0];
    var skuSize = sizeTag.value.split('-')[1];

    setQuantityList(skuSize);
    setSize(skuNumber);

    sizeTag.blur();
    document.getElementById('selectSizeWarning').classList.remove('showWarning');
    document.getElementById('selectSizeWarning').classList.add('hideWarning');
  };

  var checkOut = () => {
    if (document.getElementById('skuSelect').value === 'none') {
      document.getElementById('skuSelect').focus();
      document.getElementById('selectSizeWarning').classList.remove('hideWarning');
      document.getElementById('selectSizeWarning').classList.add('showWarning');
    } else {
      console.log('SKUNUMBER', size, 'QUANTITY', quantity);
      axios.post('/cart', {sku_id: Number(size), count: quantity.toString()})
        .then((data) => {
         if (!data) {
          throw data;
         }
         console.log('SUCCESSFUL POST REQUEST TO CART');
        })
        .catch((error) => {
          console.log('SUCCESSFUL POST REQUEST TO CART', error);
        });
    }

  };

  var testing = {
    2580526: {quantity: 0, size: 'XS'},
    2580527: {quantity: 0, size: 'S'},
    2580528: {quantity: 0, size: 'M'},
    2580529: {quantity: 0, size: 'L'},
    2580530: {quantity: 0, size: 'XL'},
    2580531: {quantity: 0, size: 'XXL'}
  };

  //testing to see if empty stock works
  // dispatch(setSelectedstyle({skus: testing}))

  return (
    <div>
      <h1 onClick={() => { dispatch(setSelectedstyle({skus: testing})) }}>CART</h1>

      <div id='selectSizeWarning' className='hideWarning' >PLEASE SELECT SIZE</div>
      <div className='cart'>
        <div id='sizeSelector'>
              <select id='skuSelect'name='size' onFocus={(e)=>{ Object.keys(selectedStyle.skus).length ? e.target.size=document.getElementById("skuSelect").options.length - 1 : null}}  onBlur={(e)=>{e.target.size='0'}} className='dropDown' onChange={() => { selectedSize(); }}>
                { !quantityList ? <option id='tester' value="none" selected disabled hidden>SELECT SIZE</option> : null}
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
          <div id='hideButton'>
            <label htmlFor='skuSelect'>ADD TO BAG</label>
            <button id='checkOutButton' name='add' onClick={() => { checkOut(); }}>+</button>
          </div>
        </div>

        <div id='favorite'>
          <button onClick={() => {selectOutfit();}} id='favoriteButton'>☆</button>
        </div>
      </div>
    </div>
  );
};


export default Cart;