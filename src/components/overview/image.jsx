import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles } from '../../store/overviewSlice';

const ImageGallery = () => {
  const { mainProduct, styles, mainPhotos } = useSelector((state) => state.overview); // store.slice



  const [main, setMain] = useState('');



  return (mainPhotos.length !== 0) ? (
    <div id='test'>
        <div id='gallery'>
          <ul id='imageGallery'>
            {mainPhotos.map((photo) => {
              return <li onClick={() => { console.log(styles); }} key={photo.thumbnail_url} ><img className='imageGalleryItem' src={photo.thumbnail_url}></img></li>
            })}
          </ul>
        </div>

      <div id='mainPhoto'>
        <img src={mainPhotos[0].thumbnail_url}></img>
      </div>
    </div>
  ) : '';
};


export default ImageGallery;