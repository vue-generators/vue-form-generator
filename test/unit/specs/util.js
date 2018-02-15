import { expect } from "chai";
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
	try { 
		el.dispatchEvent ? el.dispatchEvent(e) : el.fireEvent("on" + event, e);		
	} catch (e) {
		// Ignored
	}
}

export function createVueField(test, type, schema = {}, model = null, disabled = false, options) {
	let elName = type.replace(/([a-zA-Z])([A-Z])/g, "$1-$2").toLowerCase();

	let container = document.createElement("div");		
	container.className = "test-unit";
	document.body.appendChild(container);

	let h2 = document.createElement("h2");
	h2.textContent = test ? "Test: " + test.title : "Test case";
	container.appendChild(h2);

	let el = document.createElement("fieldset");		
	el.className = "vue-form-generator";
	container.appendChild(el);
	let vm = new Vue({
		template: `<div><${elName} :schema="schema" :model="model" :disabled="disabled" ref="field"></${elName}></div>`,
		data: {
			schema,
			model,
			disabled,
			options
		}
	}).$mount(el);
	let field = vm.$refs.field;

	return [vm.$el, vm, field];
}

export let attributesList = {
	"autocomplete": { before: "on", after: "off" },
	"disabled": { before: true, after: false, field: true },
	"multiSelect": { before: true, after: false, name: "multiple" },
	"placeholder": { before: "Field placeholder", after: "" },
	"readonly": { before: true, after: false, name: "readOnly" },
	"inputName": { before: "test-name", after: "", name: "name" }
};

export function checkAttribute(name, vm, input, field, schema, done) {

	let schematic;
	let attr = attributesList[name];

	if (attr.field) {
		schematic = field;
	} else {
		schematic = schema;
	}

	Vue.set(vm.schema, name, attr.before);
	vm.$nextTick(() => {
		if (attr.name) {
			expect(input[attr.name]).to.be.equal(schematic[name]);
		} else {
			expect(input[name]).to.be.equal(schematic[name]);
		}
		Vue.set(vm.schema, name, attr.after);
		return done();
	});
}
