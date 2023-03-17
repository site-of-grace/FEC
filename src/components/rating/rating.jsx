//Remove console.logs!

import React, { useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import SortOptions from './sortOptions.jsx';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingMeta, setReviews, setReviewsRelevant, setReviewsRecent, setReviewsHelpful} from '../../store/ratingSlice';

const Rating = () => {

  const dispatch = useDispatch();

  const onRender = () => { //When component loads fetch data
    fetchReviews();
    fetchMetaData();
  };


  var fetchReviews = (options) => {
		axios.get('/rating/reviews' , options)
		.then((serverData) => {
			console.log('Reviews from server ==> ', serverData.data);
      dispatch(setReviews(serverData.data.results));
      //Reviews are sorted by relevant so fill that in store
      dispatch(setReviewsRelevant(serverData.data.results));
      //Resets other sort option data stores
      dispatch(setReviewsRecent([]));
      dispatch(setReviewsHelpful([]));
		})
		.catch((err) => {
			console.log('Error from server ==> ', err);
		});
	};

  var fetchMetaData = () => {
    axios.get('/rating/meta')
    .then((serverData) => {
      //console.log('Review data from server ==> ', serverData.data);
      dispatch(setRatingMeta(serverData.data));

    })
    .catch((err) => {
      console.log('Error from server ==> ', err);
    });
  };

  useEffect(onRender, []);

  return (
    <div className='widget'>
      <SortOptions />
      <h1 className='title'>RATING</h1>
      <ReviewList />
    </div>
  );
};
export default Rating;