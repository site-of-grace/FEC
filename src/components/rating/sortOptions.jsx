import React from 'react';
import {useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {setReviews} from '../../store/ratingSlice';

var SortOptions = function() {
	const reviews = useSelector((state) => state.rating.reviews); // review.slice

	const dispatch = useDispatch();

	const handleSort = (e) => {
		axios.get('/reviews' , {params: {sortOption: e.target.value}})
		.then((serverData) => {
			console.log('Reviews from server ==> ', serverData.data);
			dispatch(setReviews(serverData.data));
		})
		.catch((err) => {
			console.log('Error from server ==> ', err);
		});
	};

	return(
		<div id='sort-bar'>
			<div>{reviews.length} reviews, sorted by</div>
			<select onChange={handleSort} name='sort-options' id='sort-options'>
			<option value='relevant'>relevance</option>
			<option value='helpful'>helpful</option>
			<option value='newest'>recent</option>
			</select>
		</div>
	);
};

export default SortOptions;