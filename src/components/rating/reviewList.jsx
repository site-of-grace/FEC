import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';

import Review from './review.jsx';
//Only displays 2 at a time
const ReviewList = ({fetchReviews}) => {
	const rating = useSelector((state) => state.rating); // rating stuff

	const [curReviews, setCurReviews] = useState([]);
	const [curReviewPos, setCurReviewPos] = useState(-2);
	const [selectedImg, setSelectedImg] = useState(false);

	var handleExpand = () => {
		console.log(rating.reviewPage);
		var options = {page: rating.reviewPage + 1};
		fetchReviews(options);
		var newPos = curReviewPos+2;
		setCurReviewPos(newPos);
		var newReviews = [rating.reviews[newPos], rating.reviews[newPos+1]];
		setCurReviews(curReviews.concat(newReviews));
	};

	useEffect(handleExpand, []); //On start

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
			{rating.reviews[curReviewPos + 2] ? <button onClick={handleExpand}>More Reviews</button> : null}
		</div>
	);
};

export default ReviewList;