import React from 'react';

import {useSelector} from 'react-redux';

const AtrributeBreakdown = () => {
	var metaData = useSelector((state) => state.rating.ratingMeta);

	var attributeDivs = [];
	if (metaData.characteristics) {
		var endSize = 245; //barSize - arrowSize
		var attributes = metaData.characteristics;
		var barLables = {};
		barLables.Comfort = ['Uncomfortable', 'Ok', 'Perfect'];
		barLables.Quality = ['Poor', 'As Expected', 'Perfect'];
		barLables.Size = ['Too small', 'Perfect', 'Too large'];
		barLables.Width = ['Narrow', 'Perfect', 'Too large'];
		barLables.Fit = ['Tight', 'Perfect', 'Too Long'];
		barLables.Length = ['Short', 'Perfect', 'Too Long'];

		for (var key in attributes) {

			var barDivs = [];
			var name = barLables[key];

			for (var i = 0; i < name.length; i++) {
				var textStyle = {'textAlign': 'center'};
				if (i === 0) {
					textStyle = {};
				} else if (i === 2) {
					textStyle = {'float': 'right', 'transform': 'translateX(-5px)'};
				}
				barDivs.push(<div className='rating-attrBarContainer' key={i*10} >
					<div className='rating-attrBar3'></div>
					<div style={textStyle} className='rating-attrBarText'>{name[i]}</div>
				</div>);
			}

			var value = attributes[key].value;
			var ratingPercent = (value-1)/4; //So a rating of 1 = 0% and a rating of 5 = 100%
			var marginLeft = endSize * ratingPercent; //Puts arrow in correct spot

			attributeDivs.push(<div className='rating-attrBarSection' key={attributes[key].id}>
				<div style={{'fontSize': '10px', 'color': 'rgb(33, 33, 33)', 'transform': 'translateY(10px)'}}>{key}</div>
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