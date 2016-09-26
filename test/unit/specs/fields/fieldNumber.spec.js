import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldNumber from "src/fields/fieldNumber.vue";

Vue.component("FieldNumber", FieldNumber);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldNumber", schema, model, disabled, options);
}


describe("fieldNumber.vue", function() {
	describe("check template", () => {
		let schema = {
			type: "number",
			label: "Age",
			model: "age",
			min: 18,
			max: 100,
			autocomplete:"off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { age: 27 };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input number element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("number");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.min).to.be.equal("18");
			expect(input.max).to.be.equal("100");
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("27");
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
			model.age = 35;
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("35");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "50";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.age).to.be.equal(50);
				done();
			});

		});

	});

});