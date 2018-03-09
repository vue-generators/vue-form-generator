let utils = require("./utils");
let isProduction = process.env.NODE_ENV === "production";

module.exports = {
	esModule: false,
	loaders: utils.cssLoaders({
		sourceMap: false,
		extract: isProduction
	})
};
