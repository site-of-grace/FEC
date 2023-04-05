import React from 'react';

import {useSelector} from 'react-redux';

import styles from './cssModules/breakdown.module.css';
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
					textStyle = {'transform': 'translateX(40px)'};
				}
				barDivs.push(<div className={`${styles['rating-attrBarContainer']}`} key={i*10} >
					<div className={`${styles['rating-attrBar3']}`}></div>
					<div style={textStyle} className={`${styles['rating-attrBarText']}`}>{name[i]}</div>
				</div>);
			}

			var value = attributes[key].value;
			var ratingPercent = (value-1)/4; //So a rating of 1 = 0% and a rating of 5 = 100%
			var marginLeft = endSize * ratingPercent; //Puts arrow in correct spot

			attributeDivs.push(<div className={`${styles['rating-attrBarSection']}`} key={attributes[key].id}>
				<div style={{'fontSize': '10px', 'color': 'rgb(33, 33, 33)', 'transform': 'translateY(10px)'}}>{key}</div>
				<div className={`${styles['rating-attrArrow']}`} style={{'marginLeft': marginLeft}}>▼</div>
				{barDivs}
			</div>);
		}
	}


	return (
		<div>
			{attributeDivs}
		</div>
	);
};

export default AtrributeBreakdown;