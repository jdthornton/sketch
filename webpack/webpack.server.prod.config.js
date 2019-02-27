const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const CONFIG_VARIABLES = require('./config');
const OUTPUT_DIR = path.resolve(__dirname, '../build');

module.exports = {
	name: 'server',
	target: 'node',
	entry: './src/server/index.js',
	mode: 'production',
	output: {
		filename: 'server.js',
		path: OUTPUT_DIR,
		libraryTarget: 'commonjs2',
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
        loader: 'css-loader',
        options: {
          exportOnlyLocals: true,
        }
      }
		],
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.DefinePlugin(CONFIG_VARIABLES)
	],
  externals: [nodeExternals()]
};
