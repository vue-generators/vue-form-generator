import { mount, createLocalVue } from "@vue/test-utils";

import FieldSubmit from "src/fields/core/fieldSubmit.vue";

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldSubmit, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldSubmit.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "submit",
			buttonText: "Submit form",
			inputName: "",
			validateBeforeSubmit: false,
			onSubmit() {},
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { name: "John Doe" };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it("should contain an input submit element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("submit");
			expect(input.element.value).to.be.equal("Submit form");
		});

		describe("valid form", () => {
			it.skip("should not call validate if validateBeforeSubmit is false", () => {
				schema.onSubmit = sinon.spy();
				let cb = sinon.spy();
				wrapper.vm.$parent.validate = cb;

				input.click();
				expect(cb.called).to.be.false;
				expect(schema.onSubmit.calledOnce).to.be.true;
				expect(schema.onSubmit.calledWith(model, schema)).to.be.true;
			});

			it.skip("should call validate if validateBeforeSubmit is true", () => {
				schema.validateBeforeSubmit = true;
				schema.onSubmit = sinon.spy();
				let cb = sinon.spy();
				wrapper.vm.$parent.validate = cb;

				input.trigger("click");

				expect(cb.called).to.be.true;
				expect(schema.onSubmit.called).to.be.true;
			});
		});

		describe("invalid form", () => {
			it.skip("should not call onSubmit if validateBeforeSubmit is true", () => {
				schema.validateBeforeSubmit = true;
				schema.onSubmit = sinon.spy();
				let cb = sinon.spy(() => {
					return ["an error occurred"];
				});
				wrapper.vm.$parent.validate = cb;

				input.trigger("click");

				expect(cb.called).to.be.true;
				expect(schema.onSubmit.called).to.be.true;
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["inputName"];

			attributes.forEach(name => {
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
