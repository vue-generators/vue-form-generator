import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldSwitch from "src/fields/optional/fieldSwitch.vue";

Vue.component("FieldSwitch", FieldSwitch);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldSwitch", schema, model, disabled, options);
}

describe("FieldSwitch.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "switch",
			label: "Status",
			model: "status"
		};
		let model = { status: true };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.querySelector("input");
		});

		it("should contain a checkbox element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("checkbox");
			expect(input.disabled).to.be.false;
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

		it("should contain the default On/Off texts", () => {
			let span = field.$el.querySelector("span.label");
			expect(span.getAttribute("data-on")).to.be.equal("On");
			expect(span.getAttribute("data-off")).to.be.equal("Off");
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;
				field.disabled = false;
				done();
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

	});

	describe("check template with custom On/Off texts", () => {
		let schema = {
			type: "switch",
			label: "Status",
			model: "status",
			textOn: "Yes",
			textOff: "No"
		};
		let model = { status: true };

		before( () => {
			createField(this, schema, model, false);
		});

		it("check attributes", () => {
			let span = field.$el.querySelector("span.label");
			expect(span.getAttribute("data-on")).to.be.equal("Yes");
			expect(span.getAttribute("data-off")).to.be.equal("No");
		});

	});

	describe("check template with custom On/Off values", () => {
		let schema = {
			type: "switch",
			model: "sex",
			textOn: "Female",
			textOff: "Male",
			valueOn: "female",
			valueOff: "male"
		};
		let model = { sex: "female" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.querySelector("input");
		});

		it("check input value", (done) => {
			vm.$nextTick( () => {
				expect(input.checked).to.be.true;
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.sex = "male";
			vm.$nextTick( () => {
				expect(input.checked).to.be.false;
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.checked = true;
			trigger(input, "click");

			vm.$nextTick( () => {
				expect(model.sex).to.be.equal("female");
				done();
			});

		});

	});

});