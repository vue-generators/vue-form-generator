import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldEmail from "src/fields/fieldEmail.vue";

Vue.component("FieldEmail", FieldEmail);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldEmail", schema, model, disabled, options);
}


describe("fieldEmail.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "text",
			label: "E-mail",
			model: "email",
			readonly: false,
			placeholder: "Field placeholder"
		};
		let model = { email: "john.doe@company.org" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input email element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("email");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("john.doe@company.org");	
				done();
			});
		});

		it("should set readOnly", (done) => {
			schema.readonly = true;
			vm.$nextTick( () => {
				expect(input.readOnly).to.be.true;	
				done();
			});
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;	
				done();
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