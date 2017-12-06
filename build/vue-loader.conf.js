let utils = require("./utils");
let config = require("../config");
let isProduction = process.env.NODE_ENV === "production";

module.exports = {
	esModule: false,
	loaders: utils.cssLoaders({
		sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
		extract: isProduction
	})
};
