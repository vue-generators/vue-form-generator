import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldSelect from "src/fields/core/fieldSelect.vue";

Vue.component("FieldSelect", FieldSelect);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[el, vm, field] = createVueField(test, "fieldSelect", schema, model, disabled, options);
}


describe("fieldSelect.vue", function () {

	describe("check template", () => {
		let schema = {
			type: "select",
			label: "Cities",
			model: "city",
			required: false,
			values: [
				"London",
				"Paris",
				"Rome",
				"Berlin"
			],
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { city: "Paris" };
		let input;

		before(() => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain a select element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain option elements", () => {
			let options = input.querySelectorAll("option");
			expect(options.length).to.be.equal(4 + 1); // +1 for <non selected>

			expect(options[2].value).to.be.equal("Paris");
			expect(options[2].textContent).to.be.equal("Paris");
			expect(options[2].selected).to.be.true;
		});

		it("should contain a <non selected> element", () => {
			let options = input.querySelectorAll("option");
			expect(options[0].disabled).to.be.false;
			expect(options[0].textContent).to.be.equal("<Nothing selected>");
		});

		it("should contain the value", (done) => {
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("Paris");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "inputName"];

			attributes.forEach(function (name) {
				it("should set " + name, function (done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = "Rome";
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("Rome");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "London";
			trigger(input, "change");

			vm.$nextTick(() => {
				expect(model.city).to.be.equal("London");
				done();
			});

		});

		it("should contain a disabled <non selected> element if required", (done) => {
			schema.required = true;
			vm.$nextTick(() => {
				let options = input.querySelectorAll("option");
				expect(options[0].disabled).to.be.true;
				expect(options[0].textContent).to.be.equal("<Nothing selected>");
				done();
			});
		});

		it("should show the customized <non selected> text", (done) => {
			Vue.set(vm.schema, "selectOptions", {
				noneSelectedText: "Empty list"
			});
			vm.$nextTick(() => {
				let options = input.querySelectorAll("option");
				expect(options[0].disabled).to.be.true;
				expect(options[0].textContent).to.be.equal("Empty list");

				schema.selectOptions = null;

				done();
			});
		});

		it("should hide the customized <non selected> text", (done) => {
			Vue.set(vm.schema, "selectOptions", {
				noneSelectedText: "Empty list",
				hideNoneSelectedText: true
			});
			vm.$nextTick(() => {
				let options = input.querySelectorAll("option");
				expect(options[0].disabled).to.be.false;
				expect(options[0].textContent).to.not.be.equal("Empty list");

				schema.selectOptions = null;

				done();
			});
		});

	});

	describe("check static values with { id, name } objects", () => {
		let schema = {
			type: "select",
			label: "Cities",
			model: "city",
			values: [
				{ id: 1, name: "London" },
				{ id: 2, name: "Paris" },
				{ id: 3, name: "Rome" },
				{ id: 4, name: "Berlin" },
				{ id: 5, name: "Budapest", group: "HUN" },
				{ id: 6, name: "Paks", group: "HUN" },
			]
		};
		let model = { city: 2 };
		let input;

		before(() => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain option elements", () => {
			let options = input.querySelectorAll("option");
			expect(options.length).to.be.equal(6 + 1); // +1 for <non selected>

			expect(options[2].value).to.be.equal("2");
			expect(options[2].textContent).to.be.equal("Paris");
			expect(options[2].selected).to.be.true;
			expect(options[1].selected).to.be.false;
		});

		it("should contain optgroup elements", () => {
			let optgroups = input.querySelectorAll("optgroup");
			expect(optgroups.length).to.be.equal(1);
			expect(optgroups[0].label).to.be.equal("HUN");
		});

		it("should contain option elements in optgroup", () => {
			let og = input.getElementsByTagName("optgroup")[0];
			let options = og.querySelectorAll("option");

			expect(options.length).to.be.equal(2);
			expect(options[0].selected).to.be.false;
			expect(options[1].selected).to.be.false;

			expect(options[1].textContent).to.be.equal("Paks");
			expect(options[1].value).to.be.equal("6");
		});

		it("should contain the value", (done) => {
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("2");
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = 3;
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("3");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "4";
			trigger(input, "change");

			vm.$nextTick(() => {
				expect(model.city).to.be.equal(4);
				done();
			});

		});

	});

	describe("check function values", () => {
		let schema = {
			type: "select",
			label: "Cities",
			model: "city",
			values() {
				return [
					{ id: 1, name: "London" },
					{ id: 2, name: "Paris" },
					{ id: 3, name: "Rome" },
					{ id: 4, name: "Berlin" }
				];
			},
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { city: 2 };
		let input;

		before(() => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain the value", (done) => {
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("2");
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = 3;
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("3");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "4";
			trigger(input, "change");

			vm.$nextTick(() => {
				expect(model.city).to.be.equal(4);
				done();
			});

		});

		it("should have 2 classes", () => {
			expect(input.className.indexOf("applied-class")).not.to.be.equal(-1);
			expect(input.className.indexOf("another-class")).not.to.be.equal(-1);
		});

	});

});