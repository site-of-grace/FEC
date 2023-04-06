import React, {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {setReviews} from '../../store/ratingSlice';

import styles from './cssModules/reviewsList.module.css';


const SearchReviews = ({setSearch}) => {
	const dispatch = useDispatch();

	const rating = useSelector((state) => state.rating);
	/*
	{
    "review_id": 1279152,
    "rating": 5,
    "summary": "Super stylish and comfy!",
    "recommend": true,
    "response": null,
    "body": "I got this as a gift for my husband and he LOVES them! Recommended! ",
    "date": "2023-03-02T00:00:00.000Z",
    "reviewer_name": "jackie80",
    "helpfulness": 1,
    "photos": [],
    "score": 33
}
	 */


	const handleInput = (e) => {
		var sortOption = document.getElementById('sort-options').value;
		var reviewListName = {'recent': 'reviewsRecent', 'helpful': 'reviewsHelpful', 'relevant': 'reviewsRelevant'};
		var value = e.target.value.toLowerCase();
		var sortedList = [];
		if (value.length >= 3) {
			rating[reviewListName[sortOption]].forEach((curReview) => {
				if (curReview.summary.toLowerCase().includes(value)) {
					sortedList.push(curReview);
				} else if (curReview.body.toLowerCase().includes(value)){
					sortedList.push(curReview);
				}
			});
			setSearch(true);
			dispatch(setReviews(sortedList));
		} else {
			setSearch(false);
		}
	};

	return (
		<div  id={styles['rating-search']} data-testid='rating-search'>
			<label id={styles['rating-searchLabel']}>Search Reviews</label>
			<input type='text' id={styles['rating-searchInput']} data-testid='rating-searchInput' onChange={handleInput}/>
		</div>
	);
};

export default SearchReviews;