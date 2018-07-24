let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let fs = require('fs');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: [
		'./src/js/app.js',
		'./src/scss/app.scss'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/main.js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src/js'),
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(sass|scss)$/,
				include: path.resolve(__dirname, 'src/scss'),
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: true
						}
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}]
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				include: path.resolve(__dirname, 'src/images'),
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]'
					}
				}
			}
		]
	},
	devServer: {
		overlay: true
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './css/app.min.css',
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new CopyWebpackPlugin([
			{
				from: './src/images',
				to: './images'
			}
		])
	]
};