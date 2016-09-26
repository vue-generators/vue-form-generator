import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldPassword from "src/fields/fieldPassword.vue";

Vue.component("FieldPassword", FieldPassword);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldPassword", schema, model, disabled, options);
}


describe("fieldPassword.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "password",
			label: "Password",
			model: "password",
			autocomplete:"off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { password: "123456!" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input password element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("password");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("123456!");
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
			model.password = "J0hnD03!x4";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("J0hnD03!x4");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "pass 1234&";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.password).to.be.equal("pass 1234&");
				done();
			});

		});

	});

});