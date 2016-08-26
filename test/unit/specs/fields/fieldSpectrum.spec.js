import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldSpectrum from "src/fields/fieldSpectrum.vue";

Vue.component("FieldSpectrum", FieldSpectrum);

// eslint-disable-next-line
let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldSpectrum", schema, model, disabled, options);
}

describe("fieldSpectrum.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "color",
			label: "Color",
			model: "color"
		};
		let model = { color: "#ff8822" };
		let input;

		before( () => {
			createField(this, schema, model, false);
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

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(field.picker.spectrum("get").toHexString()).to.be.equal("#ff8822");	
				done();
			});
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;	
				expect(el.querySelectorAll(".sp-disabled").length).to.be.equal(1);
				field.disabled = false;
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			field.model = { color: "#ffff00" };
			vm.$nextTick( () => {
				expect(field.picker.spectrum("get").toHexString()).to.be.equal("#ffff00");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			field.picker.spectrum("set", "#123456");
			trigger(document.querySelector(".sp-input"), "change");

			vm.$nextTick( () => {
				expect(field.model.color).to.be.equal("#123456");	
				done();
			});

		});

	});

});