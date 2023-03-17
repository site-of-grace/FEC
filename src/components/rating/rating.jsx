//Remove console.logs!

import React, { useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import SortOptions from './sortOptions.jsx';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingMeta, setReviews, setReviewsRelevant, setReviewsRecent, setReviewsHelpful, setAverage} from '../../store/ratingSlice';

const Rating = () => {

  const dispatch = useDispatch();

  var calculateAverage = (reviews) => { //Doesn't use metaData for now because it is innacurate
    var total = 0;
    reviews.forEach((curReview) => {
        total += curReview.rating;
    });
    var longAverage = (total/reviews.length);
  //Rounds to nearest .25
    dispatch(setAverage((Math.round(longAverage * 4) / 4)));
  };

  const onRender = () => { //When component loads fetch data
    fetchReviews();
    fetchMetaData();
  };


  var fetchReviews = (options) => {
		axios.get('/rating/reviews' , options)
		.then((serverData) => {
			console.log('Reviews from server ==> ', serverData.data);
      dispatch(setReviews(serverData.data.results));
      calculateAverage(serverData.data.results);
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
    //Can't be trusted
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