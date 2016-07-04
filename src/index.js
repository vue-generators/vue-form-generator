module.exports = {
	component: require("./formGenerator.vue"),
	schema: require("./utils/schema.js"),
	validators: require("./utils/validators.js"),

    get editField() {
        return module.exports.component.computed.editField;
    },
	
	install(Vue) {
		Vue.component("VueFormGenerator", module.exports.component);
	}
};