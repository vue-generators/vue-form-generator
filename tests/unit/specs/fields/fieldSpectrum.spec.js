import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldSpectrum from "@/fields/optional/fieldSpectrum.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldSpectrum, {
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

describe("fieldSpectrum.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "color",
			label: "Color",
			model: "color",
			autocomplete: "off",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { color: "#ff8822" };

		before(() => {
			createField({ schema, model });
		});

		it("should contain an input color element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(wrapper.is("input")).to.be.true;
			expect(wrapper.attributes().type).to.be.equal("text");
		});

		it.skip("should contain the value", () => {
			expect(wrapper.vm.picker.spectrum("get").toHexString()).to.be.equal("#ff8822");
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it.skip("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { color: "#ffff00" } });

			expect(wrapper.vm.picker.spectrum("get").toHexString()).to.be.equal("#ffff00");
		});

		it.skip("model value should be the input value if changed", () => {
			wrapper.vm.picker.spectrum("set", "#123456");
			wrapper.find(".sp-input").trigger("change");

			expect(wrapper.props().model.color).to.be.equal("#123456");
		});
	});
});
