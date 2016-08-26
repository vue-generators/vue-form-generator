import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldCleave from "src/fields/fieldCleave.vue";

Vue.component("FieldCleave", FieldCleave);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldCleave", schema, model, disabled, options);
}

describe("fieldCleave.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "masked",
			label: "Phone",
			model: "phone",
			phone: true,
			phoneRegionCode: "HU",
			readonly: false,
			placeholder: "Field placeholder"
		};
		let model = { phone: "(30) 123-4567" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an masked input element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("(30) 123-4567");	
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
			model.phone = "(70) 555-4433";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("(70) 555-4433");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "(21) 888-6655";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.phone).to.be.equal("(21) 888-6655");	
				done();
			});

		});

	});

});