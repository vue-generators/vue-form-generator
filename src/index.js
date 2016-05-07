module.exports = {
	component: require("./formGenerator.vue"),
	schema: require("./utils/schema.js"),
	validators: require("./utils/validators.js"),
	
	install(Vue) {
		Vue.component("VueFormGenerator", module.exports.component);
	}
};