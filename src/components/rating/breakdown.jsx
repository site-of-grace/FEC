import React from 'react';

import {useSelector} from 'react-redux';

import Stars from '../general/Stars.jsx';

const Breakdown = () => {
	const averageRating = useSelector((state) => state.rating.average);

	const starsDiv = Stars({number: averageRating});

	return (
		<div id='rating-breakdown'>
			<div id='rating-breakdown-title'>RATINGS & REVIEWS</div>
			<div id='rating-average'>{averageRating}</div>
			<div id='rating-starsAverage'>{starsDiv}</div>
		</div>
	);
};

export default Breakdown;