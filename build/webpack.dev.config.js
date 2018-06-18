const path = require("path");
const webpack = require("webpack");
const projectRoot = path.resolve(__dirname, "../");
const vueLoaderConfig = require("./vue-loader.conf");

let rules = [
	{
		test: /\.(js|vue)$/,
		loader: "eslint-loader",
		enforce: "pre",
		include: [path.resolve("src"), path.resolve("dev")],
		options: {
			formatter: require("eslint-friendly-formatter")
		}
	},
	{
		test: /\.vue$/,
		loader: "vue-loader",
		include: [path.resolve("src"), path.resolve("dev")],
		exclude: /node_modules/,
		options: vueLoaderConfig
	},
	{
		test: /\.js$/,
		loader: "babel-loader",
		include: [path.resolve("src"), path.resolve("dev")],
		exclude: /node_modules/
	},
	{
		test: /\.(woff2?|svg)$/,
		loader: "url-loader",
		include: [path.resolve("src"), path.resolve("dev")]
	},
	{
		test: /\.(ttf|eot)$/,
		loader: "url-loader",
		include: [path.resolve("src"), path.resolve("dev")]
	}
];

module.exports = {
	devtool: "source-map",
	devServer: {
		contentBase: [path.resolve("dev/projects")]
	},
	entry: {
		full: path.resolve("dev", "projects", "full", "main.js"),
		basic: path.resolve("dev", "projects", "basic", "main.js"),
		mselect: path.resolve("dev", "projects", "multiselect", "main.js"),
		grouping: path.resolve("dev", "projects", "grouping", "main.js"),
		checklist: path.resolve("dev", "projects", "checklist", "main.js"),
		picker: path.resolve("dev", "projects", "picker", "main.js")
	},

	output: {
		path: path.resolve("dev/projects"),
		filename: "[name].js",
		publicPath: "/"
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				FULL_BUNDLE: true
			}
		})
	],

	module: {
		rules
	},

	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			"@": path.resolve("src")
		}
	}
};
