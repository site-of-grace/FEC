import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
var axios = require('axios');

const Overview = () => {
  const { mainProduct, styles, mainPhotos } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();


  useEffect(() => {
    // make axios
    // dispatch(setMessage('Hello FEC!'))
    // dispatch(setMessage('Hello FEC!'))
    axios
      .get('/initialRender')
        .then((productInfo) => {
          if (!productInfo) {
            throw productInfo;
          }
          console.log('----successful productinfo -->', productInfo.data);
          dispatch(setMainProduct(productInfo.data));
          return productInfo.data.id;
        })
        .then((id) => {
          if (!id) {
            throw id;
          }
          axios
            .get(`/productStyles?id=${id}`)
              .then((productStyles) => {
                if (!productStyles) {
                  throw productStyles;
                }
                console.log('------ product styles --->', productStyles.data);
                dispatch(setStyles(productStyles.data));
                dispatch(setMainPhotos(productStyles.data.results[0].photos));
              })
              .catch((error) => {
                console.log(error);
              });

        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  // const clickHandler = () => {
  //   dispatch(setMessage('Hello FEC!'))
  // }


  return (
    <div>
      <div id='overviewWidget'>
        <div id='overview2-3'>
          <ImageGallery />
        </div>
        <div id='overview1-3'>
          <ProductInformation />
        </div>
      </div>
      <div id='prodDescrip'>
        <div id='productSlogan'>
          <div>insert slogan here</div>
          <div>insert description here </div>
        </div>
        <div id='features'>
          <ul>
            <li onClick={() => { console.log(mainPhotos); }}>test1</li>
            <li>test2</li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Overview;