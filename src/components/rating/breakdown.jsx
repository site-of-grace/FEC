import React from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {setFilterRating} from '../../store/ratingSlice';

import Stars from '../general/Stars.jsx';

import AtrributeBreakdown from './attrBreakdown.jsx';

import styles from './cssModules/breakdown.module.css';

const Breakdown = () => {
	const dispatch = useDispatch();

	const averageRating = useSelector((state) => state.rating.average);
	const metaData = useSelector((state) => state.rating.ratingMeta);
	const metaDataTotal = useSelector((state) => state.rating.ratingMetaTotal);
	const filterRating = useSelector((state) => state.rating.filterRating);
	const handleRatingSelection = (rating) => {
		if (isNaN(Number(rating))) {
			dispatch(setFilterRating(false));
			return;
		}
		var filterRatingObj = {};
		if (filterRating) {
			Object.assign(filterRatingObj, filterRating);
			filterRatingObj[rating] = true;
			//Check if we need to remove a filter
			if (filterRating[rating]) {
				delete filterRatingObj[rating];
			}
			if (Object.keys(filterRatingObj).length === 0) {
				filterRatingObj = false;
			}
			dispatch(setFilterRating(filterRatingObj));
		} else {
			filterRatingObj[rating] = true;
			dispatch(setFilterRating(filterRatingObj));
		}
	};

	const starsDiv = Stars({number: averageRating});

	var percentRecommended;
	//Percent Recommended
	if (metaData.recommended) {
		var recommended = metaData.recommended;
		if (recommended.false && recommended.true) {
			percentRecommended = Math.round((Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)))*100);
		} else {
			if (recommended.false) {
				percentRecommended = 0;
			} else {
				percentRecommended = 100;
			}
		}
	}

	//Creates a progress bar filled by rating percent
	var progressBars = [];
	if (metaData.ratings) {
		var width = 200;
		for (var i = 5; i >= 1; i--) {
			var ratingPercent = 0;
			if (metaData.ratings[i]) {
				ratingPercent = metaData.ratings[i]/metaDataTotal;
			}
			var filledWidth = Math.round(width*ratingPercent);
			progressBars.push(
				<div key={i * 10} className={`${styles['rating-progressBarSection']}`} data-testid='rating-progressBarSection'>
					<div onClick={(e) => handleRatingSelection(e.target.innerHTML[0])} className={`${styles['rating-progressBar-rating']}`} data-testid='rating-progressBar-rating'>{i} stars</div>
					<div className={`${styles['rating-progressBar']}`} data-testid='rating-progressBar'>
						<div style={{'width': `${filledWidth}px`}} className={`${styles['rating-progressBarFill']}`} data-testid='rating-progressBarFill'></div>
						<div style={{'width': `${width}px`}} className={`${styles['rating-progressBarEmpty']}`} data-testid='rating-progressBarEmpty'></div>
					</div>
					<div className={`${styles['rating-progressBar-ratingAmount']}`} data-testid='rating-progressBar-ratingAmount'>{metaData.ratings[i]}</div>
					<div></div>
				</div>
			);
		}
	}

	return (
		<div id={`${styles['rating-breakdown']}`} data-testid='rating-breakdown'>
			<div id={`${styles['rating-breakdown-title']}`} data-testid='rating-breakdown-title'>RATINGS & REVIEWS</div>
			<div id={`${styles['rating-average']}`} data-testid='rating-average'>{Math.round(averageRating*10)/10}</div> {/*Rounds to nearest single decimal*/}
			<div id={`${styles['rating-starsAverage']}`} data-testid='rating-starsAverage'>{starsDiv}</div>
			<div id={`${styles['rating-recommended']}`} data-testid='rating-recommended'>{percentRecommended}% of reviews recommended this product</div>
			{progressBars}
			{filterRating ? <div style={{'color': 'red'}}>Filters Applied <div id={`${styles['rating-removeFilters']}`} data-testid='rating-removeFilters' onClick={handleRatingSelection}>Remove All Filters</div></div> : null}

			<AtrributeBreakdown />
		</div>
	);
};

export default Breakdown;