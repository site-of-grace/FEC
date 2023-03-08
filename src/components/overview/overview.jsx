import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../store/productSlice';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
var axios = require('axios');

const Overview = () => {
  const { products } = useSelector((state) => state.text); // store.slice
  const dispatch = useDispatch();

  /*
  useEffect(() => {
    // make axios
    dispatch(setMessage('Hello FEC!'))
    dispatch(setMessage('Hello FEC!'))
  }, [products])

  const clickHandler = () => {
    dispatch(setMessage('Hello FEC!'))
  }

  */

  useEffect(() => {
    axios.get('/FEC')
    .then((data) => {
      if (!data) {
        throw data
      }
      console.log('---current data from GET--->', data);
    })
    .catch((error) => {
      console.log('failed get request', error);
    })
  }, [])




  return (
    <div id='overviewWidget'>
      <div id='overview2-3'>
        <ImageGallery />
      </div>
      <div id='overview1-3'>
        <ProductInformation />
      </div>
    </div>
  )
}

export default Overview;