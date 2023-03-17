import React, { useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import SortOptions from './sortOptions.jsx';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingMeta, setReviews, setReviewAmount, setReviewPage} from '../../store/ratingSlice';

const Rating = () => {
  const rating = useSelector((state) => state.rating); // rating stuff

  const dispatch = useDispatch();

  const onRender = () => {
    fetchReviews();
    fetchMetaData();
  };

  var getReviewsAmount = (ratingMeta) => {
		var amount = 0;
		for (var key in ratingMeta.ratings) {
			var curRatings = ratingMeta.ratings[key];
			amount += Number(curRatings);
		}
		dispatch(setReviewAmount(amount));
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
      getReviewsAmount(serverData.data);
      dispatch(setRatingMeta(serverData.data));

    })
    .catch((err) => {
      console.log('Error from server ==> ', err);
    });
  };

  useEffect(onRender, []);

  return (
    <div className='widget'>
      <SortOptions fetchReviews={fetchReviews}/>
      <h1 className='title'>RATING</h1>
      <ReviewList fetchReviews={fetchReviews}/>
    </div>
  );
};
export default Rating;