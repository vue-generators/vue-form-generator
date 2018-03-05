import { mount, createLocalVue } from "@vue/test-utils";

import FieldSelectEx from "src/fields/optional/fieldSelectEx.vue";

const localVue = createLocalVue();
let wrapper;
let input;

function createField2(data, methods) {
	const _wrapper = mount(FieldSelectEx, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;
	input = wrapper.find("select");

	return _wrapper;
}

describe("fieldSelectEx.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "selectEx",
			label: "Cities",
			model: "city",
			disabled: false,
			multiSelect: false,
			required: false,
			inputName: "",
			values: ["London", "Paris", "Rome", "Berlin"]
		};
		let model = { city: "Paris" };

		before(() => {
			createField2({ schema, model, disabled: false });
		});

		it("should contain a select element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.exists()).to.be.true;
		});

		it("should contain option elements", () => {
			let options = input.findAll("option");

			expect(options.length).to.be.equal(4 + 1); // +1 for <non selected>
			expect(options.at(2).element.value).to.be.equal("Paris");
			expect(options.at(2).text()).to.be.equal("Paris");
			expect(options.at(2).element.selected).to.be.true;
		});

		it("should contain a <non selected> element", () => {
			let options = input.findAll("option");

			expect(options.at(0).attributes().disabled).to.be.undefined;
			// expect(options.at(0).text()).to.be.equal("<Not selected>");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal("Paris");
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "multiSelect", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema, "select");
				});
			});
		});

		it("input value should be the model value after changed", () => {
			model.city = "Rome";
			wrapper.update();

			expect(input.element.value).to.be.equal("Rome");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "London";
			input.trigger("change");

			expect(model.city).to.be.equal("London");
		});

		it.skip("should not be multiple", () => {
			model.city = []; // For multiselect need empty array
			schema.multiSelect = true;
			wrapper.update();

			expect(input.attributes().multiple).to.equal("multiple");
			let options = input.findAll("option");
			console.log(options.at(0).html());
			console.log(options.at(1).html());
			console.log(options.at(2).html());
			console.log(options.at(3).html());
			console.log(options.at(4).html());

			expect(options.length).to.be.equal(4); // no <non selected>
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
				{ id: 4, name: "Berlin" }
			]
		};
		let model = { city: [2] };

		before(() => {
			createField2({ schema, model, disabled: false });
		});

		it.skip("should contain option elements", () => {
			let options = input.findAll("option");

			expect(options.length).to.be.equal(4 + 1); // +1 for <non selected>
			expect(options.at(2).element.value).to.be.equal("2");
			expect(options.at(2).text()).to.be.equal("Paris");
			expect(options.at(2).element.selected).to.be.true;
			expect(options.at(1).element.selected).to.be.false;
		});

		it.skip("should contain the value", () => {
			expect(input.element.value).to.be.equal("2");
		});

		it("input value should be the model value after changed", () => {
			model.city = 3;
			wrapper.update();

			expect(input.element.value).to.be.equal("3");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "4";
			input.trigger("change");

			expect(model.city).to.be.equal(4);
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
			}
		};
		let model = { city: [2] };

		before(() => {
			createField2({ schema, model, disabled: false });
			wrapper.update();
		});

		it.skip("should contain the value", () => {
			expect(input.element.value).to.be.equal("2");
		});

		it("input value should be the model value after changed", () => {
			model.city = 3;
			wrapper.update();
			expect(input.element.value).to.be.equal("3");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "4";
			input.trigger("change");
			expect(model.city).to.be.equal(4);
		});
	});
});
