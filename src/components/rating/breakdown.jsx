import React from 'react';

import {useSelector} from 'react-redux';

import Stars from '../general/Stars.jsx';

const Breakdown = () => {
	const averageRating = useSelector((state) => state.rating.average);
	const metaData = useSelector((state) => state.rating.ratingMeta);
	const metaDataTotal = useSelector((state) => state.rating.ratingMetaTotal);
	console.log(metaData);

	const starsDiv = Stars({number: averageRating});

	var percentRecommended;
	//Percent Recommended
	if (metaData.recommended) {
		var recommended = metaData.recommended;
		percentRecommended = Math.round((Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)))*100);
	}

	//Creates a progress bar filled by rating percent
	var progressBars = [];
	if (metaData.ratings) {
		var width = 200;
		for (var i = 5; i >= 1; i--) {
			var ratingPercent = metaData.ratings[i]/metaDataTotal;
			var filledWidth = Math.round(width*ratingPercent);
			progressBars.push(
				<div className='rating-progressBarSection'>
					<div className='rating-progressBar-rating'>{i} stars</div>
					<div className='rating-progressBar'>
						<div style={{'width': `${filledWidth}px`}} className='rating-progressBarFill'></div>
						<div style={{'width': `${width}px`}} className='rating-progressBarEmpty'></div>
					</div>
					<div></div>
				</div>
			);
		}
	}

	return (
		<div id='rating-breakdown'>
			<div id='rating-breakdown-title'>RATINGS & REVIEWS</div>
			<div id='rating-average'>{Math.round(averageRating*10)/10}</div> {/*Rounds to nearest single decimal*/}
			<div id='rating-starsAverage'>{starsDiv}</div>
			<div id='rating-recommended'>{percentRecommended}% of reviews recommended this product</div>
			{progressBars}
		</div>
	);
};

export default Breakdown;