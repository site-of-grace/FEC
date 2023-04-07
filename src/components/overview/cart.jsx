import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos, setSelectedstyle, setMyOutfit } from '../../store/overviewSlice';
var axios = require('axios');

const Cart = (props) => {
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
    // var outfit = {
    //   product: mainProduct,
    //   style: selectedStyle
    // };
    dispatch(setMyOutfit(mainProduct));
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



    if (Number(skuSize) > 15) {
      setQuantityList(15);
    } else {
      setQuantityList(Number(skuSize));
    }

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


      for (var j = 1; j <= quantityList; j++) {
        resultArray.push(j);
      }
      return resultArray.map((quantity) => {
        return <option>{quantity}</option>
      });
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
      var newQuantity = (props.cart + Number(quantity));
      props.setCart(newQuantity);
    }
  };


  return (
    <div>
      <div id='selectSizeWarning' className='hideWarning' >PLEASE SELECT SIZE</div>
      <div className='cart'>
        <div id='sizeSelector'>
              <select id='skuSelect' name='size' onFocus={(e)=>{ Object.keys(selectedStyle.skus).length ? e.target.size=document.getElementById("skuSelect").options.length - 1 : null}}  onBlur={(e)=>{e.target.size='0'}} className='dropDown' onChange={() => { selectedSize(); }}>
                { !quantityList ? <option id='defaultSelect' style={{'font-size': '14px', 'color': 'black'}} value="none" selected disabled hidden>SELECT SIZE</option> : null}
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

              <span style={{'font-size': '14px', 'color': 'black'}}>ADD TO BAG</span>
              <span id='plusSign'>+</span>

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