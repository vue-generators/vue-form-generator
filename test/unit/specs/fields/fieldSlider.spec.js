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

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.getAttribute("data-disable")).to.be.equal("");	
				done();
			});
		});

	});

});