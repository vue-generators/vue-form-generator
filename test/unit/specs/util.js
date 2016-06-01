import Vue from "vue";

export function trigger (el, event, args) {
	let e = document.createEvent("HTMLEvents");
	e.initEvent(event, true, false);

	if (args) {
		for (let prop in args) {
			e[prop] = args[prop];
		}
	}

	// Due to Firefox bug, events fired on disabled
	// non-attached form controls can throw errors
	try { el.dispatchEvent(e); } catch (e) {
		// Ignored
	}
}

export function createVueField(type, schema = {}, model = null, disabled = false, options) {
	let elName = Vue.util.hyphenate(type);
	let el = document.createElement("div");		
	el.innerHTML = `<${elName} :schema.sync="schema" :model.sync="model" :disabled="disabled" v-ref:field></${elName}>`;
	let vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			disabled,
			options
		}
	});
	let field = vm.$refs.field;
	
	return [ el, vm, field ];
}