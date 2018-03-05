import { mount, createLocalVue } from "@vue/test-utils";

import FieldMasked from "src/fields/optional/fieldMasked.vue";
let jQuery = require("jquery");
let $ = jQuery(window);
global.$ = $;

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldMasked, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldMasked.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "masked",
			label: "Phone",
			model: "phone",
			mask: "(99) 999-9999",
			autocomplete: "off",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { phone: "(30) 123-4567" };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it("should contain an masked input element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal("(30) 123-4567");
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			model.phone = "(70) 555- 4433";
			wrapper.update();

			expect(input.element.value).to.be.equal("(70) 555- 4433");
		});

		it("model value should be the input value if changed", () => {
			input.element.value = "(21) 888-6655";
			input.trigger("input");

			expect(model.phone).to.be.equal("(21) 888-6655");
		});

		it.skip("should be formatted data in model", done => {
			input.element.value = "123456789";
			// Call the paste event what trigger the formatter
			let $input = jQuery(input.element);
			$input.trigger(jQuery.Event("paste"));

			setTimeout(() => {
				expect(input.element.value).to.be.equal("(12) 345-6789");
				input.trigger("input");

				expect(model.phone).to.be.equal("(12) 345-6789");
				done();
			}, 10);
		});
	});
});
