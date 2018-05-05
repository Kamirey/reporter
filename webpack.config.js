'use strict'

const webpack = require("webpack");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

let appName = "visualizer";

let plugins = [];
const env = process.env.WEBPACK_ENV;

plugins.push(new VueLoaderPlugin());
if (env === "production") {
	const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

	plugins.push(new UglifyJsPlugin({ minimize: true }));
	plugins.push(new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "production"
			}
		}
	));

	appName = appName + '.min.js';
	}
else {
	appName = appName + '.js';
}

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: appName
	},
	devServer: {
		contentBase: path.join(__dirname, "./build"),
		port: 9000
	}, 
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["es2015"]
				}
			},
			{
				test: /\.vue$/,
				use: "vue-loader"
			}
		]
	},
	resolve: {
		alias: {
			"vue": "vue/dist/vue.esm.js"
		}
	},
	plugins
};