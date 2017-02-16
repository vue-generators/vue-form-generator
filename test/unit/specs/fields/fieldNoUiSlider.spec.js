import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import fieldNoUiSlider from "src/fields/optional/fieldNoUiSlider.vue";

Vue.component("fieldNoUiSlider", fieldNoUiSlider);

// eslint-disable-next-line
let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldNoUiSlider", schema, model, disabled, options);
}

describe("fieldNoUiSlider.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "noUiSlider",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10
		};
		let model = { rating: 8 };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByClassName("slider")[0];
		});

		it("should contain a div element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("slider")).to.be.true;
			expect(input.disabled).to.be.undefined;
		});

		it("should contain an handle element", (done) => {
			if (window.noUiSlider) {
				vm.$nextTick( () => {
					let handle = input.querySelector(".noUi-handle");
					expect(handle).to.be.defined;
					expect(input.classList.contains("noUi-target")).to.be.true;
					done();
				});
			} else {
				// eslint-disable-next-line
				throw new Exception("Library is not loaded");
			}
		});

		it.skip("should contain the value", (done) => {
			setTimeout( () => {
				let origin = input.querySelector(".noUi-origin");
				expect(origin.style.left).to.be.within("70%", "90%");
				done();
			}, 100);
		});

		it("handle value should be the model value after changed", (done) => {
			field.model = { rating: 10 };
			setTimeout( () => {
				let origin = input.querySelector(".noUi-origin");
				expect(origin.style.left).to.be.equal("100%");
				done();
			}, 100);
		});

		it("model value should be the handle value after changed", (done) => {
			field.onChange(3);
			setTimeout( () => {
				expect(field.model.rating).to.be.equal(3);
				done();
			}, 100);
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				// This is not real input, it is a div. So we can check the disabled attribute
				expect(input.hasAttribute("disabled")).to.be.true;
				done();
			});
		});
	});
});
