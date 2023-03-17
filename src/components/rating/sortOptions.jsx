import React from 'react';
import {useSelector } from 'react-redux';
var SortOptions = function() {
	const reviews = useSelector((state) => state.rating.reviews); // review.slice
	console.log(reviews);

	const handleSort = (e) => {
		var sortOption =  e.target.value;
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