var path = require("path");
var webpack = require("webpack");
var projectRoot = path.resolve(__dirname, '../');

var loaders = [
	{
		test: /\.vue$/,
		loader: 'vue'
	},
	{
		test: /\.js$/,
		loader: 'babel',
		include: projectRoot,
		exclude: /node_modules/
	},
	{
		test: /\.json$/,
		loader: 'json'
	},
	{ 
		test: /\.(woff2?|svg)$/, 
		loader: "url" 
		//loader: "url?limit=10000" 
	},
	{ 
		test: /\.(ttf|eot)$/, 
		loader: "url" 
	}
];

module.exports = {
	devtool: "eval-source-map",
	
	entry: {
		app: path.resolve("dev", "main.js")
	},

	output: {
		path: path.resolve("dev"),
		filename: "[name].js",
		publicPath: "/"
	},

	plugins: [
	],

	module: {
		loaders
	},

	resolve: {
		packageAlias: "browser"
	},

	vue: {
		autoprefixer: {
			browsers: ["last 2 versions"]
		}
	}
};
