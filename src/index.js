module.exports = {
	bootstrap3: require("./layouts/bootstrap3.vue"),
	component: require("./formGenerator.vue"),
	schema: require("./utils/schema.js"),
	validators: require("./utils/validators.js"),
	abstractField: require("./fields/abstractField").default,

	install(Vue) {
		Vue.component("FormGenerator", module.exports.component);
		Vue.component("FormBootstrap3", module.exports.bootstrap3);
	}
};
