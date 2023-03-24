import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
var axios = require('axios');

const Overview = () => {
  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();


  useEffect(() => {
    axios
      .get('/initialRender')
        .then((productInfo) => {
          if (!productInfo) {
            throw productInfo;
          }
          // console.log('----successful productinfo -->', productInfo.data);
          dispatch(setMainProduct(productInfo.data));
          return productInfo.data.id;
        })
        .catch((error) => {
          console.log('error in setting initial product data', error);
        });

  }, []);



useEffect(() => {

  console.log('main product', mainProduct.rating);

  if (Object.keys(mainProduct).length !== -1) {


    axios
    .get(`/productStyles?id=${mainProduct.id}`)
      .then((productStyles) => {
        if (!productStyles) {
          throw productStyles;
        }
        console.log(productStyles);

        dispatch(setStyles(productStyles.data));
        dispatch(setMainPhotos(productStyles.data.results[0].photos));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}, [mainProduct]);





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
          <div>{mainProduct.slogan}</div>
          <div>{mainProduct.description}</div>
        </div>
        <div id='features'>
          <ul>
          {mainProduct.features ? mainProduct.features.map((feature) => {
            return <li><b>{feature.feature}: </b>{feature.value}</li>
          }) : null}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Overview;