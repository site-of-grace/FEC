import React, {useState, useEffect} from 'react';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './image.jsx';
var axios = require('axios');


const Overview = () => {


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