const path = require("path");
const vueLoaderConfig = require("./vue-loader.conf");
const nodeExternals = require("webpack-node-externals");

let rules = [
	{
		test: /\.(js|vue)$/,
		loader: "eslint-loader",
		enforce: "pre",
		include: [path.resolve("src")],
		options: {
			formatter: require("eslint-friendly-formatter")
		}
	},
	{
		test: /\.vue$/,
		loader: "vue-loader",
		include: [path.resolve("src"), path.resolve("test")],
		exclude: /node_modules/,
		options: vueLoaderConfig
	},
	{
		test: /\.js$/,
		loader: "babel-loader",
		include: [path.resolve("src"), path.resolve("test")],
		exclude: /node_modules/
	},
	{
		test: /\.(woff2?|svg)$/,
		loader: "url-loader",
		include: [path.resolve("src"), path.resolve("test")]
	},
	{
		test: /\.(ttf|eot)$/,
		loader: "url-loader",
		include: [path.resolve("src"), path.resolve("test")]
	}
];

module.exports = {
	devtool: "inline-cheap-module-source-map",

	entry: "./src/index.js",

	output: {
		path: path.resolve("dist"),
		filename: "vfg.js",
		library: "VueFormGenerator",
		libraryTarget: "umd"
	},

	module: {
		rules
	},

	plugins: [],

	resolve: {
		aliasFields: ["browser"],
		extensions: [".js", ".vue", ".json"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			src: path.resolve("src")
		}
	},

	externals: [nodeExternals()]
};
