import { expect } from "chai";
import { trigger } from "../util";

import Vue from "vue";
import FieldPassword from "src/fields/fieldPassword.vue";

Vue.component("FieldPassword", FieldPassword);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	el = document.createElement("div");		
	el.innerHTML = `<field-password :schema.sync="schema" :model.sync="model" :disabled="disabled" v-ref:field></field-password>`;
	vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			disabled,
			options
		}
	});

	field = vm.$refs.field;
	//console.log(el);
}

describe("fieldPassword.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "password",
			label: "Password",
			model: "password",
			readonly: false,
			placeholder: "Field placeholder"
		};
		let model = { password: "123456!" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain az input password element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("password");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("123456!");	
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