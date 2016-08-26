import { expect } from "chai";
import { createVueField } from "../util";

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
			max: 10
		};
		let model = { rating: 8 };
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

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.getAttribute("data-disable")).to.be.equal("");	
				field.disabled = false;
				done();
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