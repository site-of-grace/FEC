import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles } from '../../store/overviewSlice';

const ImageGallery = (props) => {
  const { mainProduct, styles, mainPhotos } = useSelector((state) => state.overview); // store.slice

  useEffect(() => {
    if (mainPhotos[0] !== undefined) {
      setMain(mainPhotos[0].thumbnail_url);
    }
  }, [mainPhotos]);





  const [main, setMain] = useState('');





  useEffect(() => {
    if (main.length !== 0) {

      props.setExpandedMain(main);

      var mainSelectShow = document.getElementById(main).getElementsByTagName('div')[1];
      mainSelectShow.classList.remove('hide');
      mainSelectShow.classList.add('show');

      var list = document.getElementById('imageGallery');
      var items = list.getElementsByTagName('li');
      var firstUrl = items[0].getElementsByTagName('img')[0].currentSrc;
      var lastUrl = items[items.length - 1].getElementsByTagName('img')[0].currentSrc;

      if (items.length > 7) {
        document.getElementById('upButton').classList.remove('hide');
        document.getElementById('upButton').classList.add('show');
        document.getElementById('downButton').classList.remove('hide');
        document.getElementById('downButton').classList.add('show');
      } else {
        document.getElementById('upButton').classList.remove('show');
        document.getElementById('upButton').classList.add('hide');
        document.getElementById('downButton').classList.remove('show');
        document.getElementById('downButton').classList.add('hide');
      }

      if (main === firstUrl) {
        document.getElementById('backButton').classList.remove('show');
        document.getElementById('backButton').classList.add('hide');
      } else {
        document.getElementById('backButton').classList.remove('hide');
        document.getElementById('backButton').classList.add('show');
      }

      if (main === lastUrl) {
        document.getElementById('forwardButton').classList.remove('show');
        document.getElementById('forwardButton').classList.add('hide');
      } else {
        document.getElementById('forwardButton').classList.add('hide');
        document.getElementById('forwardButton').classList.add('show');
      }
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



  var showExpanded = () => {


    props.setExpandedView(true);
  };




  return (mainPhotos.length !== 0) ? (
    <div id='test'>



        <div id='gallery'>
          <button id='upButton' className='hide' onClick={() => { console.log(main), document.getElementById('imageGallery').scrollBy(0, -115)}}> UP </button>
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
            <button id='downButton' className='hide'  onClick={() => { document.getElementById('imageGallery').scrollBy(0, 115) }}> DOWN </button>
          </div>

      <div id='mainPhoto'>

        <div className='backward-button'>
          <button id='backButton' onClick={backButton}>backward</button>
        </div>

        <img id='thePhoto' src={main} onClick={() => {showExpanded();}}></img>

        <div className='forward-button'>
          <button id='forwardButton' onClick={fowardButton}>forward</button>
        </div>
      </div>
    </div>
  ) : '';
};


export default ImageGallery;