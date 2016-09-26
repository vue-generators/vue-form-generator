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
	try { el.dispatchEvent(e); } catch (e) {
		// Ignored
	}
}

export function createVueField(test, type, schema = {}, model = null, disabled = false, options) {
	let elName = Vue.util.hyphenate(type);

	let container = document.createElement("div");		
	container.className = "test-unit";
	document.body.appendChild(container);

	let h2 = document.createElement("h2");
	h2.textContent = test ? "Test: " + test.title : "Test case";
	container.appendChild(h2);

	let el = document.createElement("fieldset");		
	el.className = "vue-form-generator";
	container.appendChild(el);
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

	return [el, vm, field];
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

	vm.$set("schema." + name, attr.before);
	vm.$nextTick(() => {
		if (attr.name) {
			expect(input[attr.name]).to.be.equal(schematic[name]);
		} else {
			expect(input[name]).to.be.equal(schematic[name]);
		}
		vm.$set("schema." + name, attr.after);
		return done();
	});
}
