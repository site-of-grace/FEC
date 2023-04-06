import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import { RxCaretUp, RxCaretDown, RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { GrClose } from "react-icons/gr";


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
    'background-size': '250%',
    backgroundImage: `url(${mainZoomPhoto})`,
    backgroundPosition: `${x}% ${y}%`,
    cursor: 'zoom-out'
  });
  };

  const zoomie = () => {
    if (zoom) {
      setZoom(false);
    } else {
      setZoom(true);
      setStyle({
        'background-size': '250%',
        backgroundImage: `url(${mainZoomPhoto})`,
        backgroundPosition: '0% 0%',
        cursor: 'zoom-out'
      });
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



    <div id='Small_Gallery_Scroll_Down' className={(zoom) ? 'hide' : 'show'}>
      <div id='up_Button' className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => { document.getElementById('Small_Gallery_Container').scrollBy(0, -65)}}><RxCaretUp size={30}/></div>
      <div id='Small_Gallery_Container'>
        {mainPhotos.map((photos) => {
          return (<div className='Small_Thumbnail_Container'>
            <img className='Small_Thumbnail' src={photos.thumbnail_url} onClick={() => {showSelected(photos.url)}}></img>
            <div id={photos.url} className='hide selectColor'></div>
          </div>);
        })}
      </div>
      <div id='down_Button' className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => {document.getElementById('Small_Gallery_Container').scrollBy(0, 65)}}><RxCaretDown size={30}/></div>
    </div>


      <div id='expandMain' className={(zoom) ? 'hide' : 'show'}>
        <div id='expandContainer'>
        <div className='backward_button'>
          <div className={(mainPhotos[0].url === mainZoomPhoto) ? 'hide' : 'show'} onClick={() => {backButton();}}><RxCaretLeft size={50}/></div>
        </div>

        <div id='Expanded_Photo_Container'>
          <figure onClick={() => {zoomie();}} style={{display: 'inline-block'}}>
            <img id='expandedPhoto'src={mainZoomPhoto}></img>
          </figure>
        </div>

        <div className='foward_button'>
          <div className={(mainPhotos[mainPhotos.length - 1].url === mainZoomPhoto) ? 'hide' : 'show'}onClick={() => {fowardButton();}}><RxCaretRight size={50}/></div>
        </div>
      </div>
    </div>

      <div id='closeButton' className={(zoom) ? 'hide' : 'show'}>
        <div onClick={() => {props.setExpandedView(false); props.setResetMain(true); }}><GrClose size={20} /></div>
      </div>
    </div>
  );
};

export default ExpandedView;