import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';

const StyleSelector = (props) => {
  const { mainProduct, styles, mainPhotos } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();


const thumbnailUpdate = (data) => {




  document.getElementById('productStyle').innerText = data.name;

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

  dispatch(setMainPhotos(data.photos));
};








  return (Object.keys(styles).length) ? (
    <div>
       <div id='productStyle'>{styles.results[0].name}</div>
      <div>
        <ul id='styleSelector'>
          {styles.results.map((styles) => {
            return <li onClick={() => {thumbnailUpdate(styles);}} className='thumbnailStyle' key={styles.styles_id}><img className='styles' src={`${styles.photos[0].thumbnail_url}`}></img></li>
          })}
        </ul>
      </div>
    </div>
  ) : '';
};


export default StyleSelector;