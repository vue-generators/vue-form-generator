import { expect } from "chai";
import { trigger } from "../util";

import Vue from "vue";
import FieldCheckbox from "src/fields/fieldCheckbox.vue";

Vue.component("FieldCheckbox", FieldCheckbox);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	el = document.createElement("div");		
	el.innerHTML = `<field-checkbox :schema.sync="schema" :model.sync="model" :disabled="disabled" v-ref:field></field-checkbox>`;
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

describe("FieldCheckbox.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "checkbox",
			label: "Status",
			model: "status",
			readonly: false
		};
		let model = { status: true };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain az input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("checkbox");
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.checked).to.be.true;	
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
			model.status = false;
			vm.$nextTick( () => {
				expect(input.checked).to.be.false;	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.checked = true;
			trigger(input, "change");

			vm.$nextTick( () => {
				expect(model.status).to.be.true;	
				done();
			});

		});

	});

});