import React from 'react';

import {useSelector} from 'react-redux';

const AtrributeBreakdown = () => {
	const metaData = useSelector((state) => state.rating.ratingMeta);
	console.log('META DATA ===>', metaData);

	var attributeDivs = [];
	if (metaData.characteristics) {
		var endSize = 245; //barSize - arrowSize
		var attributes = metaData.characteristics;
		var barLables = {};
		barLables.Comfort = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
		barLables.Quality = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
		barLables.Size = ['Too small', 'Perfect', 'Too large'];
		barLables.Width = ['Too small', 'Perfect', 'Too large'];

		for (var key in attributes) {

			var barDivs = [];
			var name = barLables[key];
			for (var i = 0; i < name.length; i++) {
				var textStyle = {'fontSize': '9px', 'marginTop':'4px', 'marginLeft': '12px'};
				if (name[i] === 'Perfect') { //Match wire frame placements
					textStyle['marginLeft'] = '26px';
				}
				if (name[i] === 'Too small') {
					textStyle['marginLeft'] = '0px';
				}
				if (name[i] === 'Too large') {
					textStyle['marginLeft'] = '40px';
				}

				barDivs.push(<div className='rating-attrBarContainer' key={i*10} >
					{name.length === 3 ? <div className='rating-attrBar3'></div> : <div className='rating-attrBar5'></div>}
					<div style={textStyle}>{name[i]}</div>
				</div>);
			}

			var value = attributes[key].value;
			var ratingPercent = (value-1)/4; //So a rating of 1 = 0% and a rating of 5 = 100%
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