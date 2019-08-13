/* eslint no-undefined: 0 */
import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import VueFormGenerator from "@";
import {
	fieldCheckbox,
	fieldChecklist,
	fieldInput,
	fieldLabel,
	fieldRadios,
	fieldSelect,
	fieldSubmit,
	fieldTextArea,
	fieldUpload,
	fieldCleave,
	fieldDateTimePicker,
	fieldGoogleAddress,
	fieldImage,
	fieldMasked,
	fieldNoUiSlider,
	fieldPikaday,
	fieldRangeSlider,
	fieldSelectEx,
	fieldSpectrum,
	fieldStaticMap,
	fieldSwitch,
	fieldVueMultiSelect
} from "@/utils/fieldsLoader.js";

const localVue = createLocalVue();
localVue.use(VueFormGenerator, {
	fields: [
		fieldCheckbox,
		fieldChecklist,
		fieldInput,
		fieldLabel,
		fieldRadios,
		fieldSelect,
		fieldSubmit,
		fieldTextArea,
		fieldUpload,
		fieldCleave,
		fieldDateTimePicker,
		fieldGoogleAddress,
		fieldImage,
		fieldMasked,
		fieldNoUiSlider,
		fieldPikaday,
		fieldRangeSlider,
		fieldSelectEx,
		fieldSpectrum,
		fieldStaticMap,
		fieldSwitch,
		fieldVueMultiSelect
	]
});

let wrapper;
const defaultTemplate = `<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="multiple" ref="form"></vue-form-generator>`;

function createFormGenerator(data, methods, template) {
	const Component = {
		template: template || defaultTemplate,
		data() {
			let _data = {
				model: undefined,
				schema: undefined,
				options: undefined,
				multiple: undefined,
				...data
			};
			return _data;
		},
		methods
	};

	const _wrapper = mount(Component, {
		localVue,
		attachToDocument: true
	});
	wrapper = _wrapper;
	return _wrapper;
}

