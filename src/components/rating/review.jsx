import React, {useState} from 'react';

import axios from 'axios';

const Review = ({review, setSelectedImg}) => {
	const [expand, setExpand] = useState(false);
	const [voted, setVoted] = useState(false);

	const [updateHelpfulness, setUpdateHelpfulness] = useState(false);

	var handleHelpfulness = () => {
		setVoted(true);
		if (!voted) {
			const body = {reviewId: review['review_id']};
			axios.put('/reviews/helpful', body)
			.then(() => {
				review.helpfulness++;
				setUpdateHelpfulness(true);
			})
			.catch((error) => {
				console.log('Error sending put request =>', error);
			})
		}
	};


	var stars = [];
	var date = new Date(review.date);
	var date = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
	review.response = 'Thanks for the review and the purchase!'
	for (var i = 0; i < 5; i++) {
		if (i <= review.rating) {
			stars.push(<img className='review-star' key={i} src='./icons/fullStar.png'></img>)
		} else {
			stars.push(<img className='review-star' key={i} src='./icons/unfilledStar.png'></img>);
		}
	}

	return (
		<div className='review'>
			{stars}
			<div className='review-date-name'>{review['reviewer_name']}, {date}</div>
			<div className='review-summary'>{review.summary}</div>
			<div className='review-body'>
				{expand ? review.body : review.body.slice(0, 250)}
				{!expand && review.body.length > 250 ? '...' : ''}
				{!expand && review.body.length > 250 ? <button onClick={() => setExpand(true)}style={{'fontSize': '5px'}}>Show more</button> : null}
			</div>
			{review.photos.map((curPhoto) => {
				return <img onClick={() => setSelectedImg(curPhoto.url)} className='review-photo' src={curPhoto.url} key={curPhoto.id}></img>
			})}
			{review.recommend ? <p style={{'fontSize': '12px'}}>✔ I recommend this product</p> : null}
			{review.response ? <div className='review-response'>Response from seller: <div style={{'fontWeight': '100'}}>{review.response}</div></ div> : null}
			<div className='review-helpful'>Helpful? <button onClick={handleHelpfulness}>Yes</button> <div className='helpfulness'>{`(${review.helpfulness})`}</div></div>
			<div className='review-bar'></div>
		</div>
	)
};

export default Review;