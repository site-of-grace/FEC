import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';

import SortOptions from './sortOptions.jsx';

import Review from './review.jsx';

import styles from './cssModules/reviewsList.module.css';

import SearchReviews from './searchReviews.jsx';
//Only displays 2 at a time
const ReviewList = ({setAddReview, sortRelevant}) => {
	const reviews = useSelector((state) => state.rating.reviews);
	const filterRating = useSelector((state) => state.rating.filterRating);
	const [curReviews, setCurReviews] = useState([]);
	const [curReviewPos, setCurReviewPos] = useState(0);
	const [selectedImg, setSelectedImg] = useState(false);

	const [search, setSearch] = useState(false);

	//Adds next 2 reviews in reviews to curReviews
	var handleExpand = () => {
		var newPos = curReviewPos+2;
		setCurReviewPos(newPos);
		var newReviews = [reviews[newPos], reviews[newPos+1]];
		setCurReviews(curReviews.concat(newReviews));
	};

	useEffect(() => {setCurReviews([reviews[0], reviews[1]]); setCurReviewPos(0);}, [reviews]); //On reviews change reset curReviews stuff

	return (
		<div id={`${styles['review-list-section']}`} data-testid='review-list-section'>
				<SearchReviews setSearch={setSearch}/>
			<SortOptions search={search} sortRelevant={sortRelevant}/>
		<div id={`${styles['review-list']}`} data-testid='review-list'>
			{selectedImg ? <div id={`${styles['review-imgModel']}`} data-testid='review-imgModel'> {/*If theres a selectedImg url*/}
				<img src={selectedImg}></img>
				<div id={styles['image-overlay']} onClick={() => setSelectedImg(false)} data-testid='image-overlay'></div>
			</div> : null}

			{!filterRating ? curReviews.map((curReview) => {
				if (curReview) { {/*Only displays if curReview is not undefined*/}
					return <Review key={curReview['review_id']} review={curReview} setSelectedImg={setSelectedImg} data-testid='review_id'/>;
				}
			}) : null}

			{filterRating ? reviews.map((curReview) => { {/*Show all filtered reviews if filter by Rating is true*/}
				if (!filterRating[curReview.rating]) {
					return;
				}
				return <Review key={curReview['review_id']} review={curReview} setSelectedImg={setSelectedImg} data-testid='review_id'/>;
			}) : null}

			{/*If more reviews left show expand button*/}
			{reviews[curReviewPos + 2] && !filterRating ? <button className={`${styles['rating-button']}`} onClick={handleExpand} data-testid='rating-more'>MORE REVIEWS</button> : null}
			<button className={`${styles['rating-button']}`} data-testid='rating-add' onClick={() => setAddReview(true)}>ADD A REVIEW +</button>
		</div>
		</div>
	);
};

export default ReviewList;