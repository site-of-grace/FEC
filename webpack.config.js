/* eslint-disable no-undef */
var path = require('path');
require('dotenv').config();
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/public/dist');
const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  devServer: {
    static: './public/dist',
    hot: true,
    port: 5000,
    proxy: {
      '/': {
           target: 'http://localhost:5000',
           router: () => 'http://localhost:' + port,
           logLevel: 'debug' /*optional*/
      }
    },
  },
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // CSS rules
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      }
    ]
  }
};
