import React from 'react';

import {useSelector} from 'react-redux';

const AtrributeBreakdown = () => {
	const metaData = useSelector((state) => state.rating.ratingMeta);
	return (
		<div id='rating-attrBreakdown'>

		</div>
	);
};

export default AtrributeBreakdown;
