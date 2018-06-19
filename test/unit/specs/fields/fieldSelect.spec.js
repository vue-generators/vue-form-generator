import { mount, createLocalVue } from "@vue/test-utils";

import FieldSelect from "src/fields/core/fieldSelect.vue";

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldSelect, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldSelect.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "select",
			label: "Cities",
			model: "city",
			required: false,
			disabled: false,
			inputName: "",
			values: ["London", "Paris", "Rome", "Berlin"],
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { city: "Paris" };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("select");
		});

		it("should contain a select element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("select")).to.be.true;
			expect(input.classes()).to.include("form-control");
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
			expect(options.at(0).text()).to.be.equal("<Nothing selected>");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal("Paris");
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "inputName"];

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

		it("should contain a disabled <non selected> element if required", () => {
			schema.required = true;
			wrapper.update();
			let options = input.findAll("option");

			expect(options.at(0).attributes().disabled).to.be.equal("disabled");
			expect(options.at(0).text()).to.be.equal("<Nothing selected>");
		});

		it("should show the customized <non selected> text", () => {
			schema.selectOptions = {
				noneSelectedText: "Empty list"
			};
			wrapper.update();
			let options = input.findAll("option");

			expect(options.at(0).attributes().disabled).to.be.equal("disabled");
			expect(options.at(0).text()).to.be.equal("Empty list");

			schema.selectOptions = null;
			wrapper.update();
		});

		it("should hide the customized <non selected> text", () => {
			schema.selectOptions = {
				noneSelectedText: "Empty list",
				hideNoneSelectedText: true
			};
			wrapper.update();
			let options = input.findAll("option");

			expect(options.at(0).attributes().disabled).to.be.equal("disabled");
			expect(options.at(0).text()).to.not.be.equal("Empty list");

			schema.selectOptions = null;
			wrapper.update();
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
				{ id: 6, name: "Paks", group: "HUN" }
			]
		};
		let model = { city: 2 };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("select");
			wrapper.update();
		});

		it("should contain option elements", () => {
			let options = input.findAll("option");

			expect(options.length).to.be.equal(6 + 1); // +1 for <non selected>
			expect(options.at(2).element.value).to.be.equal("2");
			expect(options.at(2).text()).to.be.equal("Paris");
			expect(options.at(2).element.selected).to.be.true;
			expect(options.at(1).element.selected).to.be.false;
		});

		it("should contain optgroup elements", () => {
			let optgroups = input.findAll("optgroup");

			expect(optgroups.length).to.be.equal(1);
			expect(optgroups.at(0).element.label).to.be.equal("HUN");
		});

		it("should contain option elements in optgroup", () => {
			let og = input.find("optgroup");
			let options = og.findAll("option");

			expect(options.length).to.be.equal(2);
			expect(options.at(0).element.selected).to.be.false;
			expect(options.at(1).element.selected).to.be.false;
			expect(options.at(1).text()).to.be.equal("Paks");
			expect(options.at(1).element.value).to.be.equal("6");
		});

		it("should contain the value", () => {
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
			},
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { city: 2 };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("select");
		});

		it("should contain the value", () => {
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

		it("should have 2 classes", () => {
			expect(input.classes()).to.include("applied-class");
			expect(input.classes()).to.include("another-class");
		});
	});

	describe("check dynamic html attributes", () => {
		describe("check input/wrapper attributes", () => {
			let schema = {
				type: "select",
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				values() {
					return [
						{ id: 1, name: "London" },
						{ id: 2, name: "Paris" },
						{ id: 3, name: "Rome" },
						{ id: 4, name: "Berlin" }
					];
				},
				attributes: {
					wrapper: {
						"data-toggle": "collapse"
					},
					input: {
						"data-toggle": "tooltip"
					}
				}
			};
			let model = {};
			let input;

			before(() => {
				createField2({ schema, model });
				input = wrapper.find("select");
			});

			it("input should have data-toggle attribute", () => {
				expect(input.attributes()["data-toggle"]).to.be.equal("tooltip");
			});
		});

		describe("check non-specific attributes", () => {
			let schema = {
				type: "select",
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				values() {
					return [
						{ id: 1, name: "London" },
						{ id: 2, name: "Paris" },
						{ id: 3, name: "Rome" },
						{ id: 4, name: "Berlin" }
					];
				},
				attributes: {
					"data-toggle": "tooltip"
				}
			};
			let model = {};
			let input;

			before(() => {
				createField2({ schema, model });
				input = wrapper.find("select");
			});

			it("input should have data-toggle attribute", () => {
				expect(input.attributes()["data-toggle"]).to.be.equal("tooltip");
			});
		});
	});
});
