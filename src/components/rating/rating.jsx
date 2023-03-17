//Remove console.logs!

import React, { useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import SortOptions from './sortOptions.jsx';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingMeta, setReviews, setReviewsRelevant, setReviewsRecent, setReviewsHelpful, setAverage} from '../../store/ratingSlice';

import _ from 'lodash';

const Rating = () => {

  const dispatch = useDispatch();

  const product_id = '71701'; //Fix later when Danny provided info

  var sortRelevant = (reviews) => { //Sorts the reviews considering helpful and date
    var helpfulnessWeight = 4; //Make helpfulness a bit more important
    for (var i = 1; i <= reviews.length; i++) {
      var dateScore = reviews.length - i;
      var helpfulScore = Math.floor(reviews[i-1].helpfulness*helpfulnessWeight);
      reviews[i-1].score = dateScore + helpfulScore;
    }
    var relevantReviews = _.orderBy(reviews, 'score', 'desc');
    dispatch(setReviewsRelevant(relevantReviews));
    dispatch(setReviews(relevantReviews));
  };

  var calculateAverage = (metaData) => {
    var total = 0;
    var reviewAmount = 0;
    for (var i = 1; i <= 5; i++) {
      total += metaData.rating[i] * i;
      reviewAmount += metaData.rating[i];
    }

    var longAverage = (total/reviewAmount);
  //Rounds to nearest .25
    dispatch(setAverage((Math.round(longAverage * 4) / 4)));
  };


  var fetchReviews = (metaData) => {
    var options = {params: {product_id, metaData}};
		axios.get('/rating/reviews' , options)
		.then((serverData) => {
      //Reviews are sorted by recent to improve efficiency
			console.log('Reviews from server ==> ', serverData.data);

      sortRelevant(serverData.data.results);

      //Reviews are sorted by relevant so fill that in store
      dispatch(setReviewsRecent(serverData.data.results));
      //Sorts for recent
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
      fetchReviews(serverData.data); //Give fetch reviews metaData

      calculateAverage(serverData.data);

      dispatch(setRatingMeta(serverData.data));
    })
    .catch((err) => {
      console.log('Error from server ==> ', err);
    });
  };

  useEffect(fetchMetaData, []);

  return (
    <div className='widget'>
      <SortOptions />
      <h1 className='title'>RATING</h1>
      <ReviewList />
    </div>
  );
};
export default Rating;