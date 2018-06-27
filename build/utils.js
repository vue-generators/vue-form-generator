let path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.cssLoaders = function(options) {
	options = options || {};

	let cssLoader = {
		loader: "css-loader",
		options: {
			minimize: process.env.NODE_ENV === "production",
			sourceMap: options.sourceMap
		}
	};

	// generate loader string to be used with extract text plugin
	function generateLoaders(loader, loaderOptions) {
		let loaders = [cssLoader];
		if (loader) {
			loaders.push({
				loader: loader + "-loader",
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			});
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: "vue-style-loader"
			});
		} else {
			return ["vue-style-loader"].concat(loaders);
		}
	}

	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		less: generateLoaders("less"),
		sass: generateLoaders("sass", { indentedSyntax: true }),
		scss: generateLoaders("sass"),
		stylus: generateLoaders("stylus"),
		styl: generateLoaders("stylus")
	};
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
	let output = [];
	let loaders = exports.cssLoaders(options);
	for (let extension in loaders) {
		let loader = loaders[extension];
		output.push({
			test: new RegExp("\\." + extension + "$"),
			use: loader
		});
	}
	return output;
};
