import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldSubmit from "src/fields/core/fieldSubmit.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldSubmit, {
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

describe("fieldSubmit.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "submit",
			inputName: "",
			fieldClasses: ["applied-class", "another-class"],
			fieldOptions: {
				validateBeforeSubmit: false,
				buttonText: "Submit form",
				onSubmit() {}
			}
		};
		let model = { name: "John Doe" };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain an input submit element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("submit");
			expect(input.element.value).to.be.equal("Submit form");
		});

		describe("valid form", () => {
			it("should not call validate if validateBeforeSubmit is false", () => {
				schema.fieldOptions.onSubmit = sinon.spy();
				wrapper.setProps({ schema: { ...schema } });
				let cb = sinon.spy();
				wrapper.vm.$parent.validate = cb;

				input.trigger("click");

				expect(cb.called).to.be.false;
				expect(schema.fieldOptions.onSubmit.calledOnce).to.be.true;
				expect(schema.fieldOptions.onSubmit.calledWith(model, schema)).to.be.true;
			});

			// TODO: Find a way to test a promise instead of a synchronous function
			it.skip("should call validate if validateBeforeSubmit is true", () => {
				schema.fieldOptions.validateBeforeSubmit = true;
				schema.fieldOptions.onSubmit = sinon.spy();
				wrapper.setProps({ schema: { ...schema } });
				let cb = sinon.spy();
				wrapper.vm.$parent.validate = cb;

				input.trigger("click");

				expect(cb.called).to.be.true;
				expect(schema.fieldOptions.onSubmit.called).to.be.true;
			});
		});

		describe("invalid form", () => {
			// TODO: Find a way to test a promise instead of a synchronous function
			it.skip("should not call onSubmit if validateBeforeSubmit is true", () => {
				schema.fieldOptions.validateBeforeSubmit = true;
				schema.fieldOptions.onSubmit = sinon.spy();
				wrapper.setProps({
					schema: { ...schema }
				});
				let cb = sinon.spy(() => {
					return ["an error occurred"];
				});
				wrapper.vm.$parent.validate = cb;

				input.trigger("click");

				expect(cb.called).to.be.true;
				expect(schema.fieldOptions.onSubmit.called).to.be.true;
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("should have 2 classes", () => {
			expect(input.classes()).to.include("applied-class");
			expect(input.classes()).to.include("another-class");
		});
	});
});
