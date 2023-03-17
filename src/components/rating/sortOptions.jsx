import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {setReviewsHelpful, setReviewsRecent, setReviews} from '../../store/ratingSlice';

import _ from 'lodash';

var SortOptions = function() {
	const dispatch = useDispatch();

	const rating = useSelector((state) => state.rating); // review.slice

	//Sorts if needed hopefuly improving efficiency
	const handleSort = (e) => {
		var sortOption =  e.target.value;
		if (sortOption === 'relevant') { //Already knows reviewsRelevant is filled
			dispatch(setReviews(rating.reviewsRelevant));
		} else if (sortOption === 'helpful') {

			if (rating.reviewsHelpful.length === 0 ) { //Checks if reviewsHelpful is filled
				var helfpulReviews = _.orderBy(rating.reviews, 'helpful', 'desc');
				dispatch(setReviewsHelpful(helfpulReviews));
				dispatch(setReviews(helfpulReviews));
				console.log(helfpulReviews);
			} else { //If filled skip sorting
				dispatch(setReviews(rating.reviewsHelpful));
			}

		} else if (sortOption === 'recent') {
			if (rating.reviewsRecent.length === 0 ) {
				var recentReviews = _.orderBy(rating.reviews, 'date', 'desc');
				dispatch(setReviewsRecent(recentReviews));
				dispatch(setReviews(recentReviews));
			} else {
				console.log(rating.reviewsRecent);
				dispatch(setReviews(rating.reviewsRecent));
			}
		}
	};

	return(
		<div id='sort-bar'>
			<div>{rating.reviews.length} reviews, sorted by</div>
			<select onChange={handleSort} name='sort-options' id='sort-options'>
			<option value='relevant'>relevance</option>
			<option value='helpful'>helpful</option>
			<option value='recent'>recent</option>
			</select>
		</div>
	);
};

export default SortOptions;