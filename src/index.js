const component = require("./formGenerator.vue").default;
const schema = require("./utils/schema.js");
const validators = require("./utils/validators.js").default;
const abstractField = require("./fields/abstractField").default;
const install = Vue => {
	Vue.component("VueFormGenerator", module.exports.component);
};

const forEach = require("lodash").forEach;

let fieldComponents = {};

let coreFields = require.context("./fields/core", false, /^\.\/field([\w-_]+)\.vue$/);

forEach(coreFields.keys(), key => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	fieldComponents[compName] = coreFields(key).default;
});

if (process.env.FULL_BUNDLE) {
	let Fields = require.context("./fields/optional", false, /^\.\/field([\w-_]+)\.vue$/);

	forEach(Fields.keys(), key => {
		let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
		fieldComponents[compName] = Fields(key).default;
	});
}

module.exports = {
	component,
	schema,
	validators,
	abstractField,
	fieldComponents,
	install
};
