import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldSpectrum from "src/fields/optional/fieldSpectrum.vue";

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
			model: "color",
			autocomplete:"off",
			placeholder: "Field placeholder",
			readonly: false
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
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(field.picker.spectrum("get").toHexString()).to.be.equal("#ff8822");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
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