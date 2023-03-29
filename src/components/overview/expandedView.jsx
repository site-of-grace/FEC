import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import { AiOutlineLine } from "react-icons/ai";

const ExpandedView = (props) => {

  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();



  const [mainZoomPhoto, setMainZoomPhoto] = useState(props.expandedMain);
  const [position, setPosition] = useState('0% 0%');
  const [style, setStyle] = useState({
    'background-size': '300%',
    backgroundImage: `url(${mainZoomPhoto})`,
    backgroundPosition: position
  });
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.getElementById(mainZoomPhoto).classList.remove('hide');
    document.getElementById(mainZoomPhoto).classList.add('show');
    document.getElementById(mainZoomPhoto).scrollIntoView({behavior: 'smooth', block: 'end'});
  }, [mainZoomPhoto]);


  var handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
   setStyle({
    'background-size': 'scale(2.5)',
    backgroundImage: `url(${mainZoomPhoto})`,
    backgroundPosition: `${x}% ${y}%`
  });
  };

  const zoomie = () => {
    if (zoom) {
      setZoom(false);
      document.getElementById('expandMain').classList.remove('hide');
      document.getElementById('expandMain').classList.add('show');
      document.getElementById('Small_Gallery_Scroll_Down').classList.remove('hide');
      document.getElementById('Small_Gallery_Scroll_Down').classList.add('show');
      document.getElementById('closeButton').classList.remove('hide');
      document.getElementById('closeButton').classList.add('show');
    } else {
      setZoom(true);
      setStyle({
        'background-size': '300%',
        backgroundImage: `url(${mainZoomPhoto})`,
        backgroundPosition: '0% 0%'
      });
      document.getElementById('expandMain').classList.remove('show');
      document.getElementById('expandMain').classList.add('hide');
      document.getElementById('Small_Gallery_Scroll_Down').classList.remove('show');
      document.getElementById('Small_Gallery_Scroll_Down').classList.add('hide');
      document.getElementById('closeButton').classList.remove('show');
      document.getElementById('closeButton').classList.add('hide');
    }

  };

  const showSelected = (id) => {
    document.getElementById(mainZoomPhoto).classList.remove('show');
    document.getElementById(mainZoomPhoto).classList.add('hide');
    setMainZoomPhoto(id);
  };


  var backButton = () => {
    if (mainZoomPhoto === mainPhotos[0].url) {
      return;
    }
    for (var i = 0; i < mainPhotos.length; i++) {
      if (mainPhotos[i].url === mainZoomPhoto) {
        showSelected(mainPhotos[i - 1].url);
        return;
      }
    }
  };

  var fowardButton = () => {
    if (mainZoomPhoto === mainPhotos[mainPhotos.length - 1].url) {
      return;
    }
    for (var i = 0; i < mainPhotos.length; i++) {
      if (mainPhotos[i].url === mainZoomPhoto) {
        showSelected(mainPhotos[i + 1].url);
        return;
      }
    }
  };



  return (
    <div id='popup' onClick={(zoom) ? zoomie : null} onMouseMove={(zoom) ? (handleMouseMove) : null} style={(zoom) ? (style) : null}>



    <div id='Small_Gallery_Scroll_Down'>
      <button id='up_Button' className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => {document.getElementById('Small_Gallery_Container').scrollBy(0, -65)}} >up</button>
      <div id='Small_Gallery_Container'>
        {mainPhotos.map((photos) => {
          return (<div className='Small_Thumbnail_Container'>
            <img className='Small_Thumbnail' src={photos.url} onClick={() => {showSelected(photos.url)}}></img>
            <div id={photos.url} className='hide selectColor' ></div>
          </div>);
        })}
      </div>
      <button id='down_Button' className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => {document.getElementById('Small_Gallery_Container').scrollBy(0, 65)}} >down</button>
    </div>


      <div id='expandMain'>
        <div id='expandContainer'>
        <div className='back-foward-button'>
          <button onClick={() => {backButton()}}>backward</button>
        </div>



        <div id='Expanded_Photo_Container'>
          <figure onClick={() => {zoomie();}} style={{display: 'inline-block'}}>
            <img id='expandedPhoto'src={mainZoomPhoto}></img>
          </figure>
        </div>

        <div className='back-foward-button'>
          <button onClick={() => {fowardButton()}}>foward</button>
        </div>
      </div>

    </div>

      <div id='closeButton'>
        <button onClick={() => {props.setExpandedView(false)}}>close page</button>
      </div>
    </div>
  );
};

export default ExpandedView;