import { mount, createLocalVue } from "@vue/test-utils";

import FieldCleave from "src/fields/optional/fieldCleave.vue";

window.Cleave = require("cleave.js");
require("cleave.js/dist/addons/cleave-phone.i18n");

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldCleave, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldCleave.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "masked",
			label: "Phone",
			model: "phone",
			autocomplete: "off",
			disabled: false,
			readonly: false,
			inputName: "",
			placeholder: "",
			cleaveOptions: {
				phone: true,
				phoneRegionCode: "HU"
			}
		};
		let model = { phone: "30 123 4567" };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
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
			let attributes = ["autocomplete", "disabled", "readonly", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			model.phone = "70 555 4433";
			wrapper.update();

			expect(input.element.value).to.be.equal("70 555 4433");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "21 888 6655";
			input.trigger("input");
			wrapper.update();

			expect(model.phone).to.be.equal("21 888 6655");
		});

		it("should be formatted data in model", () => {
			wrapper.vm.cleave.setRawValue("301234567");

			expect(input.element.value).to.be.equal("30 123 4567");

			input.trigger("input");
			wrapper.update();

			expect(model.phone).to.be.equal("30 123 4567");
		});
	});
});
