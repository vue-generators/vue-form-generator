import { mount, createLocalVue } from "@vue/test-utils";

import FieldTextArea from "src/fields/core/fieldTextArea.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldTextArea, {
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

describe("fieldTextArea.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "textarea",
			model: "desc",
			label: "Description",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: "",
			fieldClasses: ["applied-class", "another-class"],
			fieldOptions: {
				max: 500
			}
		};
		let model = { desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("textarea");
		});

		it("should contain a textarea element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("textarea")).to.be.true;
			expect(input.classes()).to.include("form-control");
			expect(input.attributes().rows).to.be.equal("2"); // default value is 2
			expect(input.attributes().maxlength).to.be.equal("500");
		});

		it("should change rows to 4", () => {
			schema.fieldOptions.rows = 4;
			wrapper.setProps({ schema: { ...schema } });

			expect(input.attributes().rows).to.be.equal("4");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal(model.desc);
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema, "textarea");
				});
			});
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { desc: "Jane Doe" } });

			expect(input.element.value).to.be.equal("Jane Doe");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "John Smith";
			input.trigger("input");

			expect(wrapper.props().model.desc).to.be.equal("John Smith");
		});

		it("should have 2 classes", () => {
			expect(input.classes()).to.include("applied-class");
			expect(input.classes()).to.include("another-class");
		});
	});
});
