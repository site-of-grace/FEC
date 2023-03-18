import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
const axios = require('axios');




const Questions = () => {
  const { mainProduct } = useSelector((state) => state.overview); // store.slice
  const dispatch = useDispatch();
  
  // const state = useSelector(state => state);
  // console.log('state===> ', state.overview.mainProduct.id);
  // console.log('mainProduct.id=========> ', mainProduct.id);
  
  let questionArr = [];
  
  
  
  useEffect(() => {
    if(mainProduct.id) {
      console.log('mainProduct.id==============> ', mainProduct.id);
      axios.get('/questions', { 
        params: {
          product_id: mainProduct.id
        }
      })
      .then((productInfo) => {
        console.log('productInfo.data from axios request=========> ', productInfo.data);
        // questionArr = productInfo;
      })
      .catch((err) => {
        console.log('err: ', err); 
      });
    }
    console.log('questionArr ', questionArr);
  }, [mainProduct.id]);
  
  
  // console.log('mainProduct=====> ', mainProduct);  
  
  
  return (
    <div className="widget">
      <h1>QUESTIONS & ANSWERS</h1>
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
      <div>Q: {questionArr.question_body}</div>


    </div>
  );
};

export default Questions;
