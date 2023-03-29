import React, {useState, useEffect} from 'react';

import {useSelector} from 'react-redux';

const AddReviewMod = () => {
	const mainProduct = useSelector((state) => state.overview.mainProduct);
	const [stars, setStars] = useState([]);
	const [userRating, setUserRating] = useState(0);
	const ratings = ['', 'Poor', 'Fair', 'Average', 'Good', 'Great'];
	const [attributeSelection, setAttributeSelection] = useState([]);
	const [charLeft, setCharLeft] = useState(50);
	const [curImgs, setCurImgs] = useState([]);
	const [validationError, setValidationError] = useState(null);

	const characteristics = {};
	characteristics['Size'] = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
	characteristics['Width'] = ['Too narrow', 'Slighlty narrow', 'Perfect', 'Slightly wide', 'Too wide'];
	characteristics['Comfort'] = ['Uncomfortable', 'Slightly uncomfortable', 'Alright', 'Comfortable', 'Perfect'];
	characteristics['Quality'] = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
	characteristics['Length'] = ['Runs short', 'Runs slighlty short', 'Perfect', 'Runs slightly long', 'Runs long'];
	characteristics['Fit'] = ['Runs tight', 'Runs slighlty tight', 'Perfect', 'Runs slighlty long', 'Runs long'];

	const starHighlight = (id, clicked) => {
		var newStars = [];
		for (var i = 1; i <= 5; i++) {
			if (!clicked || i > id) { //Highlight to hovered
				newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id)} onMouseLeave={starsEmpty} onClick={(e) => {starHighlight(e.target.id, true);}} id={i} key={i} src={i <= id ? './icons/glowingStar.png' : './icons/unfilledStar.png'}></img>);
			} else { //Highlight to clicked
				newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id)} key={i} id={i} src={'./icons/glowingStar.png'}></img>);
			}
		}
		setStars(newStars);
		setUserRating(id);
	};

	const starsEmpty = () => {
		setUserRating(0);
		var newStars = [];
		for (var i = 1; i <= 5; i++) {
			newStars.push(<img className='review-star' onMouseEnter={(e) => starHighlight(e.target.id)} id={i} key={i} src='./icons/unfilledStar.png'></img>);
		}
		setStars(newStars);
	};

	const attributeSelectionCreator = () => {
		var attributes = [];
		for (var attribute in characteristics) {
			var choices = characteristics[attribute];
			var key = 0;
			attributes.push(
				<div className ='attributeSelections'>
					<h3>{attribute}</h3>
					{choices.map((choice) => {
						key++;
						return (
						<div className='attributeSelection' key={key*123}>
							<div>{choice}</div>
							<input type='radio' id={choice + attribute} name={attribute} value={choice}/>
							<label htmlFor={choice + attribute}/>
						</div>);
					})}
				</div>
			);
		}
		setAttributeSelection(attributes);
	};
	useEffect(() => {attributeSelectionCreator(); starsEmpty();},[]);

	const handleTextInput = (e) => {
		setCharLeft(50 - e.target.value.length);
	};

	const handleUpload = (e, changeImage) => {
		var fr = new FileReader();
		fr.readAsDataURL(e.target.files[0]);
		fr.onloadend = () => {
			if (changeImage) {
				var newImgs = [].concat(curImgs);
				newImgs[e.target.id] = fr.result;
				setCurImgs(newImgs);
			} else {
				setCurImgs([fr.result].concat(curImgs));
			}
		};
	};

	const handleSubmit = (e) => {
		setValidationError(null);
		e.preventDefault();
		let form = document.getElementById('rating-input');
		var chosenAttr = {'Size': null, 'Width': null, 'Comfort': null, 'Quality': null, 'Length': null, 'Fit': null};
		var recommended;
		var chosenAmount = 0;
		if (userRating === 0) {
			setValidationError('You did not choose a rating!');
			return;
		}
		Array.from(form.elements).every((curInput) => {
			if (curInput.name === 'recommended' && curInput.checked) {
				recommended = curInput.value;
			}
			if (characteristics[curInput.name]) {
				if (curInput.checked) {
					chosenAmount++;
					chosenAttr[curInput.name] = curInput.value;
				}
			}
			if (curInput.name === 'body') {
				if (curInput.value.length < 50) {
					setValidationError('Review body not long enough minimum of 50 characters required!');
					return false;
				}
			}
			if (curInput.name === 'nickname') {
				if (curInput.value.length < 2) {
					setValidationError('Nickname to short should be atleast 2 characters long');
					return false;
				}
			}
			if (curInput.name === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				var emailWrong = !emailRegex.test(curInput.value);
				if (emailWrong) {
					setValidationError('Email syntax incorrect, see example');
					return false;
				}
			}
			return true;
		});
		if (recommended === undefined) {
			setValidationError('Missing Recommended Selection!');
		} else if (chosenAmount !== 6) {
			setValidationError('Missing Characteristic Selection!');
		}
	};

	return(
		<div id='addReviewMod'>
			<h1>Write Your Review</h1>
			<h2>About the {mainProduct.name}</h2>
			<div className='review-bar'/>
			<h3>Overall Rating</h3>
			{stars}
			<div id='userRatingChoice'>{ratings[userRating]}</div>
			<div className='review-bar'/>
			<form id='rating-input'>
				<h3>Recommended?</h3>
				<div className='coolRadio'>
					No
					<input type='radio' id='rating-input-no' name='recommended' value='no'/>
					<label style={{'marginRight': '10px'}} htmlFor='rating-input-no'/>
					Yes
					<input type='radio' id='rating-input-yes' name='recommended' value='yes'/>
					<label htmlFor='rating-input-yes'/>
					<div className='review-bar'/>
					<h3>Characteristics (mandatory)</h3>
					{attributeSelection}
					<div className='review-bar'/>
				</ div>
				<div>Review Summary</div>
				<textarea name="summary" rows='2' cols='40' maxLength="60" placeholder="Example: Best purchase ever!"/>
				<div>Review Body (mandatory)</div>
				<textarea name="body" rows='16' cols='70' maxLength="1000" placeholder="Why did you like the product or not?" onChange={handleTextInput} required/>
				{charLeft > 0 ? <div>Minimum required characters left [{charLeft}]</div> : <div>Minimum Reached</div>}
				<div className='review-bar'/>
				<div id="rating-imageUpload">
					<h3>Upload your photos</h3>
					{curImgs.length < 5 ? <input style={{'marginBottom': '20px', 'marginLeft': '240px'}} type="file" accept=".png, .jpg, .jpeg" onChange={handleUpload}/> : null}
					{curImgs.map((curImg, idx) => {
						return(
						<div key={idx * 12} style={{'display': 'inline-block', 'marginRight': '20px'}}>
							<input  style={{'position':'absolute', 'display':'inline-block'}} id={idx} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => handleUpload(e, true)}/>
							<img src={curImg}/>
						</div>
						);
					})}
				</div>
				<div className='review-bar'/>
				<h3>What is your nickname (mandatory)</h3>
				<input type="text" placeholder="Example: jackson11!" name="nickname" maxLength="60"/>
				<div>For privacy reasons, do not use your full name or email address</div>
				<h3>Your email (mandatory)</h3>
				<input type="text" placeholder="Example: jackson11@email.com" maxLength="60" name="email"/>
				<div>For authentication reasons, you will not be emailed</div>
				<div className='review-bar'/>
				<div className='review-bar'/>
				<button style={{'marginTop': '20px'}} onClick={handleSubmit}>Submit Review</button>
			</form>
			<div>{validationError}</div>
		</div>
	);
};

export default AddReviewMod;