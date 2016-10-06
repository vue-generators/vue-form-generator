import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldEmail from "src/fields/fieldEmail.vue";

Vue.component("FieldEmail", FieldEmail);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldEmail", schema, model, disabled, options);
}


describe("fieldEmail.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "text",
			label: "E-mail",
			model: "email",
			autocomplete: "off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { email: "john.doe@company.org" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input email element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("email");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("john.doe@company.org");
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
			model.email = "john.doe@gmail.com";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("john.doe@gmail.com");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "john.smith@company.org";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.email).to.be.equal("john.smith@company.org");
				done();
			});

		});

	});

});