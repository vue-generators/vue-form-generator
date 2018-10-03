let fieldComponents = {};

let coreFields = require.context("../fields/core", false, /^\.\/field([\w-_]+)\.vue$/);

const getCompName = (key) => {
	return key.replace(/^\.\//, "").replace(/\.vue/, "");
};

coreFields.keys().forEach((key) => {
	fieldComponents[getCompName(key)] = coreFields(key).default;
});

if (process.env.VUE_APP_FULL_BUNDLE === "true") {
	let optionalFields = require.context("../fields/optional", false, /^\.\/field([\w-_]+)\.vue$/);

	optionalFields.keys().forEach((key) => {
		fieldComponents[getCompName(key)] = optionalFields(key).default;
	});
}

export default fieldComponents;
