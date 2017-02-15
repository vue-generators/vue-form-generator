import { expect } from "chai";
import { createVueField, checkAttribute } from "../util";

import Vue from "vue";
import FieldRangeSlider from "src/fields/optional/fieldRangeSlider.vue";

Vue.component("FieldRangeSlider", FieldRangeSlider);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldRangeSlider", schema, model, disabled, options);
}

describe("fieldRangeSlider.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "rangeSlider",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10,
			autocomplete:"off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { rating: 8 };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.getAttribute("data-min")).to.be.equal("1");
			expect(input.getAttribute("data-max")).to.be.equal("10");
			expect(input.getAttribute("data-disable")).to.be.null;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				let origin = el.querySelector(".irs-slider.single");
				expect(origin.style.left).to.be.within("70%", "90%");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			field.model = { rating: 3 };
			vm.$nextTick( () => {
				let origin = el.querySelector(".irs-slider.single");
				expect(origin.style.left).to.be.within("20%", "40%");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			field.slider.update({ from: 6 });
			field.slider.callOnChange(field.slider); // trigger changes
			vm.$nextTick( () => {
				expect(field.model.rating).to.be.equal(6);
				done();
			});

		});

	});

});