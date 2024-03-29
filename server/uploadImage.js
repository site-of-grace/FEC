require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey
});

var imagesUpload = function (file) {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
		ContentType: 'image/jpeg'
	};

	return s3.upload(uploadParams).promise();
};
module.exports = imagesUpload;

