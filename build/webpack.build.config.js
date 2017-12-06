let webpack = require("webpack");
let version = require("./package.json").version;
let banner = "/**\n" + " * vue-form-generator v" + version + "\n" + " * https://github.com/icebob/vue-form-generator\n" + " * Released under the MIT License.\n" + " */\n";
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let StatsPlugin = require("stats-webpack-plugin");

let rules = [
	{
		test: /\.js?$/,
		exclude: /node_modules/,
		use: "babel-loader"
	},
	{
		test: /\.vue?$/,
		loader: "vue-loader"
	}
];
let cssFileName;
if (process.env.FULL_BUNDLE !== "false") {
	cssFileName = "vfg.css";
} else {
	cssFileName = "vfg-core.css";
}

module.exports = [
	{
		entry: "./src/index.js",
		output: {
			path: "./dist",
			filename: "vfg.js",
			library: "VueFormGenerator",
			libraryTarget: "umd"
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.BannerPlugin(banner, {
				raw: true
			}),
			new ExtractTextPlugin(cssFileName, { allChunks: true }),
			new StatsPlugin("../stats.json", {
				chunkModules: true
				//exclude: [/node_modules[\\\/]react/]
			})
		],

		module: {
			rules
		},

		vue: {
			loaders: {
				css: ExtractTextPlugin.extract("css"),
				postcss: ExtractTextPlugin.extract("css"),
				sass: ExtractTextPlugin.extract("css!sass")
			}
		},

		resolve: {
			packageAlias: "browser"
		}
	}
];
