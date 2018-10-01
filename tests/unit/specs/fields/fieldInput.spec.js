import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import fieldInput from "@/fields/core/fieldInput.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(fieldInput, {
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

describe("fieldInput.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "input",
			model: "name",
			label: "Name",
			autocomplete: "off",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: "",
			fieldOptions: {
				inputType: "text"
			},
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { name: "John Doe" };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal("John Doe");
		});

		let inputTypes = new Map([
			["text", ["disabled", "placeholder", "readonly", "inputName"]],
			["password", ["disabled", "placeholder", "readonly", "inputName"]],
			// ["checkbox", [ "disabled", "inputName"]],
			// ["radio", [] ],
			// ["button", [] ],
			// ["submit", [] ],
			// ["reset", [] ],
			// ["file", [] ],
			// ["hidden", [] ],
			// ["image", [] ],
			// ["datetime",  ],
			// ["datetime", ],
			// ["date", ],
			// ["month", ],
			// ["time", ],
			// ["week", ],
			["number", ["disabled", "placeholder", "readonly", "inputName"]],
			// ["range", ["autocomplete"]],
			["email", ["disabled", "placeholder", "readonly", "inputName"]],
			["url", ["disabled", "placeholder", "readonly", "inputName"]],
			// ["search", ],
			["tel", ["disabled", "placeholder", "readonly", "inputName"]]

			// TODO: re-implement this test
			// ["color", [ "inputName"]]
		]);
		for (let [inputType, attributes] of inputTypes) {
			describe("change type of input", () => {
				it("should become a " + inputType, () => {
					schema.fieldOptions.inputType = inputType;
					wrapper.setProps({ schema: { ...schema } });

					expect(input.attributes().type).to.be.equal(inputType);
				});

				describe("check optional attribute", () => {
					attributes.forEach((name) => {
						it("should set " + name, () => {
							checkAttribute(name, wrapper, schema);
						});
					});
				});
			});
		}

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { name: "Jane Doe" } });

			expect(input.element.value).to.be.equal("Jane Doe");
		});

		it("model value should be the input value if changed", () => {
			input.setValue("John Smith");

			expect(wrapper.props().model.name).to.be.equal("John Smith");
		});

		it("should have 2 classes", () => {
			expect(input.classes()).to.include("applied-class");
			expect(input.classes()).to.include("another-class");
		});
	});

	describe("check dynamic html attributes", () => {
		describe("check input/wrapper attributes", () => {
			let schema = {
				type: "input",
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				fieldOptions: {
					inputType: "text"
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
			let input, wrap;

			before(() => {
				createField({ schema, model });
				input = wrapper.find("input");
				wrap = wrapper.find(".wrapper");
			});

			it("wrapper should have data-toggle attribute", () => {
				expect(wrap.attributes()["data-toggle"]).to.be.equal("collapse");
			});

			it("input should have data-toggle attribute", () => {
				expect(input.attributes()["data-toggle"]).to.be.equal("tooltip");
			});
		});

		describe("check non-specific attributes", () => {
			let schema = {
				type: "input",
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				fieldOptions: {
					inputType: "text"
				},
				attributes: {
					"data-toggle": "tooltip"
				}
			};
			let model = {};
			let input;

			before(() => {
				createField({ schema, model });
				input = wrapper.find("input");
			});

			it("input should have data-toggle attribute", () => {
				expect(input.attributes()["data-toggle"]).to.be.equal("tooltip");
			});
		});
	});
});
