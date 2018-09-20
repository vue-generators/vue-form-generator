import { mount, createLocalVue } from "@vue/test-utils";

import FieldCleave from "src/fields/optional/fieldCleave.vue";
import Vue from "vue";
window.Cleave = require("cleave.js");
require("cleave.js/dist/addons/cleave-phone.i18n");

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldCleave, {
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

describe("fieldCleave.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "masked",
			model: "phone",
			label: "Phone",
			disabled: false,
			readonly: false,
			inputName: "",
			placeholder: "",
			fieldOptions: {
				autocomplete: "off",
				phone: true,
				phoneRegionCode: "HU"
			}
		};
		let model = { phone: "30 123 4567" };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain an masked input element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.exists()).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal("30 123 4567");
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "readonly", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { phone: "70 555 4433" } });

			expect(input.element.value).to.be.equal("70 555 4433");
		});

		it("model value should be the input value if changed", (done) => {
			input.setValue("21 888 6655");

			Vue.config.errorHandler = done;
			Vue.nextTick(() => {
				expect(wrapper.props().model.phone).to.be.equal("21 888 6655");
				done();
			});
		});

		it("should be formatted data in model", (done) => {
			wrapper.vm.cleave.setRawValue("301234567");

			expect(input.element.value).to.be.equal("30 123 4567");

			input.trigger("input");

			Vue.config.errorHandler = done;
			Vue.nextTick(() => {
				expect(wrapper.props().model.phone).to.be.equal("30 123 4567");
				done();
			});
		});
	});
});
