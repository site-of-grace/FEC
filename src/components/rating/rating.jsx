import React, { useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import SortOptions from './sortOptions.jsx';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingMeta, setReviews, setReviewPage} from '../../store/ratingSlice';

const Rating = () => {
  const rating = useSelector((state) => state.rating); // rating stuff

  const dispatch = useDispatch();

  const onRender = () => {
    fetchReviews();
    fetchMetaData();
  };


  var fetchReviews = (options) => {
		axios.get('/rating/reviews' , options)
		.then((serverData) => {
			console.log('Reviews from server ==> ', serverData.data);
      dispatch(setReviewPage(rating.reviewPage+1));
      dispatch(setReviews(rating.reviews.concat(serverData.data.results)));
		})
		.catch((err) => {
			console.log('Error from server ==> ', err);
		});
	};

  var fetchMetaData = () => {
    axios.get('/rating/meta')
    .then((serverData) => {
      console.log('Review data from server ==> ', serverData.data);
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