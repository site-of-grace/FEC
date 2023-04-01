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
    <div id='Small_Gallery_Scroll_Down' className={(zoom) ? 'hide' : 'show'}>
      <div id='up_Button' className={(mainPhotos.length <= 7) ? 'hide' : ''} onClick={() => { document.getElementById('Small_Gallery_Container').scrollBy(0, -65)}}><RxCaretUp size={30}/></div>
      <div id='Small_Gallery_Container'>
        {mainPhotos.map((photos) => {
          return (<div className='Small_Thumbnail_Container'>
            <img className='Small_Thumbnail' src={photos.url} onClick={() => {showSelected(photos.url)}}></img>
            <div id={photos.url} className='hide selectColor' ></div>
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
        <div onClick={() => {props.setExpandedView(false)}}><GrClose size={20} /></div>
      </div>
    </div>
  ) : '');
};

export default ExpandedView;