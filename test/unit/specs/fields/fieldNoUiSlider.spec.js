import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import fieldNoUiSlider from "src/fields/fieldNoUiSlider.vue";

Vue.component("fieldNoUiSlider", fieldNoUiSlider);

// eslint-disable-next-line
let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldNoUiSlider", schema, model, disabled, options);
}

describe("fieldNoUiSlider.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "range",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10
		};
		let model = { rating: 8 };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByClassName("slider")[0];
		});

		it("should contain a div element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("slider")).to.be.true;			
		});
	});
});
