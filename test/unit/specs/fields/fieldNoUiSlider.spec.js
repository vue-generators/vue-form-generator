import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import fieldNoUiSlider from "src/fields/optional/fieldNoUiSlider.vue";

let noUiSlider = require("nouislider");
window.noUiSlider = noUiSlider;

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(fieldNoUiSlider, {
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

describe("fieldNoUiSlider.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "noUiSlider",
			model: "rating",
			label: "Rating",
			fieldOptions: {
				min: 1,
				max: 10
			}
		};
		let model = { rating: 8 };
		let input;

		before(() => {
			createField({ schema, model });
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

		it.skip("should contain the value", (done) => {
			let origin = input.find(".noUi-origin");
			// TODO Fix bug
			Vue.config.errorHandler = done;
			Vue.nextTick(() => {
				expect(origin.element.style.getPropertyValue("transform")).to.be.equal(
					"translate(-22.22222222222223%, 0)"
				);
				done();
			});
		});

		it("handle value should be the model value after changed", () => {
			wrapper.setProps({ model: { rating: 10 } });
			let origin = input.find(".noUi-origin");

			expect(origin.element.style.getPropertyValue("transform")).to.be.equal("translate(0%, 0)");
		});

		it("model value should be the handle value after changed", () => {
			wrapper.vm.onChange(3);

			expect(wrapper.props().model.rating).to.be.equal(3);
		});

		it("should set disabled", () => {
			schema.disabled = true;
			wrapper.setProps({ schema: { ...schema } });

			expect(wrapper.attributes().disabled).to.be.equal("disabled");
		});
	});
});
