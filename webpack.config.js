/* eslint-disable no-undef */
var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/public/dist');

module.exports = {
	mode: 'development',
	entry: `${SRC_DIR}/index.js`,
	output: {
		filename: 'bundle.js',
		path: DIST_DIR,
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			}
		]
	}
};