import React, {useState} from 'react';

const Review = ({review}) => {
	const [expand, setExpand] = useState(false);
	const [selectedImg, setSelectImg] = useState(false);

	var stars = [];
	var date = new Date(review.date);
	var date = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

	for (var i = 0; i < 5; i++) {
		if (i <= review.rating) {
			stars.push(<img className='review-star' key={i} src='./icons/fullStar.png'></img>)
		} else {
			stars.push(<img className='review-star' key={i} src='./icons/unfilledStar.png'></img>);
		}
	}

	return (
		<div className='review'>
			{selectedImg ? <div id='review-imgModel'>
				<img className={'review-selectedImg'} src={selectedImg}></img>
				<button onClick={() => setSelectImg(false)} style={{'color': 'red', 'fontSize': '50px'}}>X</button>
			</div> : null}
			{stars}
			<div className='review-date'>{date}</div>
			<div className='review-summary'>{review.summary}</div>
			<div className='review-body'>
				{expand ? review.body : review.body.slice(0, 250)}
				{!expand && review.body.length > 250 ? '...' : ''}
				{!expand && review.body.length > 250 ? <button onClick={() => setExpand(true)}style={{'fontSize': '5px'}}>Show more</button> : null}
			</div>
			{review.photos.map((curPhoto) => {
				return <img onClick={() => setSelectImg(curPhoto.url)} className='review-photo' src={curPhoto.url} key={curPhoto.id}></img>
			})}
		</div>
	)
}

export default Review;