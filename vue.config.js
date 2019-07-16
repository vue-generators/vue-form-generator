const path = require("path");
const webpack = require("webpack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const version = require("./package.json").version;
const banner = `
/**
 * vue-form-generator ${version}
 * https://github.com/vue-generators/vue-form-generator/
 * Released under the MIT License.
 */
`;

const generateDevProjects = () => {
	const devProjects = JSON.parse(process.env.VUE_APP_DEV_PROJECT);
	let devConfig = {
		index: {
			entry: "./dev/index.js",
			title: "vue-form-generator index"
		}
	};
	devProjects.forEach((projectName) => {
		devConfig[projectName] = {
			entry: `./dev/projects/${projectName}/main.js`,
			template: `./dev/projects/${projectName}/index.html`,
			filename: `${projectName}/index.html`,
			title: `vue-form-generator ${projectName} demo`
		};
	});
	return devConfig;
};

module.exports = {
	baseUrl: process.env.NODE_ENV === "production" ? "" : "/",
	outputDir: process.env.NODE_ENV === "production" ? "dist" : path.resolve("dev/projects"),
	lintOnSave: true,
	runtimeCompiler: false,
	transpileDependencies: [],
	productionSourceMap: false,
	pages: process.env.NODE_ENV !== "development" ? {} : generateDevProjects(),
	chainWebpack: (config) => {
		if (process.env.NODE_ENV === "production") {
			config.plugin("banner").use(webpack.BannerPlugin, [
				{
					banner,
					raw: true,
					entryOnly: true
				}
			]);
			config.plugin("lodash").use(LodashModuleReplacementPlugin, [
				{
					shorthands: true,
					cloning: true,
					currying: true,
					caching: true,
					collections: true,
					exotics: true,
					guards: true,
					metadata: true,
					deburring: true,
					unicode: true,
					chaining: true,
					memoizing: true,
					coercions: true,
					flattening: true,
					paths: true,
					placeholders: true
				}
			]);
		} else if (process.env.NODE_ENV === "test") {
			config.devtool("eval");
			config.module
				.rule("istanbul")
				.test(/\.(js|vue)$/)
				.enforce("post")
				.include.add(path.resolve(__dirname, "/src"))
				.end()
				.use("istanbul-instrumenter-loader")
				.loader("istanbul-instrumenter-loader")
				.options({ esModules: true });
		} else {
			config.resolve.alias.set("vue-form-generator", path.resolve(__dirname, "src"));
		}
	},
	css: {
		modules: false,
		sourceMap: false,
		loaderOptions: {}
	},
	devServer: {
		contentBase: [path.resolve("dev/projects")]
	}
};
