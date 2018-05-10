const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[hash].js"
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
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
				loader: "vue-loader",
				options: {
					extractCSS: true
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),
		new ExtractTextPlugin("styles.[chunkhash].css"),
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime"
		}),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				TRACKER_URL: '"http://localhost:8080/"',
			}
		})
	]
};