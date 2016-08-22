import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import fieldVueMultiSelect from "src/fields/fieldVueMultiSelect.vue";

Vue.component("fieldVueMultiSelect", fieldVueMultiSelect);

// eslint-disable-next-line
let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldVueMultiSelect", schema, model, disabled, options);
}

describe("fieldVueMultiSelect.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "vueMultiSelect",
			label: "Cities",
			model: "city",
			multiSelect: false,
			required: false,
			values: [
				"London",
				"Paris",
				"Rome",
				"Berlin"
			],
			selectOptions: {}
		};
		let model = { city: "Paris" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain a select element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			// expect(input.classList.contains("form-control")).to.be.false;
			// expect(input.disabled).to.be.false;	
		});
	});
});