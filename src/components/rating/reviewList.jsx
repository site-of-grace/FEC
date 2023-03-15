import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';

import Review from './review.jsx';
//Only displays 2 at a time
const ReviewList = ({fetchReviews}) => {
	const rating = useSelector((state) => state.rating); // rating stuff

	const [curReviews, setCurReviews] = useState([]);
	const [curReviewPos, setCurReviewPos] = useState(0);
	const [selectedImg, setSelectedImg] = useState(false);
	var onReviews = () => {
		if (rating.reviews.length === 2) {
			handleExpand();
		}
	};

	var handleExpand = () => {
		var options = {params: {page: rating.reviewPage + 1}};
		fetchReviews(options);
		setCurReviews(curReviews.concat([rating.reviews[curReviewPos], rating.reviews[curReviewPos+1]]));
		setCurReviewPos(curReviewPos + 2);
	};
	useEffect(onReviews, [rating.reviews]);

	return (
		<div id='review-list'>
			{selectedImg ? <div id='review-imgModel'>
				<img className={'review-selectedImg'} src={selectedImg}></img>
				<button onClick={() => setSelectedImg(false)}>✕</button>
			</div> : null}
			{curReviews.map((curReview) => {
				if (curReview) {
					return <Review key={curReview['review_id']} review={curReview} setSelectedImg={setSelectedImg}/>;
				}
			})}
			{rating.reviews[curReviewPos] ? <button onClick={handleExpand}>More Reviews</button> : null}
		</div>
	);
};

export default ReviewList;