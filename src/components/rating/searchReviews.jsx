import React, {useState} from 'react';

import styles from './cssModules/reviewsList.module.css';

const SearchReviews = () => {
	return (
		<div  id={styles['rating-search']} data-testid='rating-search'>
			<label id={styles['rating-searchLabel']}>Search Reviews</label>
			<input type='text' id={styles['rating-searchInput']} data-testid='rating-searchInput'/>
		</div>
	);
};

export default SearchReviews;