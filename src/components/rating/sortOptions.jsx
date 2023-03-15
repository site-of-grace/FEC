import React from 'react';
import {useSelector } from 'react-redux';
var SortOptions = function() {
	const reviewAmount = useSelector((state) => state.rating.reviewAmount); // review.slice


	const handleSort = (e) => {
		options = {params: {sort: e.target.value}};
	};

	return(
		<div id='sort-bar'>
			<div>{reviewAmount} reviews, sorted by</div>
			<select onChange={handleSort} name='sort-options' id='sort-options'>
			<option value='relevant'>relevance</option>
			<option value='helpful'>helpful</option>
			<option value='newest'>recent</option>
			</select>
		</div>
	);
};

export default SortOptions;