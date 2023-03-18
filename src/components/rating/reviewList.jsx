import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';

import SortOptions from './sortOptions.jsx';

import Review from './review.jsx';
//Only displays 2 at a time
const ReviewList = () => {
	const reviews = useSelector((state) => state.rating.reviews);

	const [curReviews, setCurReviews] = useState([]);
	const [curReviewPos, setCurReviewPos] = useState(0);
	const [selectedImg, setSelectedImg] = useState(false);

	//Adds next 2 reviews in reviews to curReviews
	var handleExpand = () => {
		var newPos = curReviewPos+2;
		setCurReviewPos(newPos);
		var newReviews = [reviews[newPos], reviews[newPos+1]];
		setCurReviews(curReviews.concat(newReviews));
	};

	useEffect(() => {setCurReviews([reviews[0], reviews[1]]); setCurReviewPos(0);}, [reviews]); //On reviews change reset curReviews stuff

	return (
		<div id='review-list-section'>
			<SortOptions />
		<div id='review-list'>
			{selectedImg ? <div id='review-imgModel'> {/*If theres a selectedImg url*/}
				<img className={'review-selectedImg'} src={selectedImg}></img>
				<button onClick={() => setSelectedImg(false)}>✕</button>
			</div> : null}
			{curReviews.map((curReview) => {
				if (curReview) { {/*Only displays if curReview is not undefined*/}
					return <Review key={curReview['review_id']} review={curReview} setSelectedImg={setSelectedImg}/>;
				}
			})}
			{/*If more reviews left show expand button*/}
			{reviews[curReviewPos + 2] ? <button onClick={handleExpand}>More Reviews</button> : null}
		</div>
		</div>
	);
};

export default ReviewList;