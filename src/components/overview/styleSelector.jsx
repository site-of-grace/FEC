import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos, setSelectedstyle } from '../../store/overviewSlice';

const StyleSelector = (props) => {
  const { mainProduct, styles, mainPhotos, selectedStyle } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();



  const [checkMark, setCheckMark] = useState('');



  //This sets the checkMark Variable automatically at render w/ the first thumbnail on list
  useEffect(() => {
    if (styles.results === undefined) {
      dispatch(setSelectedstyle({}));
    } else {
      dispatch(setSelectedstyle(styles.results[0]));
      document.querySelector(`#checkMark-${styles.results[0].style_id}`).classList.remove('hideCheckMark');
      document.querySelector(`#checkMark-${styles.results[0].style_id}`).classList.add('showCheckMark');
    }
  }, [styles]);





  // onClick, perform price changes and assign checkMark variable to the selected thumbnail
  const thumbnailUpdate = (data) => {

    console.log('thumbnail update', data);
    //If clicking on the already selected thumbnail, do nothing.
    if (JSON.stringify(data) === JSON.stringify(checkMark)) {
      return;
    }

   //Removes the old checkmark from the 'current selected'
   document.querySelector(`#checkMark-${selectedStyle.style_id}`).classList.remove('showCheckMark');
   document.querySelector(`#checkMark-${selectedStyle.style_id}`).classList.add('hideCheckMark');



    //Changes the pages displayed style'
    document.getElementById('productStyle').innerText = data.name;

    //Saves the selected styles state in this component
    dispatch(setSelectedstyle(data));

    //Adds checkmark to the selected element
    document.querySelector(`#checkMark-${data.style_id}`).classList.remove('hideCheckMark');
    document.querySelector(`#checkMark-${data.style_id}`).classList.add('showCheckMark');



    // If on sale, render the price a certain way, if not, render it this way.
    if (data.sale_price) {
      document.getElementById('productPrice').innerText = data.original_price;
      document.querySelector('#productPrice').classList.add('strikeThrough');
      document.getElementById('salePrice').innerText = data.sale_price;
      document.querySelector('#salePrice').classList.remove('hide');
    } else {
      document.getElementById('productPrice').classList.remove('strikeThrough');
      document.querySelector('#salePrice').classList.add('hide');
      document.getElementById('productPrice').innerText = data.original_price;
    }

    //Change the redux state so that the big display photo displays all the photos from the selected style
    dispatch(setMainPhotos(data.photos));
  };

  return (Object.keys(styles).length) ? (
    <div>
       <div id='productStyle' onClick={ () => { console.log(selectedStyle); }} >{styles.results[0].name}</div>
      <div>
        <ul id='styleSelector'>
          {styles.results.map((styles) => {
            return <div className='container' key={`key-${styles.style_id}`}>
              <li onClick={() => {thumbnailUpdate(styles);}} className='thumbnailStyle'>
                <img className='styles' src={`${styles.photos[0].thumbnail_url}`}></img>
                <img id={`checkMark-${styles.style_id}`} className='hideCheckMark' src='./icons/checkmark.jpeg'></img>
              </li>
            </div>;
          })}
        </ul>
      </div>
    </div>
  ) : '';
};


export default StyleSelector;