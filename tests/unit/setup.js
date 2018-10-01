// make expect available globally
global.sinon = require("sinon");
global.expect = require("chai").expect;

const attributesList = {
	// autocomplete: { before: "on", after: "off", name: "autocomplete" },
	disabled: { before: true, after: false, field: true, name: "disabled" },
	// multiSelect: { before: true, after: false, name: "multiple" },
	placeholder: { before: "Field placeholder", after: "", name: "placeholder" },
	readonly: { before: true, after: false, name: "readOnly" },
	inputName: { before: "test-name", after: "", name: "name" }
};

global.checkAttribute = (name, wrapper, schema, type = "input") => {
	let attr = attributesList[name];
	let inputElement = wrapper.find(type).element;

	inputElement[attr.name] = attr.before;
	inputElement[attr.name] = attr.after;
	expect(inputElement[attr.name]).to.be.equal(schema[name]);
};

const { isNil, isFunction } = require("lodash");
global.getValueFromOption = (field, option, defaultValue = false) => {
	if (isFunction(field[option])) {
		return field[option].call(this, this.model, field, this);
	}

	if (isNil(field[option])) {
		return defaultValue;
	}

	return field[option];
};
