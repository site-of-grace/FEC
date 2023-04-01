import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
import ExpandedView from './expandedView.jsx';
var axios = require('axios');

const Overview = () => {
  const { mainProduct } = useSelector(state => state.overview); // store.slice
  const dispatch = useDispatch();

  const [expandedView, setExpandedView] = useState(false);
  const [expandedMain, setExpandedMain] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const cachedMainProduct = JSON.parse(localStorage.getItem('mainProduct'));
        if (cachedMainProduct) {
          dispatch(setMainProduct(cachedMainProduct));
        }

        const productInfo = await axios.get('/initialRender');
        if (!productInfo) {
          throw productInfo;
        }
        console.log('----successful productinfo -->', productInfo.data);
        dispatch(setMainProduct(productInfo.data));
      } catch (error) {
        console.log('error in setting initial product data', error);
      }
    }

    fetchData();
  }, []);

  const { id } = mainProduct;
  useEffect(() => {
    console.log('main product', mainProduct);

    // Return early if the conditions are not met
    if (Object.keys(mainProduct).length === -1 || !id) {
      return;
    }

    const cachedMainProduct = JSON.parse(localStorage.getItem('mainProduct'));
    if (cachedMainProduct && cachedMainProduct.id === id && cachedMainProduct.validPhotos) {
      dispatch(setMainProduct(cachedMainProduct));
      return;
    }

    const fetchProductStyles = async () => {
      try {
        const response = await axios.get(`/productStyles?id=${id}`);
        const productStyles = response.data;

        if (!productStyles) {
          throw productStyles;
        }

        console.log(productStyles);
        dispatch(setStyles(productStyles));
        dispatch(setMainPhotos(productStyles.results[0].photos));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductStyles();
  }, [id]);

  return (
    <div>
      <div id="overviewWidget">
        {!expandedView ? (
          <div id="overview2-3">
            <ImageGallery
              setExpandedView={setExpandedView}
              setExpandedMain={setExpandedMain}
            />
          </div>
        ) : (
          ''
        )}
        {!expandedView ? (
          <div id="overview1-3">
            <ProductInformation />
          </div>
        ) : (
          ''
        )}
        {expandedView ? (
          <div id="overviewExpand">
            <ExpandedView
              setExpandedView={setExpandedView}
              expandedMain={expandedMain}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div id="prodDescrip">
        <div id="productSlogan">
          <div style={{ 'margin-bottom': '10px' }}>
            <b>{mainProduct.slogan}</b>
          </div>
          <div>{mainProduct.description}</div>
        </div>
        <div id="features">
          <ul id="featureList">
            {mainProduct.features
              ? mainProduct.features.map((feature, i) => {
                  return (
                    <li key={i}>
                      <b>{feature.feature}: </b>
                      {feature.value}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
