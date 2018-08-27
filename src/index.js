const component = require("./formGenerator.vue").default;
const schema = require("./utils/schema.js");
const validators = require("./utils/validators.js").default;
const fieldComponents = require("./utils/fieldsLoader").default;
const abstractField = require("./fields/abstractField").default;
const install = (Vue) => {
	Vue.component("VueFormGenerator", module.exports.component);
};

module.exports = {
	component,
	schema,
	validators,
	abstractField,
	fieldComponents,
	install
};
