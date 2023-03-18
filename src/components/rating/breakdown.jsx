import React from 'react';

import {useSelector} from 'react-redux';

import Stars from '../general/Stars.jsx';

const Breakdown = () => {
	const averageRating = useSelector((state) => state.rating.average);
	const metaData = useSelector((state) => state.rating.ratingMeta);
	console.log(metaData);

	const starsDiv = Stars({number: averageRating});
	var percentRecommended;
	if (metaData.recommended) {
		var recommended = metaData.recommended;
		percentRecommended = Math.round((Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)))*100);
		console.log(percentRecommended);
	}
	return (
		<div id='rating-breakdown'>
			<div id='rating-breakdown-title'>RATINGS & REVIEWS</div>
			<div id='rating-average'>{Math.round(averageRating*10)/10}</div> {/*Rounds to nearest single decimal*/}
			<div id='rating-starsAverage'>{starsDiv}</div>
			<div id='rating-recommended'>{percentRecommended}</div>
		</div>
	);
};

export default Breakdown;