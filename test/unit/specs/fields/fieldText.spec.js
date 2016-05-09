import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldText from "src/fields/fieldText.vue";

Vue.component("FieldText", FieldText);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldText", schema, model, disabled, options);
}

describe("fieldText.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			readonly: false,
			placeholder: "Field placeholder"
		};
		let model = { name: "John Doe" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
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
				expect(input.value).to.be.equal("John Doe");	
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
			model.name = "Jane Doe";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Jane Doe");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "John Smith";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.name).to.be.equal("John Smith");	
				done();
			});

		});

	});

});