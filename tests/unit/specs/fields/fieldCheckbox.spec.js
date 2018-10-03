import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldCheckbox from "@/fields/core/fieldCheckbox.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldCheckbox, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: {
			eventBus: new Vue(),
			...data
		}
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}
	wrapper = _wrapper;

	return _wrapper;
}

describe("FieldCheckbox.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "checkbox",
			label: "Status",
			model: "status",
			fieldClasses: ["applied-class", "another-class"],
			fieldOptions: {
				autocomplete: "off"
			},
			disabled: false,
			inputName: ""
		};
		let model = { status: true };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain a checkbox element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("checkbox");
		});

		it("should contain the value", () => {
			expect(input.element.checked).to.be.true;
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { status: false } });

			expect(input.element.checked).to.be.false;
		});

		it("model value should be the input value if changed", () => {
			wrapper.setProps({ model: { status: true } });

			wrapper.setChecked(false);

			expect(wrapper.props().model.status).to.be.false;
		});

		it("should have 2 classes", () => {
			expect(wrapper.classes()).to.include("applied-class");
			expect(wrapper.classes()).to.include("another-class");
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});
	});

	describe("check dynamic html attributes", () => {
		describe("check input/wrapper attributes", () => {
			let schema = {
				type: "checkbox",
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				attributes: {
					wrapper: {
						"data-wrapper": "collapse"
					},
					input: {
						"data-input": "tooltip"
					}
				}
			};
			let model = {};
			let input;

			before(() => {
				createField({ schema, model });
				input = wrapper.find("input");
			});

			it("input should have data-* attribute", () => {
				expect(input.attributes()["data-input"]).to.be.equal("tooltip");
			});
		});

		describe("check non-specific attributes", () => {
			let schema = {
				type: "checkbox",
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				attributes: {
					"data-input": "tooltip"
				}
			};
			let model = {};
			let input;

			before(() => {
				createField({ schema, model });
				input = wrapper.find("input");
			});

			it("input should have data-* attribute", () => {
				expect(input.attributes()["data-input"]).to.be.equal("tooltip");
			});
		});
	});
});
