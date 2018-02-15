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
	extends: ["eslint:recommended", "plugin:vue/base"],
	plugins: ["prettier"],
	rules: {
		indent: ["warn", "tab", { SwitchCase: 1 }],
		quotes: ["warn", "double"],
		semi: ["error", "always"],
		"no-var": ["error"],
		"no-console": ["off"],
		"no-unused-vars": ["warn"],
		"no-throw-literal": 0,
		// TODO reactivate after stabilisation
		eqeqeq: [1, "smart"],
		"spaced-comment": 1,
		"prettier/prettier": 1
	}
};
