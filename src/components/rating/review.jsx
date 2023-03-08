import React from 'react';

const Review = ({review}) => {
	return (
		<div className='review'>
			<h1>{review.summary}</h1>
		</div>
	)
}

export default Review;