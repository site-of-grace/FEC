/* eslint-disable no-undef */
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
require('dotenv').config();

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public/dist');
const port = process.env.PORT || 3000;
const livePort = process.env.LIVE_PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
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
    filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
    path: DIST_DIR
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        }
      }
    }
  },
  plugins: [
    new EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      template: './public/dist/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: isProduction ? 'static' : 'disabled',
      openAnalyzer: false
    })
  ],
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
          {
            loader: MiniCssExtractPlugin.loader
          },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/
      }
    ]
  }
};
