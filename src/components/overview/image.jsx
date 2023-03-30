import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles } from '../../store/overviewSlice';
import { RxCaretUp, RxCaretDown, RxCaretRight, RxCaretLeft } from "react-icons/rx";





const ImageGallery = (props) => {
  const { mainProduct, styles, mainPhotos } = useSelector((state) => state.overview); // store.slice

  useEffect(() => {
    if (mainPhotos[0] !== undefined) {
      setMain(mainPhotos[0].url);
    }
  }, [mainPhotos]);


  const [main, setMain] = useState('');


  useEffect(() => {
    if (main.length !== 0) {

      props.setExpandedMain(main);
      document.getElementById(main).scrollIntoView({behavior: 'smooth', block: 'end'});

    }
  }, [main]);




  var backButton = () => {
    if (main === mainPhotos[0].url) {
      return;
    }
    for (var i = 0; i < mainPhotos.length; i++) {
      if (mainPhotos[i].url === main) {
        setMain(mainPhotos[i - 1].url);
        return;
      }
    }
  };



  var fowardButton = () => {
    if (main === mainPhotos[mainPhotos.length - 1].url) {
      return;
    }
    for (var i = 0; i < mainPhotos.length; i++) {
      if (mainPhotos[i].url === main) {
        setMain(mainPhotos[i + 1].url);
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
           <div id='upButton' className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => { document.getElementById('imageGallery').scrollBy(0, -74)}}><RxCaretUp size={30}/></div>
            <div id='imageGallery'>
              {mainPhotos.map((photo) => {
                return <div onClick={() => { setMain(photo.url); }} key={photo.url} value='test'>
                  <img className='imageGalleryItem' src={photo.url}></img>
                  <div className='selectorSpace'>
                    <div id={photo.url} className={(main === photo.url) ? 'show selectColor' : 'hide selectColor'}></div>
                  </div>
                  </div>;
              })}
            </div>
            <div id='downButton'  className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => { document.getElementById('imageGallery').scrollBy(0, 74) }}><RxCaretDown size={30}/></div>
          </div>

      <div id='mainPhoto'>
        <div className='backward_button'>
          <div id='backButton' className={(mainPhotos[0].url === main) ? 'hide' : ''} onClick={backButton}><RxCaretLeft size={50}/></div>
        </div>
        <div id='photo_container'>
          <img id='thePhoto' src={main} onClick={() => {showExpanded();}}></img>
        </div>

        <div className='foward_button'>
          <div id='forwardButton' className={(mainPhotos[mainPhotos.length - 1].url === main) ? 'hide' : ''} onClick={fowardButton}><RxCaretRight size={50}/></div>
        </div>
      </div>
    </div>
  ) : '';
};


export default ImageGallery;