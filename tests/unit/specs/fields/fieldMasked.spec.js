import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldMasked from "@/fields/optional/fieldMasked.vue";
let jQuery = require("jquery");
let $ = jQuery(window);
global.$ = $;

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldMasked, {
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

describe("fieldMasked.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "masked",
			label: "Phone",
			model: "phone",
			fieldOptions: {
				mask: "(99) 999-9999"
			},
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { phone: "(30) 123-4567" };
		let input;

		before(() => {
			createField({ schema, model });
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
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { phone: "(70) 555- 4433" } });

			expect(input.element.value).to.be.equal("(70) 555- 4433");
		});

		it("model value should be the input value if changed", () => {
			input.setValue("(21) 888-6655");

			expect(wrapper.props().model.phone).to.be.equal("(21) 888-6655");
		});

		it.skip("should be formatted data in model", (done) => {
			input.element.value = "123456789";
			// Call the paste event what trigger the formatter
			let $input = jQuery(input.element);
			$input.trigger(jQuery.Event("paste"));

			setTimeout(() => {
				expect(input.element.value).to.be.equal("(12) 345-6789");
				input.trigger("input");

				expect(wrapper.props().model.phone).to.be.equal("(12) 345-6789");
				done();
			}, 10);
		});
	});
});
