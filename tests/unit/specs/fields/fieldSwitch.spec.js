import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldSwitch from "@/fields/optional/fieldSwitch.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldSwitch, {
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

describe("FieldSwitch.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "switch",
			label: "Status",
			model: "status",
			disabled: false,
			inputName: "",
			fieldOptions: {
				autocomplete: "off"
			}
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

		describe("check optional attribute", () => {
			let attributes = ["disabled", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("should contain the default On/Off texts", () => {
			let span = wrapper.find("span.label");
			expect(span.attributes()["data-on"]).to.be.equal("On");
			expect(span.attributes()["data-off"]).to.be.equal("Off");
		});

		it("should set disabled", () => {
			schema.disabled = true;
			wrapper.setProps({ schema: { ...schema } });

			expect(input.attributes().disabled).to.be.equal("disabled");

			schema.disabled = false;
			wrapper.setProps({ schema: { ...schema } });
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { status: false } });

			expect(input.element.checked).to.be.false;
		});

		it("model value should be the input value if changed", () => {
			input.element.checked = true;
			input.trigger("change");

			expect(wrapper.props().model.status).to.be.true;
		});
	});

	describe("check template with custom On/Off texts", () => {
		let schema = {
			type: "switch",
			label: "Status",
			model: "status",
			fieldOptions: {
				textOn: "Yes",
				textOff: "No"
			}
		};
		let model = { status: true };

		before(() => {
			createField({ schema, model });
		});

		it("check attributes", () => {
			let span = wrapper.find("span.label");
			expect(span.attributes()["data-on"]).to.be.equal("Yes");
			expect(span.attributes()["data-off"]).to.be.equal("No");
		});
	});

	describe("check template with custom On/Off values", () => {
		let schema = {
			type: "switch",
			model: "sex",
			fieldOptions: {
				textOn: "Female",
				textOff: "Male",
				valueOn: "female",
				valueOff: "male"
			}
		};
		let model = { sex: "female" };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("check input value", () => {
			expect(input.element.checked).to.be.true;
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { sex: "male" } });

			expect(input.element.checked).to.be.false;
		});

		it("model value should be the input value if changed", () => {
			input.element.checked = true;
			input.trigger("change");

			expect(model.sex).to.be.equal("female");
		});
	});
});
