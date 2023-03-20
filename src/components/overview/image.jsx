import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles } from '../../store/overviewSlice';

const ImageGallery = () => {
  const { mainProduct, styles, mainPhotos } = useSelector((state) => state.overview); // store.slice

  useEffect(() => {
    if (mainPhotos[0] !== undefined) {
      setMain(mainPhotos[0].thumbnail_url);
    }
  }, [mainPhotos]);






  const [main, setMain] = useState('');

  useEffect(() => {
    if (main.length !== 0) {
      var mainSelectShow = document.getElementById(main).getElementsByTagName('div')[1];
      mainSelectShow.classList.remove('hide');
      mainSelectShow.classList.add('show');
    }
  }, [main]);


  var thumbnailSelect = (url) => {

    var selectedPic = document.getElementById(url).getElementsByTagName('div')[1];
    var previousPic = document.getElementById(main).getElementsByTagName('div')[1];
    previousPic.classList.remove('show');
    previousPic.classList.add('hide');
    setMain(url);
    selectedPic.classList.remove('hide');
    selectedPic.classList.add('show');
  };


  var backButton = () => {
    var list = document.getElementById('imageGallery');
    var items = list.getElementsByTagName('li');
    var firstUrl = items[0].getElementsByTagName('img')[0].currentSrc;

    if (main === firstUrl) {
      return;
    }

    for (var i = 0; i < items.length; i++) {
      var url = items[i].getElementsByTagName('img')[0].currentSrc;
      var previousUrl = '';

      if (i !== 0) {
        previousUrl = items[i - 1].getElementsByTagName('img')[0].currentSrc;
      }
      if (url === main) {
        thumbnailSelect(previousUrl);
        document.getElementById(previousUrl).scrollIntoView({behavior: 'smooth', block: 'end'});
        return;
      }
    }
  };




  var fowardButton = () => {
    var list = document.getElementById('imageGallery');
    var items = list.getElementsByTagName('li');
    var lastUrl = items[items.length - 1].getElementsByTagName('img')[0].currentSrc;

    if (main === lastUrl) {
      return;
    }
    for (var i = 0; i < items.length; i++) {
      var url = items[i].getElementsByTagName('img')[0].currentSrc;
      var nextUrl = items[i + 1].getElementsByTagName('img')[0].currentSrc;
      if (url === main) {
       thumbnailSelect(nextUrl);
       document.getElementById(nextUrl).scrollIntoView({behavior: 'smooth', block: 'end'});
        return;
      }
    }
  };


  return (mainPhotos.length !== 0) ? (
    <div id='test'>
        <div id='gallery'>
          <ul id='imageGallery'>
            {mainPhotos.map((photo) => {

              return <li id={photo.thumbnail_url} onClick={() => { thumbnailSelect(photo.thumbnail_url); }} key={photo.thumbnail_url} value='test'>
                <img className='imageGalleryItem' src={photo.thumbnail_url}></img>
                <div className='selectorSpace'>
                  <div className='hide'>selected</div>
                </div>
                </li>;
            })}

          </ul>
        </div>
      <div id='mainPhoto'>
        <button onClick={backButton}>backward</button>
        <img id='thePhoto' src={main}></img>
        <button onClick={fowardButton}>forward</button>
      </div>
    </div>
  ) : '';
};


export default ImageGallery;