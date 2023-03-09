import React, {useState} from 'react';

const Review = ({review}) => {
	const [expand, setExpand] = useState(false);

	var stars = [];
	var date = new Date(review.date);
	var date = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

	review.body = 'Review Body - Any images that were submitted as part of the review should appear as thumbnails below the review text. Upon clicking a thumbnail, the image should open in a modal window, displaying at full resolution.  The only functionality available within this modal should be the ability to close the window.';

	for (var i = 0; i < 5; i++) {
		if (i <= review.rating) {
			stars.push(<img key={i} src='./icons/fullStar.png'></img>)
		} else {
			stars.push(<img key={i} src='./icons/unfilledStar.png'></img>);
		}
	}


	return (
		<div className='review'>
			{stars}
			<div className='review-date'>{date}</div>
			<div className='review-summary'>{review.summary}</div>
			<div className='review-body'>
				{expand ? review.body : review.body.slice(0, 250)}
				{!expand && review.body.length > 250 ? '...' : ''}
				{!expand && review.body.length > 250 ? <button onClick={() => setExpand(true)}style={{'fontSize': '5px'}}>Show more</button> : null}
			</div>
		</div>
	)
}

export default Review;