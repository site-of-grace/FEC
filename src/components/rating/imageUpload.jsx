import React, {useState} from 'react';
import axios from 'axios';
const ImageUpload = () => {
	const [curImgs, setCurImgs] = useState([]);
	const [imagesData, setImagesData] = useState([]);
	const [uploaded, setUploaded] = useState(false);
	var handleSubmit = (e) => 	{
		e.preventDefault();
		var formData = new FormData();
		imagesData.forEach(image => {
			formData.append('images', image);
		});
		axios.post('/rating/images', formData, {'Authorization': 'multipart/form-data'}).
				then(() => {
					console.log('image uploaded');
					setUploaded(true);
				})
				.catch((err) => {
					console.log('Server error for image uploaded', err);
				});
	};

	const handleUpload = (e, changeImage) => {
		var file = e.target.files[0];
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

	return(
		<form id="rating-imageUpload">
			<h3>Upload your photos</h3>
			{curImgs.length < 5 && !uploaded? <input style={{'marginBottom': '20px', 'marginLeft': '240px'}} type="file" accept=".png, .jpg, .jpeg" onChange={handleUpload}/> : null}
			{curImgs.map((curImg, idx) => {
				return(
				<div key={idx * 12} style={{'display': 'inline-block', 'marginRight': '20px'}}>
					{!uploaded ? <input  style={{'position':'absolute', 'display':'inline-block'}} id={idx} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => handleUpload(e, true)}/> : null}
					<img src={curImg}/>
				</div>);
				})}
				{!uploaded ? <button onClick={handleSubmit}>Upload</button> : null}
		</form>
	);
};

export default(ImageUpload);