describe("VueFormGenerator.vue", () => {
	describe("with empty schema", () => {
		let schema = {
			fields: []
		};

		before(() => {
			createFormGenerator({ schema });
		});

		it("should be create fieldset", () => {
			const fieldset = wrapper.find("fieldset");

			expect(fieldset.exists()).to.be.true;
			expect(fieldset.is("fieldset")).to.be.true;
		});
	});

	describe("with empty schema and custom tag", () => {
		let schema = {
			fields: []
		};

		before(() => {
			createFormGenerator(
				{ schema },
				{},
				`<vue-form-generator :schema="schema" ref="form" tag="section"></vue-form-generator>`
			);
		});

		it("should be create custom tag", () => {
			const section = wrapper.find("section");
			expect(section.exists()).to.be.true;
			expect(section.is("section")).to.be.true;
		});
	});

	describe("check form-element classes", () => {
		let formGenerator;
		let formElement;
		let schema;

		beforeEach(() => {
			// Reset schema value
			schema = {
				fields: [
					{
						type: "input",
						fieldOptions: { inputType: "text" },
						/*
							styleClasses need to be defined for the unit test to work (add getter/setter)
							In real use, it is not mandatory
						 */
						styleClasses: "",
						label: "Name",
						model: "name",
						readonly: false,
						featured: false,
						required: false,
						disabled: false
					}
				]
			};
			createFormGenerator({ schema });
			formGenerator = wrapper.find({ name: "form-generator" });
			formElement = wrapper.find({ name: "form-element" });
		});

		it("should be minimal classes", () => {
			expect(formElement.classes().length).to.be.equal(3);
			expect(formElement.classes()).to.include("form-element");
			expect(formElement.classes()).to.include("field-input");
		});

		it("should be featured class", () => {
			wrapper.vm.schema.fields[0].featured = true;

			expect(formElement.classes()).to.include("featured");
		});

		it("should be readonly class", () => {
			wrapper.vm.schema.fields[0].readonly = true;

			expect(formElement.classes()).to.include("readonly");
		});

		it("should be disabled class", () => {
			wrapper.vm.schema.fields[0].disabled = true;

			expect(formElement.classes()).to.include("disabled");
		});

		it("should be required class", () => {
			wrapper.vm.schema.fields[0].required = true;

			expect(formElement.classes()).to.include("required");
		});

		it("should be error class", () => {
			formElement.vm.onChildValidated(["Validation error!"]);
			expect(formElement.classes()).to.include("error");
		});

		describe("custom validation classes", () => {
			let formGenerator;
			let formElement;
			beforeEach(() => {
				let options = {
					validationCleanClass: "is-clean",
					validationSuccessClass: "has-success",
					validationErrorClass: "has-error"
				};
				createFormGenerator({ schema, options });
				formGenerator = wrapper.find({ name: "form-generator" });
				formElement = wrapper.find({ name: "form-element" });
			});

			it("clean class", () => {
				expect(formElement.classes()).to.include("is-clean");
			});

			it("error class", () => {
				formElement.vm.onChildValidated(["Validation error!"]);

				expect(formElement.classes()).to.include("has-error");
			});

			it("success class", (done) => {
				formGenerator.vm.validate().then(
					() => {
						expect(formElement.classes()).to.include("has-success");
						done();
					},
					() => {}
				);
			});
		});

		it("should be add a custom classes", () => {
			schema.fields[0].styleClasses = "classA";
			formGenerator.setProps({ schema: { ...schema } });

			expect(formElement.classes()).to.include("classA");
		});

		it("should be add more custom classes", () => {
			schema.fields[0].styleClasses = ["classB", "classC"];

			expect(formElement.classes()).to.include("classB");
			expect(formElement.classes()).to.include("classC");
		});
	});
	// TODO: should be moved to formGroup
	describe("check label classes", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					labelClasses: ["applied-class", "another-class"]
				}
			]
		};
		let label;

		before(() => {
			createFormGenerator({ schema });
			label = wrapper.find("label");
		});

		it("should be 2 classes", () => {
			expect(label.classes()).to.include("applied-class");
			expect(label.classes()).to.include("another-class");
		});
	});

	describe("check form row caption cell", () => {
		let group, label;
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					help: null
				}
			]
		};

		before(() => {
			createFormGenerator({ schema });
			group = wrapper.find(".form-element");
			label = group.find("label");
		});

		it("should be text of cell is the name of field", () => {
			expect(label.exists()).to.be.true;
			expect(label.text()).to.be.equal("Name");
		});

		it("should be a question icon if has helpText", () => {
			wrapper.vm.schema.fields[0].help = "Sample help";

			let span = group.find(".help");

			expect(span.exists()).to.be.true;
			expect(span.find("i").exists()).to.be.true;
			expect(span.find(".helpText").exists()).to.be.true;
			expect(span.find(".helpText").text()).to.be.equal("Sample help");
		});
	});

	describe("check form row field cell", () => {
		let formElement; //, label;
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					hint: "Hint text",
					errors: [],
					placeholder: "User's name"
				}
			]
		};

		before(() => {
			createFormGenerator({ schema });
			formElement = wrapper.find({ name: "form-element" });
		});

		it("should be a .field-wrap div", () => {
			expect(formElement.find(".field-wrap").exists()).to.be.true;
		});

		it("should be a hint div if hint is not null", () => {
			let hint = formElement.find(".hint");
			expect(hint.exists()).to.be.true;
			expect(hint.text()).to.be.equal("Hint text");
		});

		it("should be .errors div if there are errors in fields", () => {
			formElement.vm.onChildValidated(["Some error!", "Another error!"]);
			let div = formElement.find(".errors");

			expect(div.exists()).to.be.true;

			let errors = div.findAll("span");

			expect(errors.at(0).text()).to.be.equal("Some error!");
			expect(errors.at(1).text()).to.be.equal("Another error!");
		});
	});

	describe("check fieldDisabled with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					disabled(model) {
						return !model.status;
					}
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		let input;

		before(() => {
			createFormGenerator({ schema, model });
			input = wrapper.find("input");
		});

		it("should be enabled the name field", () => {
			expect(input.attributes().disabled).to.be.undefined;
		});

		it("should be disabled the name field", () => {
			wrapper.vm.model.status = false;

			expect(input.attributes().disabled).to.be.equal("disabled");
		});
	});

	describe.skip("check fieldDisabled function parameters", () => {
		let fieldDisabled = sinon.spy();
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: { inputType: "text" },
					label: "Name",
					model: "name",
					disabled: fieldDisabled
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before(() => {
			createFormGenerator({ schema, model });
		});

		it("should be called with correct params", () => {
			expect(fieldDisabled.called).to.be.true;
			expect(fieldDisabled.calledWith(model, wrapper.vm.schema.fields[0], wrapper.vm.$children[0].$children[0]))
				.to.be.true;
		});
	});

	describe("check fieldDisabled with const", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					disabled: false
				}
			]
		};

		let model = { name: "John Doe" };

		let input;

		before(() => {
			createFormGenerator({ schema, model });
			input = wrapper.find("input");
		});

		it("should be enabled the name field", () => {
			expect(input.attributes().disabled).to.be.undefined;
		});

		it("should be disabled the name field", () => {
			wrapper.vm.schema.fields[0].disabled = true;

			expect(input.attributes().disabled).to.be.equal("disabled");
		});
	});

	describe("check fieldReadonly with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					readonly(model) {
						return model.status;
					}
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		let group;

		before(() => {
			createFormGenerator({ schema, model });
			group = wrapper.find(".form-element");
		});

		it("should be readonly", () => {
			expect(group.classes()).to.include("readonly");
		});

		it("should be writable", () => {
			wrapper.vm.model.status = false;

			expect(group.classes()).to.not.include("readonly");
		});
	});

	describe("check fieldHint with function", () => {
		let schema = {
			fields: [
				{
					type: "textArea",
					model: "note",
					label: "Note",
					hint(model) {
						if (model && model.note) {
							return model.note.length + " of max 500 characters used!";
						}
					},
					fieldOptions: {
						max: 500,
						rows: 4
					}
				}
			]
		};

		let model = {
			note: "John Doe"
		};

		before(() => {
			createFormGenerator({ schema, model });
		});

		it("should be applay", () => {
			expect(wrapper.find(".form-element .hint").text()).to.be.equal("8 of max 500 characters used!");
		});

		it("should be changed", () => {
			model.note = "Dr. John Doe";

			expect(wrapper.find(".form-element .hint").text()).to.be.equal("12 of max 500 characters used!");
		});
	});

	describe("check fieldFeatured with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					featured(model) {
						return model.status;
					}
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		let group;

		before(() => {
			createFormGenerator({ schema, model });
			group = wrapper.find(".form-element");
		});

		it("should be featured", () => {
			expect(group.classes()).to.include("featured");
		});

		it("should not be featured", () => {
			wrapper.vm.model.status = false;

			expect(group.classes()).to.not.include("featured");
		});
	});

	describe("check fieldRequired with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					required(model) {
						return model.status;
					}
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		let group;

		before(() => {
			createFormGenerator({ schema, model });
			group = wrapper.find(".form-element");
		});

		it("should be required", () => {
			expect(group.classes()).to.include("required");
		});

		it("should be optional", () => {
			wrapper.vm.model.status = false;

			expect(group.classes()).to.not.include("required");
		});
	});

	describe("check fieldVisible with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					visible(model) {
						return model.status;
					}
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before(() => {
			createFormGenerator({ schema, model });
		});

		it("should be visible the name field", () => {
			let input = wrapper.find("input[type=text]");
			expect(input.exists()).to.be.true;
		});

		it("should be hidden the name field", () => {
			wrapper.vm.model.status = false;

			let input = wrapper.find("input[type=text]");
			expect(input.exists()).to.be.false;
		});
	});

	describe("check fieldVisible with const", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					visible: true
				}
			]
		};

		let model = { name: "John Doe" };

		before(() => {
			createFormGenerator({ schema, model });
		});

		it("should be enabled the name field", () => {
			let input = wrapper.find("input[type=text]");
			expect(input.exists()).to.be.true;
		});

		it("should be disabled the name field", () => {
			wrapper.vm.schema.fields[0].visible = false;

			let input = wrapper.find("input[type=text]");
			expect(input.exists()).to.be.false;
		});
	});

	describe("check validate", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text",
						min: 3
					},
					label: "Name",
					model: "name",
					validator: VueFormGenerator.validators.string
				}
			]
		};

		let model = { name: "John Doe" };
		let form;

		before(() => {
			createFormGenerator({ schema, model });
			form = wrapper.vm.$refs.form;
		});

		it("should empty the errors", (done) => {
			form.validate().then(
				() => {
					expect(form.errors).to.be.length(0);
					done();
				},
				() => {}
			);
		});

		it("should give a validation error", (done) => {
			model.name = "Ab";
			wrapper.setData({ model: { ...model } });
			form.validate().then(
				() => {},
				(errors) => {
					expect(errors[0].error).to.be.equal("The length of text is too small! Current: 2, Minimum: 3");
					expect(form.errors).to.be.length(1);
					done();
				}
			);
		});

		it("should no validation error", (done) => {
			model.name = "Abc";
			wrapper.setData({ model: { ...model } });
			form.validate().then(
				() => {
					expect(form.errors).to.be.length(0);
					done();
				},
				() => {}
			);
		});
	});

	describe("check validate with validator as string instead of object", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text",
						min: 3
					},
					label: "Name",
					model: "name",
					validator: "string"
				}
			]
		};

		let model = { name: "John Doe" };
		let form;

		before(() => {
			createFormGenerator({ schema, model });
			form = wrapper.vm.$refs.form;
		});

		it("should empty the errors", (done) => {
			form.validate().then(
				() => {
					expect(form.errors).to.be.length(0);
					done();
				},
				() => {}
			);
		});

		it("should give a validation error", (done) => {
			model.name = "Ab";
			wrapper.setData({ model: { ...model } });
			form.validate().then(
				() => {},
				(errors) => {
					expect(errors[0].error).to.be.equal("The length of text is too small! Current: 2, Minimum: 3");
					expect(form.errors).to.be.length(1);
					done();
				}
			);
		});

		it("should no validation error", (done) => {
			model.name = "Abc";
			wrapper.setData({ model: { ...model } });
			form.validate().then(
				() => {
					expect(form.errors).to.be.length(0);
					done();
				},
				() => {}
			);
		});
	});

	describe("check if option null", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name"
				}
			]
		};

		let model = { name: "Me" };
		let form;

		before(() => {
			createFormGenerator({ schema, model });
			form = wrapper.vm.$refs.form;
		});

		it("should be validation error at ready()", () => {
			expect(form).to.not.be.undefined;
			expect(form.options).to.not.be.undefined;
		});
	});

	describe("check validateAfterLoad option", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text",
						min: 3
					},
					label: "Name",
					model: "name",
					validator: VueFormGenerator.validators.string
				}
			]
		};

		let model = { name: "Me" };
		let form;

		before(() => {
			createFormGenerator({ schema, model, options: { validateAfterLoad: true } });
		});

		it("should be validation error at mounted()", () => {
			form = wrapper.vm.$refs.form;
			expect(form.errors).to.be.length(1);
		});

		it("should be validation error if model is changed", () => {
			model = { name: "Al" };
			wrapper.setData({ model: { ...model } });
			expect(form.errors).to.be.length(1);
		});

		it("should be no errors if model is correct", (done) => {
			form.model = { name: "Bob" };
			setTimeout(() => {
				expect(form.errors).to.be.length(0);
				done();
			}, 10);
		});

		it("should be no errors if validateAfterLoad is false", (done) => {
			form.options.validateAfterLoad = false;
			form.model = { name: "Ed" };
			setTimeout(() => {
				expect(form.errors).to.be.length(0);
				done();
			}, 10);
		});
	});

	describe("check onValidated event", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text",
						min: 3
					},
					label: "Name",
					model: "name",
					validator: ["string"]
				}
			]
		};

		let model = { name: "Bob" };
		let formGenerator;
		let form;

		beforeEach(() => {
			createFormGenerator({ schema, model });
			formGenerator = wrapper.find({ name: "form-generator" });
			form = formGenerator.vm;
		});

		it("should no errors after mounted()", () => {
			expect(form.errors).to.be.length(0);
		});

		it("should be validation error if model value is not valid", () => {
			formGenerator.setProps({ model: { name: "A" } });
			form.validate().then(
				() => {
					console.log(JSON.stringify(form.errors));
					expect(form.errors).to.be.length(1);
					expect(formGenerator.emitted().validated).to.be.an.instanceof(Array);
					expect(formGenerator.emitted().validated.length).to.be.equal(1);
					expect(formGenerator.emitted().validated[0][0]).to.be.false;
					expect(formGenerator.emitted().validated[0][1]).to.be.an.instanceof(Array);
					expect(formGenerator.emitted().validated[0][1].length).to.be.equal(1);
					expect(formGenerator.emitted().validated[0][1][0].uid).to.be.a("string");
					expect(formGenerator.emitted().validated[0][1][0].error).to.be.a("string");
					expect(formGenerator.emitted().validated[0][1][0].error).to.be.equal(
						"The length of text is too small! Current: 1, Minimum: 3"
					);
				},
				() => {}
			);
		});

		it("should no validation error if model valie is valid", () => {
			formGenerator.setProps({ model: { name: "Alan" } });
			form.validate().then(
				() => {
					expect(form.errors).to.be.length(0);
					expect(formGenerator.emitted().validated).to.be.an.instanceof(Array);
					expect(formGenerator.emitted().validated.length).to.be.equal(1);
					expect(formGenerator.emitted().validated[0][0]).to.be.true;
					expect(formGenerator.emitted().validated[0][1]).to.be.an.instanceof(Array);
					expect(formGenerator.emitted().validated[0][1].length).to.be.equal(0);
				},
				() => {}
			);
		});
	});

	describe("check schema.onChanged when the model changed", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					onChanged: sinon.spy()
				}
			]
		};

		let model = { name: "Me" };
		let form;

		before(() => {
			createFormGenerator({ schema, model });
			form = wrapper.vm.$refs.form;
		});

		it("should NOT called the schema.onChanged", () => {
			schema.fields[0].onChanged.resetHistory();
			form.model = { name: "Bob" };
			expect(schema.fields[0].onChanged.called).to.be.false;
		});
	});

	describe("check onFieldValidated method if child validate", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text",
						min: 3
					},
					label: "Name",
					model: "name",
					validator: ["string"]
				},
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "City",
					model: "city",
					validator() {
						return "Validation error!";
					}
				}
			]
		};

		let model = { name: "Bob" };
		let formGenerator;
		let form;
		let field;
		let onValidated = sinon.spy();

		before(() => {
			createFormGenerator(
				{ schema, model },
				{ onValidated },
				`<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="false" ref="form" @validated="onValidated"></vue-form-generator>`
			);
			formGenerator = wrapper.find({ name: "form-generator" });
			form = formGenerator.vm;
			field = form.$children[0];
		});

		it("should no errors after mounted()", (done) => {
			expect(form.errors).to.be.length(0);
			wrapper.vm.$nextTick(() => {
				done();
			});
		});

		it.skip("should be validation error if model value is not valid", () => {
			onValidated.resetHistory();
			wrapper.vm.model.name = "A";
			field.validate().then(() => {}, () => {});

			expect(form.errors).to.be.length(1);
			expect(onValidated.callCount).to.be.equal(1);
			expect(
				onValidated.calledWith(false, [
					{
						field: schema.fields[0],
						error: "The length of text is too small! Current: 1, Minimum: 3"
					}
				])
			).to.be.true;
		});

		it.skip("should be 2 validation error", () => {
			form.$children[1].validate().then(() => {}, () => {});
			expect(form.errors).to.be.length(2);
			expect(form.errors[0].error).to.be.equal("The length of text is too small! Current: 1, Minimum: 3");
			expect(form.errors[1].error).to.be.equal("Validation error!");
		});

		it.skip("should only other field validation error", () => {
			wrapper.vm.model.name = "Alan";
			onValidated.resetHistory();
			field.validate().then(() => {}, () => {});

			expect(form.errors).to.be.length(1);
			expect(onValidated.callCount).to.be.equal(1);
			expect(onValidated.calledWith(false, [{ field: schema.fields[1], error: "Validation error!" }])).to.be.true;
		});
	});

	describe("check async validator", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text"
					},
					label: "Name",
					model: "name",
					validator(value) {
						return new Promise((resolve) => {
							setTimeout(() => {
								if (value.length >= 3) {
									resolve();
								} else {
									resolve(["Invalid name"]);
								}
							}, 10);
						});
					}
				}
			]
		};

		let model = { name: "Bob" };
		let formGenerator;
		let form;
		let field;
		let onValidated = sinon.spy();

		before(() => {
			createFormGenerator(
				{ schema, model },
				{ onValidated: onValidated },
				`<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="false" ref="form" @validated="onValidated"></vue-form-generator>`
			);
			formGenerator = wrapper.find({ name: "form-generator" });
			form = formGenerator.vm;
			field = formGenerator.find({ name: "form-element" }).vm.$children[0];
		});

		it("should no errors after mounted()", (done) => {
			wrapper.vm.$nextTick(() => {
				expect(form.errors).to.be.length(0);
				done();
			});
		});

		it.skip("should be validation error if model value is not valid", (done) => {
			onValidated.resetHistory();
			wrapper.vm.model.name = "A";
			// console.log(formGenerator.find({ name: "form-element" }).vm.$children[0].validate);
			field.validate().then(() => {}, () => {});
			Vue.config.errorHandler = done;
			Vue.nextTick(() => {
				expect(form.errors).to.be.length(1);
				expect(formGenerator.emitted().validated).to.be.an.instanceof(Array);
				expect(formGenerator.emitted().validated.length).to.be.equal(1);
				expect(formGenerator.emitted().validated[0][0]).to.be.false;
				expect(formGenerator.emitted().validated[0][1]).to.be.an.instanceof(Array);
				expect(formGenerator.emitted().validated[0][1].length).to.be.equal(1);
				expect(formGenerator.emitted().validated[0][1][0].uid).to.be.a("string");
				expect(formGenerator.emitted().validated[0][1][0].error).to.be.a("string");
				expect(formGenerator.emitted().validated[0][1][0].error).to.be.equal(
					"The length of text is too small! Current: 1, Minimum: 3"
				);
				expect(onValidated.calledWith(false, [{ field: schema.fields[0], error: "Invalid name" }])).to.be.true;
				done();
			});
		});
	});

	describe("check custom slot", () => {
		let schema = {
			fields: [
				{
					type: "input",
					fieldOptions: {
						inputType: "text",
						min: 3
					},
					label: "My label",
					help: "My help",
					hint: "My hint",
					model: "name",
					validator: ["string"]
				}
			]
		};
		let model = { name: "B" };
		let formOptions = { validateAfterLoad: true };
		let formGenerator;
		let form;

		beforeEach(() => {
			createFormGenerator(
				{ schema, model, formOptions },
				{},
				`<vue-form-generator :schema="schema" ref="form" tag="section">
					<template slot="label" slot-scope="{ field, getValueFromOption }">
						<span class="custom-class--label">Custom label</span>
						<div v-html="getValueFromOption(field, 'label', undefined)"></div>
					</template>

					<template slot="help" slot-scope="{ field, getValueFromOption }">
						<span class="custom-class--help">Custom help</span>
						<div v-html="getValueFromOption(field, 'help', undefined)"></div>
					</template>

					<template slot="hint" slot-scope="{ field, getValueFromOption }">
						<span class="custom-class--hint">Custom hint</span>
						<div v-html="getValueFromOption(field, 'hint', undefined)"></div>
					</template>

					<template slot="errors" slot-scope="{ errors, field, getValueFromOption }">
						<span class="custom-class--errors">Custom errors</span>
						<div v-for="(error, index) in errors" :key="index">
							{{index}}
						</div>
					</template>
				</vue-form-generator>`
			);
			formGenerator = wrapper.find({ name: "form-generator" });
			form = formGenerator.vm;
		});

		it("should have a custom label", () => {
			expect(formGenerator.find(".custom-class--label").exists()).to.be.true;
		});

		it("should have a custom help", () => {
			expect(formGenerator.find(".custom-class--help").exists()).to.be.true;
		});

		it("should have a custom hint", () => {
			expect(formGenerator.find(".custom-class--hint").exists()).to.be.true;
		});
		// TODO: fix error not showing
		it.skip("should have a custom error", (done) => {
			Vue.config.errorHandler = done;

			form.validate().then(
				() => {
					Vue.nextTick(() => {
						expect(formGenerator.find(".custom-class--errors").exists()).to.be.true;
						done();
					});
				},
				() => {}
			);
		});
	});
});
