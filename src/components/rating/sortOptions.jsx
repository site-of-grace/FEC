import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {setReviewsHelpful, setReviews} from '../../store/ratingSlice';

import orderBy from 'lodash/orderBy';

var SortOptions = function({sortRelevant, search}) {
	const dispatch = useDispatch();

	const rating = useSelector((state) => state.rating); // review.slice

	//Sorts if needed hopefuly improving efficiency
	const handleSort = (e) => {
		var sortOption =  e.target.value;
		if (sortOption === 'relevant') { //Already knows reviewsRelevant is filled
			if (!search) {
				dispatch(setReviews(rating.reviewsRelevant));
			} else {
				sortRelevant(rating.reviews, false);
			}
		} else if (sortOption === 'recent') {
			if (!search) {
				dispatch(setReviews(rating.reviewsRecent));
			} else {
				var recentReviews = orderBy(rating.reviews, 'date', 'desc');
				dispatch(setReviews(recentReviews));
			}
		} else {
			if (rating.reviewsHelpful.length === 0 || search) { //Checks if reviewsHelpful is filled or search
				var helfpulReviews = orderBy(rating.reviews, 'helpfulness', 'desc');
				if (!search) {
					dispatch(setReviewsHelpful(helfpulReviews));
				}
				dispatch(setReviews(helfpulReviews));
				console.log(helfpulReviews);
			} else { //If filled skip sorting
				dispatch(setReviews(rating.reviewsHelpful));
			}
		}
	};

	return(
		<div id='sort-bar' data-testid='sort-bar'>
			<div>{rating.reviews.length} reviews, sorted by</div>
			<select onChange={handleSort} name='sort-options' id='sort-options' data-testid='sort-options'>
			<option value='relevant'>relevance</option>
			<option value='helpful'>helpful</option>
			<option value='recent'>recent</option>
			</select>
		</div>
	);
};

export default SortOptions;