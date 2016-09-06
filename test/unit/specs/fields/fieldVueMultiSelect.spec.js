import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import fieldVueMultiSelect from "src/fields/fieldVueMultiSelect.vue";

Vue.component("fieldVueMultiSelect", fieldVueMultiSelect);

// eslint-disable-next-line
let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldVueMultiSelect", schema, model, disabled, options);
}

describe("fieldVueMultiSelect.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "vueMultiSelect",
			label: "Cities",
			model: "city",
			multiSelect: true,
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
			createField(this, schema, model, false);
			input = el.querySelector(".multiselect");
		});

		it("should contain a select element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("form-control")).to.be.false;
			expect(input.classList.contains("multiselect--disabled")).to.be.false;
		});

		it("should contain option elements", () => {
			let options = input.querySelectorAll("li.multiselect__option");
			expect(options.length).to.be.equal(schema.values.length);
			expect(options[1].querySelector("span").textContent).to.be.equal("Paris");
			expect(options[1].classList.contains("multiselect__option--selected")).to.be.true;
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.classList.contains("multiselect--disabled")).to.be.true;
				field.disabled = false;
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = "Rome";
			vm.$nextTick( () => {
				expect(input.querySelectorAll("li.multiselect__option--selected").length).to.be.equal(1);
				let options = input.querySelectorAll("li.multiselect__option");
				expect(options[2].querySelector("span").textContent).to.be.equal("Rome");
				expect(options[2].classList.contains("multiselect__option--selected")).to.be.true;
				done();
			});
		});

		it("input value should be the model value after changed (multiselection)", (done) => {
			model.city = ["Paris","Rome"];
			vm.$nextTick( () => {
				expect(input.querySelectorAll("li.multiselect__option--selected").length).to.be.equal(2);
				let options = input.querySelectorAll("li.multiselect__option");
				expect(options[1].querySelector("span").textContent).to.be.equal("Paris");
				expect(options[1].classList.contains("multiselect__option--selected")).to.be.true;
				expect(options[2].querySelector("span").textContent).to.be.equal("Rome");
				expect(options[2].classList.contains("multiselect__option--selected")).to.be.true;
				done();
			});
		});

		it("model value should be the input value if changed", (done) => {
			let options = input.querySelectorAll("li.multiselect__option");
			trigger(options[2], "mousedown");

			vm.$nextTick( () => {
				expect(model.city.length).to.be.equal(1);
				expect(model.city[0]).to.be.equal("Paris");
				done();
			});

		});
	});
});