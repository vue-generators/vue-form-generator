var path = require("path");
var webpack = require("webpack");
var sourceDir = path.resolve(__dirname, "../../src");

module.exports = {
	devtool: "eval-source-map",
	
	module: {
		/*preLoaders: [
			{
				test: /\.js$/,
				loader: "isparta",
				include: sourceDir,
				exclude: /node_modules/
			}
		],*/

		loaders: [
			{
				"test": /\.vue$/,
				"loader": "vue"
			},
			{
				"test": /\.js$/,
				//"include": /test\/unit/,
				"exclude": /node_modules/,
				"loader": "babel"
			},
			{
				"test": /\.css?$/,
				"loader": "style!css"
			},
			{
				"test": /\.scss?$/,
				"loader": "style!css!sass"
			},
			{
				"test": /\.jade?$/,
				"loader": "jade"
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
		],
		noParse: [
			/node_modules\/sinon\//,
		]
	},

	resolve: {
		packageAlias: "browser",   
		alias: {
			"src": sourceDir,
			"sinon": "sinon/pkg/sinon",
			"vue$": "vue/dist/vue.common.js"
		}
	},
	plugins: [
	],

	vue: {
		autoprefixer: {
			browsers: ["last 2 versions"]
		},

		// Comment out this, if you would like to debug under `npm run ci`
		/*loaders: {
			js: "isparta"
		}*/
	}
 
};
