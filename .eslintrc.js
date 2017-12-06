module.exports = {
	root: true,
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module"
	},
	env: {
		browser: true,
		commonjs: true
	},
	globals: {
		process: true
	},
	extends: ["eslint:recommended", "prettier"],
	plugins: ["html", "prettier"],
	rules: {
		indent: ["warn", "tab", { SwitchCase: 1 }],
		quotes: ["warn", "double"],
		semi: ["error", "always"],
		"no-var": ["error"],
		"no-console": ["off"],
		"no-unused-vars": ["warn"],
		// TODO reactivate after stabilisation
		"no-throw-literal": 0,
		eqeqeq: [0, "smart"],
		"spaced-comment": 0,
		"prettier/prettier": 0
	}
};
