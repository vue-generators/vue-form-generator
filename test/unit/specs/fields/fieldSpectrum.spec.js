import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import FieldSpectrum from "src/fields/fieldSpectrum.vue";

Vue.component("FieldSpectrum", FieldSpectrum);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldSpectrum", schema, model, disabled, options);
}

describe("fieldSpectrum.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "color",
			label: "Color",
			model: "color"
		};
		let model = { color: "#ff8822" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input color element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			//expect(input.classList.contains("form-control")).to.be.true;
			expect(input.disabled).to.be.false;	
		});
		/* TODO
		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("#ff8822");	
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
			model.color = "#ffff00";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("#ffff00");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "#123456";
			trigger(input, "change");

			vm.$nextTick( () => {
				expect(model.color).to.be.equal("#123456");	
				done();
			});

		});*/

	});

});