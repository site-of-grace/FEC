import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
import ExpandedView from './expandedView.jsx';
import useClickTracking from '../../hooks/useClickTracking';
var axios = require('axios');

const Overview = (props) => {
  const { mainProduct } = useSelector(state => state.overview); // store.slice
  const dispatch = useDispatch();

  const [expandedView, setExpandedView] = useState(false);
  const [expandedMain, setExpandedMain] = useState('');
  const [resetMain, setResetMain] = useState(false);
  const overviewRef = useClickTracking();


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
    <div ref={overviewRef} data-widget='Overview' id='overviewMain'>
      <div id="overviewWidget">
        {!expandedView ? (
          <div id="overview2-3">
            <ImageGallery
              setExpandedView={setExpandedView}
              setExpandedMain={setExpandedMain}
              expandedMain={expandedMain}
              setResetMain={setResetMain}
              resetMain={resetMain}
            />
          </div>
        ) : (
          ''
        )}
        {!expandedView ? (
          <div id="overview1-3">
            <ProductInformation setCart={props.setCart} cart={props.cart}/>
          </div>
        ) : (
          ''
        )}
        {expandedView ? (
          <div id="overviewExpand">
            <ExpandedView
              setExpandedView={setExpandedView}
              expandedMain={expandedMain}
              setResetMain={setResetMain}
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
