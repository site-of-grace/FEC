import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {setReviewsHelpful, setReviews} from '../../store/ratingSlice';

import orderBy from 'lodash/orderBy';

var SortOptions = function() {
	const dispatch = useDispatch();

	const rating = useSelector((state) => state.rating); // review.slice

	//Sorts if needed hopefuly improving efficiency
	const handleSort = (e) => {
		var sortOption =  e.target.value;
		if (sortOption === 'relevant') { //Already knows reviewsRelevant is filled
			dispatch(setReviews(rating.reviewsRelevant));
		} else if (sortOption === 'recent') {
			dispatch(setReviews(rating.reviewsRecent));
		} else {
			if (rating.reviewsHelpful.length === 0 ) { //Checks if reviewsHelpful is filled
				var helfpulReviews = orderBy(rating.reviews, 'helpfulness', 'desc');
				dispatch(setReviewsHelpful(helfpulReviews));
				dispatch(setReviews(helfpulReviews));
				console.log(helfpulReviews);
			} else { //If filled skip sorting
				dispatch(setReviews(rating.reviewsHelpful));
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