import React from 'react';

import {useSelector} from 'react-redux';

const AtrributeBreakdown = () => {
	const metaData = useSelector((state) => state.rating.ratingMeta);
	console.log('META DATA ===>', metaData);

	var attributeDivs = [];
	if (metaData.characteristics) {
		var endSize = 240; //barSize - arrowSize
		var attributes = metaData.characteristics;
		for (var key in attributes) {

			var barDivs = [];
			var barLables = ['Too small', 'Perfect', 'Too large'];
			for (var i = 0; i < 3; i++) {
				barDivs.push(<div className='rating-attrBarContainer' key={i*10} >
					<div className='rating-attrBar'></div>
					<div style={{'fontSize': '10px', 'marginTop':'4px'}}>{barLables[i]}</div>
				</div>);
			}

			var value = attributes[key].value;

			var ratingPercent = value/6; //Using 6 since 3 is middle
			var marginLeft = endSize * ratingPercent; //Puts arrow in correct spot

			attributeDivs.push(<div className='rating-attrBarSection' key={attributes[key].id}>
				<div style={{'fontSize': '10px'}}>{key}</div>
				<div className='rating-attrArrow' style={{'marginLeft': marginLeft}}>▼</div>
				{barDivs}
			</div>);
		}
	}


	return (
		<div id='rating-attrBreakdown'>
			{attributeDivs}
		</div>
	);
};

export default AtrributeBreakdown;