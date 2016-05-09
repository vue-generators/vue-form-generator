import { expect } from "chai";
import { trigger } from "../util";

import Vue from "vue";
import FieldTextArea from "src/fields/fieldTextArea.vue";

Vue.component("FieldTextArea", FieldTextArea);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	el = document.createElement("div");		
	el.innerHTML = `<field-text-area :schema.sync="schema" :model.sync="model" :disabled="disabled" v-ref:field></field-text-area>`;
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
	console.log(el);
}

describe("fieldTextArea.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "textarea",
			label: "Description",
			model: "desc",
			readonly: false,
			placeholder: "Field placeholder",
			max: 500
		};
		let model = { desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("textarea")[0];
		});

		it("should contain az input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
			expect(input.rows).to.be.equal(2);	// default value is 2
			expect(input.maxLength).to.be.equal(500);	
		});

		it("should change rows to 4", (done) => {
			field.$set("schema.rows", 4); // To be reactive
			vm.$nextTick( () => {
				expect(input.rows).to.be.equal(4);	
				done();
			});
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal(model.desc);	
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
			model.desc = "Jane Doe";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Jane Doe");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "John Smith";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.desc).to.be.equal("John Smith");	
				done();
			});

		});

	});

});