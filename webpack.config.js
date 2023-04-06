/* eslint-disable no-undef */
var path = require('path');
require('dotenv').config();
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/public/dist');
const port = process.env.PORT || 3000;
const livePort = process.env.LIVE_PORT || 5000;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.jsx$|\.css$/, // Compress only JS and CSS files
      threshold: 10240, // Only compress files larger than 10 KB
      minRatio: 0.8, // Only compress files if the compression ratio is at least 80%
    }),
  ],
  devServer: {
    static: './public/dist',
    hot: true,
    port: livePort,
    proxy: {
      '/': {
        target: 'http://localhost:' + livePort,
        router: () => 'http://localhost:' + port,
        logLevel: 'debug' /*optional*/
      }
    }
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
