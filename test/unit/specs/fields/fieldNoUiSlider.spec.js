import { mount, createLocalVue } from "@vue/test-utils";

import fieldNoUiSlider from "src/fields/optional/fieldNoUiSlider.vue";

let noUiSlider = require("nouislider");
window.noUiSlider = noUiSlider;

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(fieldNoUiSlider, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldNoUiSlider.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "noUiSlider",
			label: "Rating",
			model: "rating",
			min: 1,
			max: 10
		};
		let model = { rating: 8 };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find(".slider");
		});

		it("should contain a div element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("div")).to.be.true;
			expect(input.classes()).to.include("slider");
		});

		it("should contain an handle element", () => {
			let handle = input.find(".noUi-handle");

			expect(handle.exists()).to.be.true;
			expect(input.classes()).to.include("noUi-target");
		});

		it("should contain the value", () => {
			let origin = input.find(".noUi-origin");
			wrapper.update();

			expect(origin.element.style.getPropertyValue("transform")).to.be.equal("translate(-22.22222222222223%, 0)");
		});

		it("handle value should be the model value after changed", () => {
			model.rating = 10;
			wrapper.update();
			let origin = input.find(".noUi-origin");

			expect(origin.element.style.getPropertyValue("transform")).to.be.equal("translate(0%, 0)");
		});

		it.skip("model value should be the handle value after changed", () => {
			wrapper.vm.onChange(3);
			wrapper.update();

			expect(model.rating).to.be.equal(3);
		});

		it("should set disabled", () => {
			wrapper.vm.disabled = true;
			wrapper.update();

			expect(wrapper.attributes().disabled).to.be.equal("disabled");
		});
	});
});
