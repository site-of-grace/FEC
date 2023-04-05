import React, {useState} from 'react';

import axios from 'axios';

import styles from './cssModules/review.module.css';

const Review = ({review, setSelectedImg}) => {
	const [expand, setExpand] = useState(false);
	const [voted, setVoted] = useState(false);
	const [helpfulness, setHelpfulness] = useState(review.helpfulness);

	//Send request for server to add 1 to helpfulness and adds 1 to cur helpfulness so no reload nescessary
	var handleHelpfulness = () => {
		setVoted(true);
		if (!voted) {
			const body = {reviewId: review['review_id']};
			axios.put('/rating/helpful', body)
			.then(() => {
				setHelpfulness(review.helpfulness + 1);
			})
			.catch((error) => {
				console.log('Error sending put request =>', error);
			});
		}
	};


	var stars = [];
	var date = new Date(review.date);
	date = date.toLocaleDateString('en-us', { weekday:'long', year:'numeric', month:'short', day:'numeric'});

	//Sets star element depending on rating
	for (var i = 1; i <= 5; i++) {
		if (i <= review.rating) {
			stars.push(<img className={`${styles['review-star']}`} key={i} src='./icons/fullStar.png'></img>);
		} else {
			stars.push(<img className={`${styles['review-star']}`} key={i} src='./icons/unfilledStar.png'></img>);
		}
	}
	return (
		<div className={`${styles['review']}`}>
			<div id={`${styles['review-stars']}`}>
				{stars}
			</div>
			<div className={`${styles['review-date-name']}`}>{review['reviewer_name']}, {date}</div>
			<div className={`${styles['review-summary']}`}>{review.summary}</div>
			<div className={`${styles['review-body']}`}>
				{/*Shows only 250 characters at once and allows expansion*/}
				{expand ? review.body : review.body.slice(0, 250)}
				{!expand && review.body.length > 250 ? '...' : ''}
				{!expand && review.body.length > 250 ? <button onClick={() => setExpand(true)}style={{'fontSize': '5px'}}>Show more</button> : null}
			</div>
			{review.photos.map((curPhoto) => {
				{/*Displays a icon onClick sets selectedImg in reviewList*/}
				return <img onClick={() => setSelectedImg(curPhoto.url)} className={`${styles['review-photo']}`}src={curPhoto.url} key={curPhoto.id}></img>;
			})}
			{/*Shows recommended, seller response, and helpful*/}
			{review.recommend ? <p style={{'fontSize': '12px'}}>✔ I recommend this product</p> : null}
			{review.response ? <div className={`${styles['review-response']}`}>Response from seller: <div style={{'fontWeight': '100'}}>{review.response}</div></ div> : null}
			<div className={`${styles['review-helpful']}`}>Helpful? <button style={voted ? {'color': 'red'} : {}}  onClick={handleHelpfulness}>Yes</button> <div className={`${styles['helpfulness']}`}>{`(${helpfulness})`}</div></div>
			<div className='review-bar'></div>
		</div>
	);
};

export default Review;