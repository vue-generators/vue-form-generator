import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldCheckbox from "src/fields/core/fieldCheckbox.vue";

Vue.component("FieldCheckbox", FieldCheckbox);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldCheckbox", schema, model, disabled, options);
}

describe("FieldCheckbox.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "checkbox",
			label: "Status",
			model: "status",
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { status: true };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain a checkbox element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("checkbox");
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.checked).to.be.true;
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.status = false;
			vm.$nextTick( () => {
				expect(input.checked).to.be.false;
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.checked = true;
			trigger(input, "click");

			vm.$nextTick( () => {
				expect(model.status).to.be.true;
				done();
			});

		});

		it("should have 2 classes", () => {
			expect(input.className.indexOf("applied-class")).not.to.be.equal(-1);
			expect(input.className.indexOf("another-class")).not.to.be.equal(-1);
		});

	});

});