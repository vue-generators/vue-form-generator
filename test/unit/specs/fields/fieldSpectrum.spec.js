import { mount, createLocalVue } from "@vue/test-utils";

import FieldSpectrum from "src/fields/optional/fieldSpectrum.vue";

const localVue = createLocalVue();
let wrapper;
let input;

function createField2(data, methods) {
	const _wrapper = mount(FieldSpectrum, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;
	input = wrapper.find("input");

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
			createField2({ schema, model, disabled: false });
		});

		it("should contain an input color element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
		});

		it.skip("should contain the value", () => {
			expect(wrapper.vm.picker.spectrum("get").toHexString()).to.be.equal("#ff8822");
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it.skip("input value should be the model value after changed", () => {
			model.color = "#ffff00";
			wrapper.update();

			expect(wrapper.vm.picker.spectrum("get").toHexString()).to.be.equal("#ffff00");
		});

		it.skip("model value should be the input value if changed", () => {
			wrapper.vm.picker.spectrum("set", "#123456");
			wrapper.find(".sp-input").trigger("change");

			expect(model.color).to.be.equal("#123456");
		});
	});
});
