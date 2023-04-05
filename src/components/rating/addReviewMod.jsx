import React, {useState, useEffect} from 'react';

import axios from 'axios';

import {useSelector} from 'react-redux';

import styles from './cssModules/addReview.module.css';

const AddReviewMod = ({setUploadInProgress, uploadInProgress}) => {
	const mainProduct = useSelector((state) => state.overview.mainProduct);
	const metaData = useSelector((state) => state.rating.ratingMeta);
	const [stars, setStars] = useState([]);
	const [userRating, setUserRating] = useState(0);
	const ratings = ['', 'Poor', 'Fair', 'Average', 'Good', 'Great'];
	const [attributeSelection, setAttributeSelection] = useState([]);
	const [charLeft, setCharLeft] = useState(50);
	const [validationError, setValidationError] = useState(null);
	const[attrLength, setAttrLength] = useState(0);
	const [curImgs, setCurImgs] = useState([]);
	const [imagesData, setImagesData] = useState([]);
	const [imageError, setImageError] = useState('');

	var characteristics = {};
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
				newStars.push(<img className={`${styles['review-star']}`} onMouseEnter={(e) => starHighlight(e.target.id)} onMouseLeave={starsEmpty} onClick={(e) => {starHighlight(e.target.id, true);}} id={i} key={i} src={i <= id ? './icons/glowingStar.png' : './icons/largeUnfilledStar.png'}></img>);
			} else { //Highlight to clicked
				newStars.push(<img className={`${styles['review-star']}`} onMouseEnter={(e) => starHighlight(e.target.id)} key={i} id={i} src={'./icons/glowingStar.png'}></img>);
			}
		}
		setStars(newStars);
		setUserRating(id);
	};

	const starsEmpty = () => {
		setUserRating(0);
		var newStars = [];
		for (var i = 1; i <= 5; i++) {
			newStars.push(<img className={`${styles['review-star']}`} onMouseEnter={(e) => starHighlight(e.target.id)} id={i} key={i} src='./icons/largeUnfilledStar.png'></img>);
		}
		setStars(newStars);
	};
	const attributeSelectionCreator = () => {
		var attributes = [];
		var length = 0;
		for (var attribute in characteristics) {
			if (!metaData.characteristics[attribute]) { //If the chartaristic is not applicable for this product don't display
				continue;
			}
			length++;
			var choices = characteristics[attribute];
			var key = 0;
			attributes.push(
				<div className ={`${styles['attributeSelections']}`}>
					<h3>{attribute}</h3>
					{choices.map((choice, idx) => {
						key++;
						return (
						<div className ={`${styles['attributeSelection']}`} key={key*123}>
							<div>{choice}</div>
							<input type='radio' id={choice + attribute} name={attribute} value={idx+1}/>
							<label htmlFor={choice + attribute}/>
						</div>);
					})}
				</div>
			);
		}
		setAttrLength(length);
		setAttributeSelection(attributes);
	};
	useEffect(() => {attributeSelectionCreator(); starsEmpty();},[]);

	const handleTextInput = (e) => {
		setCharLeft(50 - e.target.value.length);
	};

	const handleUpload = (e, changeImage) => {
		var file = e.target.files[0];
		if (file.size > 50000) {
			setImageError('Image size is to large![50kb max]');
			return;
		}
		if (imageError) {
			setImageError('');
		}
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onloadend = () => {
			if (changeImage) {
				var newImgs = [].concat(curImgs);
				var newImgsData = [].concat(imagesData);
				newImgsData[e.target.id] = file;
				newImgs[e.target.id] = fr.result;
				setCurImgs(newImgs);
				setImagesData(newImgsData);
			} else {
				setImagesData([file].concat(imagesData));
				setCurImgs([fr.result].concat(curImgs));
			}
		};
	};


	const handleSubmit = (e) => {
		setValidationError(null);
		e.preventDefault();
		let form = document.getElementById('rating-input');
		var chosenAmount = 0;
		var formVals = {characteristics: {}, body: '', summary: '', name: '', email: ''};
		if (userRating === 0) {
			setValidationError('Rating');
			return;
		}
		var error = Array.from(form.elements).every((curInput) => {
			if (curInput.name === 'summary') {
				formVals.summary = curInput.value;
			}
			if (curInput.name === 'recommended' && curInput.checked) {
				if (curInput.value === 'no') {
					formVals.recommend = false;
				} else {
					formVals.recommend = true;
				}
			}
			if (characteristics[curInput.name]) {
				if (curInput.checked) {
					chosenAmount++;
					formVals.characteristics[metaData.characteristics[curInput.name].id] = Number(curInput.value);
				}
			}
			if (curInput.name === 'body') {
				formVals.body = curInput.value;
				if (curInput.value.length < 50) {
					setValidationError('Body [not long enough minimum of 50 characters required]');
					return false;
				}
			}
			if (curInput.name === 'nickname') {
				formVals.name = curInput.value;
				if (curInput.value.length < 2) {
					setValidationError('Nickname [to short should be atleast 2 characters long]');
					return false;
				}
			}
			if (curInput.name === 'email') {
				formVals.email = curInput.value;
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				var emailWrong = !emailRegex.test(curInput.value);
				if (emailWrong) {
					setValidationError('Email [syntax incorrect, see example]');
					return false;
				}
			}
			return true;
		});
		if (formVals.recommend === undefined) {
			setValidationError('Recommended');
			return;
		} else if (chosenAmount !== attrLength) {
			setValidationError('Characteristics [missing inputs]');
			return;
		}
		if (!error) {
			return;
		}
		formVals.rating = Number(userRating);
		sendReview(formVals);
	};

	const handleImageUpload = () => {
		if (imagesData.length === 0) {
			return [];
		}
		var formData = new FormData();
		imagesData.forEach(image => {
			formData.append('images', image);
		});
		return axios.post('/rating/images', formData, {'Authorization': 'multipart/form-data'})
				.then((data) => {
					return data.data;
				})
				.catch((err) => {
					console.log('Server error for image uploaded', err);
					return [];
				});
	};

	const sendReview = async (formVals) => {
		setUploadInProgress(true);
		var urls = await handleImageUpload();
		formVals['photos'] = urls;
		formVals['product_id'] = mainProduct.id;
		axios.post('/rating/reviews', formVals)
		.then(() => {
			setUploadInProgress(false);
			location.reload();
		})
		.catch((err) => {
			console.log('Error from server while posting review', err);
		});
	};

	return(
		<div id={`${styles['addReviewMod']}`}>
			<h1>Write Your Review</h1>
			<h2>About the {mainProduct.name}</h2>
			<div className='review-bar'/>
			<h3>Overall Rating</h3>
			{stars}
			<div id={`${styles['userRatingChoice']}`}>{ratings[userRating]}</div>
			<div className='review-bar'/>
			<form id='rating-input'>
				<h3>Recommended?</h3>
				<div className ={`${styles['coolRadio']}`}>
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
				<div id={`${styles['rating-imageUpload']}`}>
					<h3>Upload your photos</h3>
					<div style={{'color': 'red'}}>{imageError}</div>
					{curImgs.length < 5 ? <input style={{'marginBottom': '20px', 'marginLeft': '240px'}} type="file" accept=".png, .jpg, .jpeg" onChange={handleUpload}/> : null}
					{curImgs.map((curImg, idx) => {
						return(
						<div key={idx * 12} style={{'display': 'inline-block', 'marginRight': '20px'}}>
							<input  style={{'position':'absolute', 'display':'inline-block'}} id={idx} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => handleUpload(e, true)}/>
							<img src={curImg}/>
						</div>);
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
				{!uploadInProgress ? <button style={{'marginTop': '20px'}} onClick={handleSubmit}>Submit Review</button> : null}
			</form>
			{validationError ? <div style={{'color': 'red'}}>You must enter the following: {validationError}</div> : null}
		</div>
	);
};

export default AddReviewMod;