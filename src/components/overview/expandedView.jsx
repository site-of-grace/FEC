import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';

const ExpandedView = (props) => {

  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();

  var mainPhoto = props.expandedMain; // url

  const [backgroundImage, setBackgroundImage] = useState(mainPhoto);
  const [position, setPosition] = useState('0% 0%');
  const [style, setStyle] = useState({
    'background-size': '300%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: position
  });

  const [zoom, setZoom] = useState(false);

  var handleMouseMove = e => {

    console.log('hi', style);

    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 120;
    const y = (e.pageY - top) / height * 120;
   setStyle({
    'background-size': 'scale(2.5)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: `${x}% ${y}%`
  });
  };




  const zoomie = () => {

    if (zoom) {
      document.getElementById('popup').setAttribute('disable', '');
    } else {
      document.getElementById('popup').setAttribute('disable', '');

      setZoom(true);
    }


  };



  return (
    <div id='popup'>

      <figure onClick={() => {zoomie();}}>
        <img id='expandedPhoto'src={props.expandedMain}></img>
      </figure>





      <div id='buttons'>
        <button onClick={() => {props.setExpandedView(false)}}>close page</button>
        <button onClick={() => {}}>backward</button>
        <button onClick={() => {}}>foward</button>
      </div>
    </div>
  );
};

export default ExpandedView;