import React from 'react';

import {useSelector} from 'react-redux';

const AddReviewMod = () => {
	const mainProduct = useSelector((state) => state.overview.mainProduct);

	return(
		<div id='addReviewMod'>
			<h1>Write Your Review</h1>
			<h2>About the {mainProduct.name}</h2>
		</div>
	);
};

export default AddReviewMod;