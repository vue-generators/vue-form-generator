import { mount, createLocalVue } from "@vue/test-utils";

import FieldGoogleAddress from "src/fields/optional/fieldGoogleAddress.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldGoogleAddress, {
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

describe("fieldGoogleAddress.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "text",
			label: "Address",
			model: "address",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { address: "Paris, France" };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.exists()).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal("Paris, France");
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
			wrapper.setProps({ model: { address: "Rome, Italy" } });

			expect(input.element.value).to.be.equal("Rome, Italy");
		});

		it("model value should be the input value if changed", () => {
			input.setValue("Budapest, Hungary");

			expect(wrapper.props().model.address).to.be.equal("Budapest, Hungary");
		});

		/*
			TODO:
				1. check HTML list if typing
				2. check geolocate called if input got focus
				3. check onPlaceChanged called
		 */
	});
});
