module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	parserOptions: {
		sourceType: "module",
		parser: "babel-eslint"
	},
	env: {
		browser: true,
		commonjs: true
	},
	globals: {
		process: true
	},
	extends: ["eslint:recommended", "plugin:vue/essential"],
	plugins: ["prettier"],
	rules: {
		indent: [1, "tab", { SwitchCase: 1 }],
		quotes: [1, "double", { allowTemplateLiterals: true }],
		semi: [2, "always"],
		"no-var": [2],
		"no-console": [0],
		"no-unused-vars": [1],
		"no-throw-literal": 0,
		eqeqeq: [2, "smart"]
	}
};
