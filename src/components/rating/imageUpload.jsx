import React, {useState, useForm} from 'react';
import axios from 'axios';
const ImageUpload = () => {
	const [curImgs, setCurImgs] = useState([]);

	const handleUpload = (e) => {
		e.preventDefault();
		var file = e.target.files[0];
		var formData = new FormData();
		formData.append('image', file);
		axios.post('/rating/images', formData, {'Authorization': 'multipart/form-data'}).
		then(() => {
			console.log('image uploaded');
		})
		.catch((err) => {
			console.log('Server error for image uploade', err);
		});
	};

	return(
		<form id="rating-imageUpload">
			<h3>Upload your photos</h3>
			<input name='image' style={{'marginBottom': '20px', 'marginLeft': '240px'}} type="file" accept=".png, .jpg, .jpeg" onChange={handleUpload}/>
	</form>
	);
};

export default(ImageUpload);