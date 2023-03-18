import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
const axios = require('axios');




const Questions = () => {
  const { mainProduct, mainPhotos } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();
  
  // const state = useSelector(state => state);
  // console.log('state===> ', state.overview.mainProduct.id);
  console.log('mainProduct.id===> ', mainProduct.id);
  
  
  
  
  useEffect(() => {
    if(mainProduct.id) {
      console.log("mainProduct.id==============> ",mainProduct.id)
      axios.get(`/QA/${mainProduct.id}`)
      .then((productInfo) => {
        console.log('productInfo===> ', productInfo);
      })
      .catch((err) => {
        res.send(err);
      });
    }
  }, [mainProduct.id]);
  
  
  
  
  
  return (
    <div className="widget">
      <h1>QUESTIONS & ANSWERS</h1>
      {/* <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." /> */}

    </div>
  );
};

export default Questions;
