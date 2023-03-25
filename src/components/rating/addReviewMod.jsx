import React, {useState, useEffect} from 'react';

import {useSelector} from 'react-redux';

const AddReviewMod = () => {
	const mainProduct = useSelector((state) => state.overview.mainProduct);
	const [stars, setStars] = useState([]);
	const [userRating, setUserRating] = useState(0);
	const ratings = ['', 'Poor', 'Fair', 'Average', 'Good', 'Great'];
	const [attributeSelection, setAttributeSelection] = useState([]);

	const characteristics = {};
	characteristics['Size'] = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
	characteristics['Width'] = ['Too narrow', 'Slighlty narrow', 'Perfect', 'Slightly wide', 'Too wide'];
	characteristics['Comfort'] = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
	characteristics['Quality'] = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
	characteristics['Length'] = ['Runs short', 'Runs slighlty short', 'Perfect', 'Runs slightly long', 'Runs long'];
	characteristics['Fit'] = ['Runs tight', 'Runs slighlty tight', 'Perfect', 'Runs slighlty long', 'Runs long'];

	var starHighlight = (id, hover) => {
		var newStars = [];
		for (var i = 1; i <= 5; i++) {
			if (hover || i>id) { //Highlight to hovered
				newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id, true)} onMouseLeave={starsEmpty} onClick={(e) => {starHighlight(e.target.id);}} id={i} key={i} src={i <= id ? './icons/glowingStar.png' : './icons/unfilledStar.png'}></img>);
			} else { //Highlight to clicked
				newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id)} key={i} id={i} src={'./icons/glowingStar.png'}></img>);
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

	var attributeSelectionCreator = () => {
		var attributes = [];
		for (var attribute in characteristics) {
			var choices = characteristics[attribute];
			var key = 0;
			attributes.push(
				<form className ='attributeSelections'>
					<h3>{attribute}</h3>
					{choices.map((choice) => {
						key++;
						return (
						<div className='attributeSelection' key={key*123}>
							<input type='radio' id={choice + attribute} name={attribute} value={choice}></input>
							<label htmlFor={choice + attribute}>{choice}</label>
						</div>);
					})}
				</form>
			);
		}
		setAttributeSelection(attributes);
	};
	useEffect(() => {attributeSelectionCreator(); starsEmpty();},[]);

	return(
		<div id='addReviewMod'>
			<h1>Write Your Review</h1>
			<h2>About the {mainProduct.name}</h2>
			<div className='review-bar'></div>
			<h3>Overall Rating</h3>
			{stars}
			<div id='userRatingChoice'>{ratings[userRating]}</div>
			<div className='review-bar'></div>
			<form id='recommendedInput'>
				<h3>Recommended?</h3>
				<input type='radio' id='rating-input-no' name='recommended' value='no'></input>
				<label htmlFor='rating-input-no'>No</label>
				<input type='radio' id='rating-input-yes' name='recommended' value='yes'></input>
				<label htmlFor='rating-input-yes'>Yes</label>
			</form>
			<div className='review-bar'></div>
			<h3>Characteristics</h3>
			{attributeSelection}
		</div>
	);
};

export default AddReviewMod;