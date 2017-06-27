import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import fieldVueMultiSelect from "src/fields/optional/fieldVueMultiSelect.vue";
import VueMultiSelect from "vue-multiselect";

Vue.component("fieldVueMultiSelect", fieldVueMultiSelect);
Vue.component("multiselect", VueMultiSelect);

// eslint-disable-next-line
let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[el, vm, field] = createVueField(test, "fieldVueMultiSelect", schema, model, disabled, options);
}

describe("fieldVueMultiSelect.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "vueMultiSelect",
			label: "Cities",
			model: "city",
			required: false,
			values: [
				"London",
				"Paris",
				"Rome",
				"Berlin"
			],
			selectOptions: {
				multiple: true
			}
		};
		let model = { city: "Paris" };
		let input;

		before(() => {
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
			let options = input.querySelectorAll("li.multiselect__element .multiselect__option");
			expect(options.length).to.be.equal(schema.values.length);
			expect(options[1].querySelector("span").textContent).to.be.equal("Paris");
			expect(options[1].classList.contains("multiselect__option--selected")).to.be.true;
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick(() => {
				expect(input.classList.contains("multiselect--disabled")).to.be.true;
				field.disabled = false;
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = "Rome";
			vm.$nextTick(() => {
				expect(input.querySelectorAll("li .multiselect__option--selected").length).to.be.equal(1);
				let options = input.querySelectorAll("li .multiselect__option");
				expect(options[2].querySelector("span").textContent).to.be.equal("Rome");
				expect(options[2].classList.contains("multiselect__option--selected")).to.be.true;
				done();
			});
		});

		it("input value should be the model value after changed (multiselection)", (done) => {
			model.city = ["Paris", "Rome"];
			vm.$nextTick(() => {
				expect(input.querySelectorAll("li .multiselect__option--selected").length).to.be.equal(2);
				let options = input.querySelectorAll("li .multiselect__option");
				expect(options[1].querySelector("span").textContent).to.be.equal("Paris");
				expect(options[1].classList.contains("multiselect__option--selected")).to.be.true;
				expect(options[2].querySelector("span").textContent).to.be.equal("Rome");
				expect(options[2].classList.contains("multiselect__option--selected")).to.be.true;
				done();
			});
		});

		it("model value should be the input value if changed", (done) => {
			let options = input.querySelectorAll("li .multiselect__option");
			trigger(options[2], "mousedown");

			vm.$nextTick(() => {
				expect(model.city.length).to.be.equal(1);
				expect(model.city[0]).to.be.equal("Paris");
				done();
			});

		});

		describe("with objects", () => {
			const option = {
				name: "Vue.js",
				language: "JavaScript"
			};
			let schema = {...schema };
			let model = {
				city: [option]
			};
			schema.values = [{
				name: "Vue.js",
				language: "JavaScript"
			}, {
				name: "Rails",
				language: "Ruby"
			}, {
				name: "Sinatra",
				language: "Ruby"
			}];
			schema.selectOptions = {};
			before(() => {
				createField(this, schema, model, false);
				input = el.querySelector(".multiselect");
			});

			it("model value should work with objects", (done) => {
				schema.selectOptions = { label: "name", trackBy: "name" };
				vm.$nextTick(() => {
					expect(model.city.length).to.be.equal(1);
					expect(model.city[0]).to.be.eql(schema.values[0]);
					done();
				});
			});

			it("options should contain only text specified in label", (done) => {
				schema.selectOptions = { label: "language", trackBy: "language" };
				vm.$nextTick(() => {
					let options = input.querySelectorAll("li .multiselect__option");
					expect(options[0].querySelector("span").textContent).to.be.equal("JavaScript");
					done();
				});
			});

			it("options should contain custom text specified in customLabel", (done) => {
				schema.selectOptions = {
					label: "name",
					trackBy: "name",
					customLabel: ({ name, language }) => {
						return `${name}-${language}`;
					}
				};
				vm.$nextTick(() => {
					let options = input.querySelectorAll("li .multiselect__option");
					expect(options[0].querySelector("span").textContent).to.be.equal("Vue.js-JavaScript");
					done();
				});
			});
		});
	});
});
