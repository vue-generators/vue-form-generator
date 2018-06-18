import { mount, createLocalVue } from "@vue/test-utils";

import FieldRangeSlider from "src/fields/optional/fieldRangeSlider.vue";

let jQuery = require("jquery");
let $ = jQuery(window);
require("ion-rangeslider");
global.$ = $;

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldRangeSlider, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldRangeSlider.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "rangeSlider",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10,
			autocomplete: "off",
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { rating: 8 };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.attributes()["data-min"]).to.be.equal("1");
			expect(input.attributes()["data-max"]).to.be.equal("10");
			expect(input.attributes()["data-disable"]).to.be.undefined;
		});

		it.skip("should contain the value", () => {
			let origin = wrapper.find(".irs-slider.single");
			console.log(origin.element.style);

			expect(origin.element.style.left).to.be.within("70%", "90%");
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "placeholder", "readonly", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it.skip("input value should be the model value after changed", () => {
			model.rating = 3;
			let origin = wrapper.find(".irs-slider.single");

			expect(origin.element.style.left).to.be.within("20%", "40%");
		});

		it.skip("model value should be the input value if changed", () => {
			wrapper.vm.slider.update({ from: 6 });
			wrapper.vm.slider.callOnChange(wrapper.vm.slider); // trigger changes

			expect(model.rating).to.be.equal(6);
		});
	});
});
