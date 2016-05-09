import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldSlider from "src/fields/fieldSlider.vue";

Vue.component("FieldSlider", FieldSlider);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldSlider", schema, model, disabled, options);
}

describe("fieldSlider.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "range",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10,
			placeholder: "Field placeholder"
		};
		let model = { rating: 8 };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("input")[0];
			//console.log(input);
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.getAttribute("data-slider-min")).to.be.equal("1");	
			expect(input.getAttribute("data-slider-max")).to.be.equal("10");	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.getAttribute("data-slider-value")).to.be.equal("8");	
				expect(input.value).to.be.equal("8");	
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
			model.rating = 3;
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("3");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "6";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.rating).to.be.equal(6);	
				done();
			});

		});

	});

});