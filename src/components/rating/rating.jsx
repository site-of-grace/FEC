import React, { useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import SortOptions from './sortOptions.jsx';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import {setReviews} from '../../store/ratingSlice';

const Rating = () => {
  const dispatch = useDispatch();


  const update = (reviews) => {
    dispatch(setReviews(reviews));
  };

  var fetch = () => {
    axios.get('/reviews')
    .then((serverData) => {
      console.log('Reviews from server ==> ', serverData.data);
      update(serverData.data);
    })
    .catch((err) => {
      console.log('Error from server ==> ', err);
    });
  };

  useEffect(fetch, []);

  return (
    <div className='widget'>
      <SortOptions />
      <h1 className='title'>RATING</h1>
      <ReviewList />
    </div>
  );
};
export default Rating;