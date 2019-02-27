const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const CONFIG_VARIABLES = require('./config');
const OUTPUT_DIR = path.resolve(__dirname, '../dist');

module.exports = {
	name: 'client',
	entry: {
		vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'redux-saga', 'react-redux'],
		main: ['./src/client/index.js',],
	},
	mode: 'production',
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: "js/[id].[hash].js",
		path: OUTPUT_DIR,
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendor',
					chunks: 'initial',
					minChunks: 2,
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
        test: /\.css$/,
				use: [
           MiniCssExtractPlugin.loader,
           {
             loader: "css-loader",
             options: {
               modules: true,
               sourceMap: true,
               importLoader: 2
             }
           },
        ]
      }
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: 'css/[name]-[hash:8].css',
    }),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true,
		}),
		new HTMLWebpackPlugin({
			inject: false,
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/client/index.ejs'),
			minify: {
				collapseBooleanAttributes: true,
				removeComments: true,
				collapseWhitespace: true,
			}
		}),
		new webpack.DefinePlugin(CONFIG_VARIABLES),
		new CompressionPlugin({
			algorithm: 'gzip',
		}),
		new BrotliPlugin(),
		new LoadablePlugin(),
		new SWPrecacheWebpackPlugin({
			filename: 'serviceWorker.js',
			minify: true,
			staticFileGlobsIgnorePatterns: [/loadable-stats\.json$/, /manifest\.json$/]
		})
	]
};
