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
		let vfg = {};
		let schema = {
			type: "submit",
			buttonText: "Submit form",
			inputName: "",
			validateBeforeSubmit: false,
			onSubmit: sinon.spy(),
			fieldClasses: ["applied-class", "another-class"]
		};
		let formOptions = {
			validateAsync: false
		};
		let model = { name: "John Doe" };
		let input;

		before(() => {
			createField2({ vfg, schema, formOptions, model, disabled: false });
			input = wrapper.find("input");
		});

		it("should contain an input submit element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("submit");
			expect(input.element.value).to.be.equal("Submit form");
		});

		describe("valid form", () => {
			before(() => {
				vfg.validate = () => true;
				sinon.spy(vfg, "validate");
			});

			afterEach(() => {
				schema.onSubmit.resetHistory();
				vfg.validate.resetHistory();
			});

			it("should not call validate but should call onSubmit if validateBeforeSubmit is false", () => {
				input.trigger("click");

				expect(vfg.validate.notCalled).to.be.true;
				expect(schema.onSubmit.calledOnce).to.be.true;
				expect(schema.onSubmit.calledWith(model, schema)).to.be.true;
			});

			it("should call validate and onSubmit if validateBeforeSubmit is true", () => {
				schema.validateBeforeSubmit = true;

				input.trigger("click");

				expect(vfg.validate.called).to.be.true;
				expect(schema.onSubmit.called).to.be.true;
			});
		});

		describe("invalid form", () => {
			before(() => {
				vfg.validate = () => false;
				sinon.spy(vfg, "validate");
			});

			afterEach(() => {
				schema.onSubmit.resetHistory();
				vfg.validate.resetHistory();
			});

			it("should call validate but should not call onSubmit if validateBeforeSubmit is true", () => {
				schema.validateBeforeSubmit = true;

				input.trigger("click");

				expect(vfg.validate.called).to.be.true;
				expect(schema.onSubmit.notCalled).to.be.true;
			});
		});

		describe("async validate", () => {
			before(() => {
				formOptions.validateAsync = true;
				vfg.validate = sinon.stub();
				schema.onSubmit = sinon.spy();
			});

			afterEach(() => {
				vfg.validate.reset();
				schema.onSubmit.resetHistory();
			});

			describe("valid form", () => {
				it("should call validate and onSubmit if validateBeforeSubmit is true", async function () {
					schema.validateBeforeSubmit = true;
					vfg.validate.resolves([]);

					await input.trigger("click");

					expect(vfg.validate.called).to.be.true;
					expect(schema.onSubmit.called).to.be.true;
				});
			});

			describe("invalid form", () => {
				it("should call validate but should not call onSubmit if validateBeforeSubmit is true", async function () {
					schema.validateBeforeSubmit = true;
					vfg.validate.resolves(["Error"]);

					await input.trigger("click");

					expect(vfg.validate.called).to.be.true;
					expect(schema.onSubmit.notCalled).to.be.true;
				});
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
