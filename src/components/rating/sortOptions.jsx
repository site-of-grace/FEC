import React from 'react';
import {useSelector } from 'react-redux';
var SortOptions = function() {
	const reviews = useSelector((state) => state.rating.reviews); // review.slice
	return(
		<div id='sort-bar'>
			<div>{reviews.length} reviews, sorted by</div>
			<select name='sort-options' id='sort-options'>
			<option value='relevance'>relevance</option>
			<option value='helpful'>helpful</option>
			<option value='recent'>recent</option>
			</select>
		</div>
	);
};

export default SortOptions;