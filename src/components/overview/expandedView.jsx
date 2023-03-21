import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';

const ExpandedView = (props) => {

  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();



  var closeExpanded = () => {
    document.getElementById('skuSelect').classList.add('dropDown');
    document.getElementById('quantitySelect').classList.add('dropDown');
    props.close(false);
  };





  return (props.render ? (
    <div id='popup'>
      <div id='popUpBox'>
        <button onClick={() => {props.backward();}}></button>
        <img id='expandedPhoto' src={props.mainPhoto}></img>
        <button onClick={() => {props.forward();}}></button>
        <button id='close' onClick={() => {closeExpanded();}}>close page</button>
      </div>
    </div>
  ) : '');
};

export default ExpandedView;