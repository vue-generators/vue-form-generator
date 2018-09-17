import { mount, createLocalVue } from "@vue/test-utils";

import FieldLabel from "src/fields/core/fieldLabel.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldLabel, {
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

	return _wrapper;
}

describe("fieldLabel.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "label",
			label: "Timestamp",
			model: "timestamp",
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { timestamp: "2 days ago" };
		let span;

		before(() => {
			createField({ schema, model });
			span = wrapper.find("span");
		});

		it("should contain a span element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(span.is("span")).to.be.true;
		});

		it("should contain the value", () => {
			expect(span.text()).to.be.equal("2 days ago");
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { timestamp: "Foo bar" } });

			expect(span.text()).to.be.equal("Foo bar");
		});

		it("should have 2 classes", () => {
			expect(span.classes()).to.include("applied-class");
			expect(span.classes()).to.include("another-class");
		});
	});

	describe("check dynamic html attributes", () => {
		describe("check label attributes", () => {
			let schema = {
				type: "label",
				model: "user__model",
				fieldClasses: ["applied-class", "another-class"],
				attributes: {
					label: {
						"data-label": "help-block"
					},
					wrapper: {
						"data-toggle": "collapse"
					},
					input: {
						"data-toggle": "tooltip"
					}
				}
			};
			let model = {};
			let label;

			before(() => {
				createField({ schema, model });
				label = wrapper.find("span");
			});

			it("label should have data-* attribute", () => {
				expect(label.attributes()["data-label"]).to.be.equal("help-block");
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
					"data-label": "help-block",
					"data-wrapper": "collapse",
					"data-input": "tooltip"
				}
			};
			let model = {};
			let label;

			before(() => {
				createField({ schema, model });
				label = wrapper.find("span");
			});

			it("label should have data-* attribute", () => {
				expect(label.attributes()["data-label"]).to.be.equal("help-block");
			});
		});
	});
});
