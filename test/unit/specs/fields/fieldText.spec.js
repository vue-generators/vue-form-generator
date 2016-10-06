import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldText from "src/fields/fieldText.vue";

Vue.component("FieldText", FieldText);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldText", schema, model, disabled, options);
}

describe("fieldText.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			autocomplete:"off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { name: "John Doe" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("John Doe");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.name = "Jane Doe";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Jane Doe");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "John Smith";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.name).to.be.equal("John Smith");
				done();
			});

		});

	});

});