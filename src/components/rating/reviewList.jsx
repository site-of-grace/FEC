import React, {useState, useEffect} from 'react';

import Review from './review.jsx';
//Only displays 2 at a time
const ReviewList = ({reviews}) => {
	const [curReviews, setCurReviews] = useState([reviews[0], reviews[1]]);

	useEffect(() => setCurReviews([reviews[0], reviews[1]]), [reviews]); //On reviews change

	return (
		<div>
			{curReviews.map((curReview) => {
				if (curReview) {
					return <Review key={curReview['review_id']} review={curReview}/>
				}
			})}
			<button>More Reviews</button>
		</div>
	)
};

export default ReviewList;