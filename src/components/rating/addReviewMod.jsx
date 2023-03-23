import React, {useState, useEffect} from 'react';

import {useSelector} from 'react-redux';

const AddReviewMod = () => {
	const mainProduct = useSelector((state) => state.overview.mainProduct);
	const [stars, setStars] = useState([]);
	const [userRating, setUserRating] = useState(0);

	const ratings = ['', 'Poor', 'Fair', 'Average', 'Good', 'Great'];

	var starHighlight = (id, hover) => {
		var newStars = [];
		for (var i = 1; i <= 5; i++) {
			if (hover || i>id) { //Highlight to hovered
				newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id, true)} onMouseLeave={starsEmpty} onClick={(e) => starHighlight(e.target.id)} id={i} key={i} src={i <= id ? './icons/glowingStar.png' : './icons/unfilledStar.png'}></img>);
			} else { //Highlight to clicked
				newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id, true)} key={i} id={i} src={'./icons/glowingStar.png'}></img>);
			}
		}
		setStars(newStars);
		setUserRating(id);
	};

	var starsEmpty = () => {
		setUserRating(0);
		var newStars = [];
		for (var i = 1; i <= 5; i++) {
			newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id, true)} id={i} key={i} src='./icons/unfilledStar.png'></img>);
		}
		setStars(newStars);
	};
	useEffect(starsEmpty ,[]);

	return(
		<div id='addReviewMod'>
			<h1>Write Your Review</h1>
			<h2>About the {mainProduct.name}</h2>
			<div className='review-bar'></div>
			<h3>Overall Rating</h3>
			{stars}
			<div id='userRatingChoice'>{ratings[userRating]}</div>
		</div>
	);
};

export default AddReviewMod;