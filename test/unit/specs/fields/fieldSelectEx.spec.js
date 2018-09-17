import { mount, createLocalVue } from "@vue/test-utils";

import FieldSelectEx from "src/fields/optional/fieldSelectEx.vue";

const localVue = createLocalVue();
let wrapper;
let input;

function createField(data, methods) {
	const _wrapper = mount(FieldSelectEx, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: data
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}
	wrapper = _wrapper;
	input = wrapper.find("select");

	return _wrapper;
}

describe("fieldSelectEx.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "selectEx",
			model: "city",
			label: "Cities",
			disabled: false,
			required: false,
			inputName: "",
			values: ["London", "Paris", "Rome", "Berlin"],
			fieldOptions: {
				multiSelect: false
			}
		};
		let model = { city: "Paris" };

		before(() => {
			createField({ schema, model });
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
			let attributes = ["disabled", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema, "select");
				});
			});
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { city: "Rome" } });

			expect(input.element.value).to.be.equal("Rome");
		});

		it("model value should be the input value if changed", () => {
			input.setValue("London");

			expect(wrapper.props().model.city).to.be.equal("London");
		});

		it("should not be multiple", () => {
			// For multiselect need empty array
			wrapper.setProps({ model: { city: [] } });
			schema.fieldOptions.multiSelect = true;
			wrapper.setProps({ schema: { ...schema } });

			expect(input.attributes().multiple).to.equal("multiple");
			let options = input.findAll("option");

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
			createField({ schema, model });
		});

		it("should contain option elements", () => {
			let options = input.findAll("option");

			expect(options.length).to.be.equal(4 + 1); // +1 for <non selected>
			expect(options.at(2).element.value).to.be.equal("2");
			expect(options.at(2).text()).to.be.equal("Paris");
		});

		it("should contain the value", () => {
			let options = input.findAll("option");
			expect(options.at(2).element.value).to.be.equal("2");
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { city: 3 } });

			expect(input.element.value).to.be.equal("3");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "4";
			input.trigger("change");

			expect(wrapper.props().model.city).to.be.equal(4);
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
			createField({ schema, model });
		});

		it("should contain the value", () => {
			let options = input.findAll("option");
			expect(options.at(2).element.value).to.be.equal("2");
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { city: 3 } });

			expect(input.element.value).to.be.equal("3");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "4";
			input.trigger("change");
			expect(wrapper.props().model.city).to.be.equal(4);
		});
	});
});
