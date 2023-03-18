import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos, setSelectedstyle, setMyOutfit } from '../../store/overviewSlice';
var axios = require('axios');

const Cart = () => {
  const { mainProduct, styles, mainPhotos, selectedStyle, myOutfit } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();


  //quantity list is one number but our function takes it and loops it.
  const [quantityList, setQuantityList] = useState(0);

  //Size and Quantity are for users to save data to add to cart
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);


  /*
    Everytime a new style gets selected, we are going to..
    1. set the quantityList to 0 (This disables a few elements on the page)
    2. disable the quality drop down (until a size is selected)
    3. setSize to '' - this is whats going to get sent to the api cart
    4. setQuantity to 1 normally (anything that is 0 will not show)
  */
  useEffect(() => {
    setQuantityList(0);
    document.getElementById('quantitySelect').setAttribute('disabled', '');
    setSize('');
    setQuantity(1);
  }, [selectedStyle]);


  /*
  Function for danny for carousol
  */
  const selectOutfit = () => {
    var outfit = {
      product: mainProduct,
      style: selectedStyle
    };
    dispatch(setMyOutfit(outfit));
  };



  //This is going to loop through the selectedStyles 'sku' property and create the drop down for Select Size
  //Ignores sizes that have quantity of 0
  //If all sizes have 0 quantity, return out of stock tag
  var sizeDropDown = (skuObject) => {
    var resultArray = [];
      for (var sku in skuObject) {
        if (skuObject[sku].quantity !== 0) {
          resultArray.push(<option value={`${sku}-${skuObject[sku].quantity}`}>{skuObject[sku].size}</option>);
        }
      }
      if (resultArray.length === 0) {
        document.getElementById('defaultSelect').innerText = 'OUT OF STOCK';
        document.getElementById('skuSelect').setAttribute('disabled', '');
        document.getElementById('hideButton').classList.add('hide');
      } else {
        return resultArray;
      }
  };

  //Once someone selects a size..
    //get the sku number, the size
    //close the size drop down
    //remove any warnings if they have some.
  var selectedSize = () => {
    var sizeTag = document.getElementById('skuSelect');

    var skuNumber = sizeTag.value.split('-')[0]; //EX: 71628
    var skuSize = sizeTag.value.split('-')[1]; //EX: XS

    setQuantityList(skuSize);
    setSize(skuNumber);
    sizeTag.blur();

    document.getElementById('selectSizeWarning').classList.remove('showWarning');
    document.getElementById('selectSizeWarning').classList.add('hideWarning');
  };




  //Once quantityList is loaded from selectedSize (once someone selects a size)
  //Remove the disabled part of the quantity drop down and generate some options for it.
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

  //Once a quantity has been selected, set it to a state, and close the quantity drop down.
  var selectedQuantity = () => {
    setQuantity(document.getElementById('quantitySelect').value);
    document.getElementById('quantitySelect').blur();
  };

  //When checkout buttons is clicked.
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
              <select id='skuSelect' name='size' onFocus={(e)=>{ Object.keys(selectedStyle.skus).length ? e.target.size=document.getElementById("skuSelect").options.length - 1 : null}}  onBlur={(e)=>{e.target.size='0'}} className='dropDown' onChange={() => { selectedSize(); }}>
                { !quantityList ? <option id='defaultSelect' value="none" selected disabled hidden>SELECT SIZE</option> : null}
                {selectedStyle.skus ? sizeDropDown(selectedStyle.skus) : null}
              </select>
          </div>

          <div id='quantitySelector'>
            <select id='quantitySelect' name='quantitytest' onFocus={(e) => { quantityList ? e.target.size=quantityList : null}} onBlur={(e)=>{e.target.size='0'}} className='dropDown' disabled='disabled' onChange={() => { selectedQuantity(); }}>
              {quantityList ? quantityDropDown() :  <option value="none" selected disabled hidden>-</option>}
            </select>
          </div>
      </div>

      <div className='cart'>
        <div id='addToBag'>
          <div id='hideButton' onClick={() => { checkOut(); }}>
            <label htmlFor='skuSelect'>
              <span>ADD TO BAG</span>
              <span id='plusSign'>+</span>
            </label>
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