import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';

import Review from './review.jsx';
//Only displays 2 at a time
const ReviewList = () => {
	const rating = useSelector((state) => state.rating); // rating stuff

	const [curReviews, setCurReviews] = useState([]);
	const [curReviewPos, setCurReviewPos] = useState(0);
	const [selectedImg, setSelectedImg] = useState(false);

	//Adds next 2 reviews in reviews to curReviews
	var handleExpand = () => {
		var newPos = curReviewPos+2;
		setCurReviewPos(newPos);
		var newReviews = [rating.reviews[newPos], rating.reviews[newPos+1]];
		setCurReviews(curReviews.concat(newReviews));
	};

	useEffect(() => setCurReviews([rating.reviews[0], rating.reviews[1]]),[rating.reviews]);

	return (
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
			{rating.reviews[curReviewPos + 2] ? <button onClick={handleExpand}>More Reviews</button> : null}
		</div>
	);
};

export default ReviewList;