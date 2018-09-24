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

				input.trigger("click");

				expect(schema.fieldOptions.onSubmit.calledOnce).to.be.true;
				expect(schema.fieldOptions.onSubmit.calledWith(model, schema)).to.be.true;
			});

			it("should call validate if validateBeforeSubmit is true", () => {
				const spyEmit = sinon.spy(wrapper.props().eventBus, "$emit");
				schema.fieldOptions.validateBeforeSubmit = true;
				schema.fieldOptions.onSubmit = sinon.spy();
				wrapper.setProps({ schema: { ...schema } });

				input.trigger("click");

				expect(spyEmit.calledOnce).to.be.true;
				expect(spyEmit.args[0][0]).to.be.equal("fields-validation-trigger");

				spyEmit.restore();

				// Simulate feedback from formGenerator
				wrapper.props().eventBus.$emit("fields-validation-terminated", []);

				expect(schema.fieldOptions.onSubmit.called).to.be.true;
				expect(schema.fieldOptions.onSubmit.calledWith(model, schema)).to.be.true;
			});
		});

		describe("invalid form", () => {
			it("should not call onSubmit if validateBeforeSubmit is true and onValidationError is defined", () => {
				const spyEmit = sinon.spy(wrapper.props().eventBus, "$emit");
				const formErrors = [{ uid: "123", error: ["an error occurred"] }];
				schema.fieldOptions.validateBeforeSubmit = true;
				schema.fieldOptions.onValidationError = sinon.spy();
				schema.fieldOptions.onSubmit = sinon.spy();
				wrapper.setProps({ schema: { ...schema } });

				input.trigger("click");

				expect(spyEmit.calledOnce).to.be.true;
				expect(spyEmit.args[0][0]).to.be.equal("fields-validation-trigger");

				spyEmit.restore();

				// Simulate feedback from formGenerator
				wrapper.props().eventBus.$emit("fields-validation-terminated", formErrors);

				expect(schema.fieldOptions.onValidationError.called).to.be.true;
				expect(schema.fieldOptions.onValidationError.calledWith(model, schema, formErrors)).to.be.true;
				expect(schema.fieldOptions.onSubmit.called).to.be.false;
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
