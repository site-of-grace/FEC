import React, {useState, useEffect} from 'react';

import Review from './review.jsx';
//Only displays 2 at a time
const ReviewList = ({reviews, averageReviews}) => {
	const [curReviews, setCurReviews] = useState([reviews[0], reviews[1]]);
	const [curReviewPos, setCurReviewPos] = useState(0);
	const [selectedImg, setSelectedImg] = useState(false);


	useEffect(() => setCurReviews([reviews[0], reviews[1]]), [reviews]); //On reviews change
	var handleExpand = () => {
		var newPos = curReviewPos+2;
		setCurReviewPos(newPos);
		var newReviews = [reviews[newPos], reviews[newPos+1]];
		setCurReviews(curReviews.concat(newReviews));
	};

	return (
		<div>
			{selectedImg ? <div id='review-imgModel'>
				<img className={'review-selectedImg'} src={selectedImg}></img>
				<button onClick={() => setSelectedImg(false)}>✕</button>
			</div> : null}
			{curReviews.map((curReview) => {
				if (curReview) {
					return <Review key={curReview['review_id']} review={curReview} setSelectedImg={setSelectedImg}/>
				}
			})}
			{reviews[curReviewPos + 2] ? <button onClick={handleExpand}>More Reviews</button> : null}
		</div>
	)
};

export default ReviewList;