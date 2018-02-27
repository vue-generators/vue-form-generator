import { mount, createLocalVue } from "@vue/test-utils";

import FieldLabel from "src/fields/core/fieldLabel.vue";

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldLabel, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldLabel.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "label",
			label: "Timestamp",
			model: "timestamp",
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { timestamp: "2 days ago" };
		let span;

		before(() => {
			createField2({ schema, model, disabled: false });
			span = wrapper.find("span");
		});

		it("should contain a span element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(span.is("span")).to.be.true;
		});

		it("should contain the value", () => {
			expect(span.text()).to.be.equal("2 days ago");
		});

		it("input value should be the model value after changed", () => {
			model.timestamp = "Foo bar";
			wrapper.update();

			expect(span.text()).to.be.equal("Foo bar");
		});

		it("should have 2 classes", () => {
			expect(span.classes()).to.include("applied-class");
			expect(span.classes()).to.include("another-class");
		});
	});
});
