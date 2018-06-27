import { mount, createLocalVue } from "@vue/test-utils";

import formGroup from "src/formGroup.vue";

const localVue = createLocalVue();
let wrapper;

function createFormGroup(data, methods) {
	const _wrapper = mount(formGroup, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}
describe("formGroup.vue", () => {
	describe("check fieldTypeHasLabel function", () => {
		let form;
		before(() => {
			createFormGroup({ field: {} }, {});
			form = wrapper.vm;
		});

		it("should return true", () => {
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "checkbox", label: "checkbox" })).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "text", label: "text" })).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "checklist", label: "checklist" })).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "image", label: "image" })).to.be.true;
		});

		it("should return false", () => {
			// with label text defined
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "button", label: "button" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "submit", label: "submit" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "reset", label: "reset" })).to.be.false;

			// without label text defined
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "checkbox" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "text" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "checklist" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "image" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "button" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "submit" })).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "reset" })).to.be.false;
		});

		it("should default to true for unknown types", () => {
			expect(
				form.fieldTypeHasLabel({
					type: "input",
					inputType: "unsupported-or-unknown",
					label: "unsupported"
				})
			).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "unsupported-or-unknown" })).to.be.false;
		});
	});
});
