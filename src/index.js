module.exports = {
	component: require("./formGenerator.vue"),
	schema: require("./utils/schema.js"),
	validators: require("./utils/validators.js"),
	
	install(Vue, options) {
		Vue.component("VueFormGenerator", module.exports.component);
	}
};