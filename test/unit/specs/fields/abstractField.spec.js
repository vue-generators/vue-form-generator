//import chai from "chai";
import { expect } from "chai";

//import sinon from "sinon";
//import sinonChai from "sinon-chai";
//chai.use(sinonChai);

import Vue from "vue";
import AbstractField from "src/fields/abstractField";

Vue.component("AbstractField", AbstractField);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false) {
	el = document.createElement("div");		
	el.innerHTML = `<abstract-field :schema="schema" :model="model" :disabled="disabled" v-ref:field></abstract-field>`;
	vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			disabled
		}
	});

	field = vm.$refs.field;
	// console.log(el);

	return [el, vm];
}

describe("abstractField", () => {

	describe("check static value", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name"
		};
		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(schema, model);
		});

		it("should give the model static value", () => {
			expect(field).to.be.exist;
			expect(field.value).to.be.equal("John Doe");
		});

		it("should set new value to model if value changed", () => {
			field.value = "Foo Bar";
			expect(model.name).to.be.equal("Foo Bar");
		});

	});
	
	/*describe("check value as get/set function", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			get(model) {
				return "John Smith"
			},
			set: sinon.spy()
		};
		let model = {};

		beforeEach( () => {
			createField(schema, model);
		});

		it("should give the model static value", () => {
			expect(field).to.be.exist;
			expect(field.value).to.be.equal("John Doe");
		});

		it("should set new value to model if value changed", () => {
			field.value = "Foo Bar";
			expect(model.name).to.be.equal("Foo Bar");
		});

	});*/

});