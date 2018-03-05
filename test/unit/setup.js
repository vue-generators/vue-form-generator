// setup JSDOM
require("jsdom-global")();

// make expect available globally
global.sinon = require("sinon");
global.expect = require("chai").expect;

const attributesList = {
	autocomplete: { before: "on", after: "off", name: "autocomplete" },
	disabled: { before: true, after: false, field: true, name: "disabled" },
	multiSelect: { before: true, after: false, name: "multiple" },
	placeholder: { before: "Field placeholder", after: "", name: "placeholder" },
	readonly: { before: true, after: false, name: "readOnly" },
	inputName: { before: "test-name", after: "", name: "name" }
};

global.checkAttribute = (name, wrapper, schema, type = "input") => {
	let attr = attributesList[name];
	let inputElement = wrapper.find(type).element;

	inputElement[attr.name] = attr.before;
	// console.log(inputElement[attr.name], schema[name]);
	inputElement[attr.name] = attr.after;
	// console.log(inputElement[attr.name], schema[name]);
	expect(inputElement[attr.name]).to.be.equal(schema[name]);
};
