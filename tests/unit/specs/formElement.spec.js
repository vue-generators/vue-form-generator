import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import formElement from "@/formElement.vue";

const localVue = createLocalVue();
let wrapper;

function createFormElement(data, methods) {
	const _wrapper = mount(formElement, {
		localVue,
		propsData: {
			eventBus: new Vue(),
			...data
		},
		methods
	});

	wrapper = _wrapper;

	return _wrapper;
}
describe("formElement.vue", () => {
	describe("check fieldTypeHasLabel function", () => {
		let form;
		before(() => {
			createFormElement({ field: {} }, {});
			form = wrapper.vm;
		});

		it("should return true", () => {
			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "checkbox"
					},
					label: "checkbox"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.true;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "text"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.true;

			wrapper.setProps({ field: { type: "checklist", label: "checklist" } });
			expect(form.fieldTypeHasLabel).to.be.true;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "image"
					},
					label: "image"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.true;
		});

		it("should return false", () => {
			// with label text defined
			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "button"
					},
					label: "button"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "submit"
					},
					label: "submit"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "reset"
					},
					label: "reset"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			// without label text defined
			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "checkbox"
					}
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "text"
					}
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({ field: { type: "checklist" } });
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "image"
					}
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({ field: { type: "input", fieldOptions: { inputType: "button" } } });
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "submit"
					}
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "reset"
					}
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;
		});

		it("should default to true for unknown types", () => {
			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "unsupported-or-unknown"
					},
					label: "unsupported"
				}
			});
			expect(form.fieldTypeHasLabel).to.be.true;

			wrapper.setProps({
				field: {
					type: "input",
					fieldOptions: {
						inputType: "unsupported-or-unknown"
					}
				}
			});
			expect(form.fieldTypeHasLabel).to.be.false;
		});
	});
});
