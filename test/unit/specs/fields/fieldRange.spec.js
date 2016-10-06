import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldRange from "src/fields/fieldRange.vue";

Vue.component("FieldRange", FieldRange);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldRange", schema, model, disabled, options);
}

describe("fieldRange.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "range",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10,
			autocomplete: "off"
		};
		let model = { rating: 8 };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input range element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("range");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.min).to.be.equal("1");
			expect(input.max).to.be.equal("10");
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("8");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
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