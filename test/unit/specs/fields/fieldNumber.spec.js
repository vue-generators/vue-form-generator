import { expect } from "chai";
import { createVueField, trigger } from "../util";

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
			readonly: false,
			min: 18,
			max: 100,
			placeholder: "Field placeholder"
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
			expect(input.readOnly).to.be.false;	
			expect(input.min).to.be.equal("18");	
			expect(input.max).to.be.equal("100");	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("27");	
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