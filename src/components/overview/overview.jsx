import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
import ExpandedView from './expandedView.jsx';
var axios = require('axios');

const Overview = () => {
  const { mainProduct, styles, mainPhotos, products } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();

  const [expandedView, setExpandedView] = useState(false);
  const [expandedMain, setExpandedMain] = useState('');

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
        {!expandedView ? (<div id='overview2-3'>
          <ImageGallery setExpandedView={setExpandedView} setExpandedMain={setExpandedMain}/>
        </div>) : ''}
        {!expandedView ? (<div id='overview1-3'>
          <ProductInformation />
        </div>) : ''}
        {expandedView ? <div id='overviewExpand'>
          <ExpandedView setExpandedView={setExpandedView} expandedMain={expandedMain}/>
        </div> : ''}
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