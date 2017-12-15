/* global sinon */
import { expect } from "chai";

import Vue from "vue";
import VueFormGenerator from "src/index";

Vue.use(VueFormGenerator);

let el, vm;

function createFormGenerator(schema = {}, model = null, options, multiple) {
	let elm = document.createElement("div");
	vm = new Vue({
		// eslint-disable-next-line quotes
		template: `<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="multiple" ref="form"></vue-form-generator>`,
		data: {
			schema,
			model,
			options,
			multiple
		}
	}).$mount(elm);
	/*
	vm.$nextTick(() => {
		console.log(el);
		console.log(vm.$el);

	});
	*/
	el = vm.$el;

	return [el, vm];
}

describe("VueFormGenerator.vue", () => {

	describe("with empty schema", () => {
		let schema = {
			fields: []
		};

		beforeEach( () => {
			createFormGenerator(schema);
		});

		it("should be create fieldset", () => {
			expect(vm.$el).to.be.exist;
			expect(el.getElementsByTagName("fieldset")).to.be.length(1);
		});

	});

	describe("with empty schema and custom tag", () => {
		let schema = {
			fields: []
		};

		beforeEach( () => {
			let elm = document.createElement("div");
			vm = new Vue({
				// eslint-disable-next-line quotes
				template: `<vue-form-generator :schema="schema" ref="form" tag="section"></vue-form-generator>`,
				data: {
					schema
				}
			}).$mount(elm);

			el = vm.$el;

			return [el, vm];
		});

		it("should be create custom tag", () => {
			expect(vm.$el).to.be.exist;
			expect(el.getElementsByTagName("section")).to.be.length(1);
		});

	});

	describe("check form-group classes", () => {
		let group;
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					readonly: false,
					featured: false,
					required: false,
					disabled: false
				}
			]
		};

		before( () => {
			createFormGenerator(schema);
			group = el.querySelector(".form-group");
		});

		it("should be minimal classes", () => {
			expect(group.classList.length).to.be.equal(2);
			expect(group.classList.contains("form-group")).to.be.true;
			expect(group.classList.contains("field-input")).to.be.true;
		});

		it("should be featured class", (done) => {
			vm.schema.fields[0].featured = true;
			vm.$nextTick(() => {
				expect(group.classList.contains("featured")).to.be.true;
				done();
			});
		});

		it("should be readonly class", (done) => {
			vm.schema.fields[0].readonly = true;
			vm.$nextTick(() => {
				expect(group.classList.contains("readonly")).to.be.true;
				done();
			});
		});

		it("should be disabled class", (done) => {
			vm.schema.fields[0].disabled = true;
			vm.$nextTick(() => {
				expect(group.classList.contains("disabled")).to.be.true;
				done();
			});
		});

		it("should be required class", (done) => {
			vm.schema.fields[0].required = true;
			vm.$nextTick(() => {
				expect(group.classList.contains("required")).to.be.true;
				done();
			});
		});

		it("should be error class", (done) => {
			vm.$refs.form.errors.push({ field: vm.schema.fields[0], error: "Validation error!" });
			vm.$nextTick(() => {
				expect(group.classList.contains("error")).to.be.true;
				done();
			});
		});

		describe("custom validation classes", () => {
			before(() => {
				let options = {
					validationErrorClass: "has-error",
					validationSuccessClass: "has-success",
				};
				createFormGenerator(schema, null, options);
				group = el.querySelector(".form-group");
			});

			it("error class", (done) => {
				vm.$refs.form.errors.push({field: vm.schema.fields[0], error: "Validation error!"});
				vm.$nextTick(() => {
					expect(group.classList.contains("has-error")).to.be.true;
					done();
				});
			});

			it("success class", (done) => {
				vm.$refs.form.errors = [];
				vm.$nextTick(() => {
					expect(group.classList.contains("has-success")).to.be.true;
					done();
				});
			});
		});

		it("should be add a custom classes", (done) => {
			Vue.set(vm.schema.fields[0], "styleClasses", "classA");
			vm.$nextTick(() => {
				expect(group.classList.contains("classA")).to.be.true;
				done();
			});
		});

		it("should be add more custom classes", (done) => {
			Vue.set(vm.schema.fields[0], "styleClasses", [ "classB", "classC" ]);
			vm.$nextTick(() => {
				expect(group.classList.contains("classB")).to.be.true;
				expect(group.classList.contains("classC")).to.be.true;
				done();
			});
		});

	});

	describe("check label classes", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					labelClasses: ["applied-class", "another-class"]
				}
			]
		};
		let label;

		before( () => {
			createFormGenerator(schema);
			label = el.querySelector("label");
		});

		it("should be 2 classes", () => {
			expect(label.classList.contains("applied-class")).to.be.true;
			expect(label.classList.contains("another-class")).to.be.true;
		});
		
	});

	describe("check form row caption cell", () => {
		let group, label;
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					help: null
				}
			]
		};

		before( () => {
			createFormGenerator(schema);
			group = el.querySelector(".form-group");
			label = group.querySelector("label");
		});

		it("should be text of cell is the name of field", () => {
			expect(label).to.be.exist;
			expect(label.textContent).to.be.equal("Name");
		});

		it("should be a question icon if has helpText", (done) => {
			vm.schema.fields[0].help = "Sample help";
			vm.$nextTick(() => {
				let span = group.querySelector(".help");
				expect(span).to.be.exist;
				expect(span.querySelector("i")).to.be.exist;
				expect(span.querySelector(".helpText")).to.be.exist;
				expect(span.querySelector(".helpText").textContent).to.be.equal("Sample help");
				done();
			});
		});

	});

	describe("check form row field cell", () => {
		let group; //, label;
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					hint: "Hint text",
					errors: [],
					placeholder: "User's name"
				}
			]
		};

		before( () => {
			createFormGenerator(schema);
			group = el.querySelector(".form-group");
			//label = group.querySelector("label");
		});

		it("should be a .field-wrap div", () => {
			expect(group.querySelector(".field-wrap")).to.be.exist;
		});

		it("should be a hint div if hint is not null", () => {
			let hint = group.querySelector(".hint");
			expect(hint).to.be.exist;
			expect(hint.textContent).to.be.equal("Hint text");
		});

		it("should be .errors div if there are errors in fields", (done) => {
			vm.$refs.form.errors.push({ field: vm.schema.fields[0], error: "Some error!" });
			vm.$refs.form.errors.push({ field: vm.schema.fields[0], error: "Another error!" });
			vm.$nextTick(() => {
				let div = group.querySelector(".errors");
				expect(div).to.be.exist;
				let errors = div.querySelectorAll("span");
				expect(errors.length).to.be.equal(2);
				expect(errors[0].textContent).to.be.equal("Some error!");
				expect(errors[1].textContent).to.be.equal("Another error!");
				done();
			});
		});

	});

	describe("check computed fields if multiple is true", () => {
		let schema = {
			fields: [
				{	type: "input", inputType: "text", label: "name", model: "name", multi: false	},
				{	type: "input", inputType: "text", label: "phone", model: "phone", multi: true	},
				{	type: "input", inputType: "text", label: "email", model: "email"	} // multi is undefined
			]
		};
		let form;

		before( () => {
			createFormGenerator(schema, {}, {}, true);
			form = vm.$refs.form;
		});

		it("should render only phone field", () => {
			expect(form.fields.length).to.be.equal(1);
			expect(el.querySelector(".form-group label").textContent).to.be.equal("phone");
		});
	});

	describe("check fieldDisabled with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					disabled(model) { return !model.status; }
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be enabled the name field", () => {
			let input = el.getElementsByTagName("input")[0];
			expect(input.disabled).to.be.false;
		});

		it("should be disabled the name field", (done) => {
			model.status = false;
			vm.$nextTick(() => {
				let input = el.getElementsByTagName("input")[0];
				expect(input.disabled).to.be.true;

				done();
			});
		});

	});

	describe("check fieldDisabled function parameters", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					disabled: sinon.spy()
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be called with correct params", () => {
			let spy = schema.fields[0].disabled;
			expect(spy.called).to.be.true;
			expect(spy.calledWith(model, schema.fields[0], vm.$children[0])).to.be.true;
		});

	});

	describe("check fieldDisabled with const", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					disabled: false
				}
			]
		};

		let model = { name: "John Doe" };

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be enabled the name field", () => {
			let input = el.getElementsByTagName("input")[0];
			expect(input.disabled).to.be.false;
		});

		it("should be disabled the name field", (done) => {
			schema.fields[0].disabled = true;
			vm.$nextTick(() => {
				let input = el.getElementsByTagName("input")[0];
				expect(input.disabled).to.be.true;

				done();
			});
		});

	});

	describe("check fieldReadonly with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					readonly(model) { return model.status; }
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be readonly", () => {
			expect(el.querySelector(".form-group").classList.contains("readonly")).to.be.true;
		});

		it("should be writable", (done) => {
			model.status = false;
			vm.$nextTick(() => {
				expect(el.querySelector(".form-group").classList.contains("readonly")).to.be.false;
				done();
			});
		});

	});

	describe("check fieldHint with function", () => {
		let schema = {
			fields: [
				{
					type: "textArea",
					label: "Note",
					model: "note",
					max: 500,
					rows: 4,
					hint(model) {
						if (model && model.note) {
							return model.note.length + " of max 500 characters used!";
						}
					}
				}
			]
		};

		let model = {
			note: "John Doe"
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be applay", () => {
			expect(el.querySelector(".form-group .hint").textContent).to.be.equal("8 of max 500 characters used!");
		});

		it("should be changed", (done) => {
			model.note= "Dr. John Doe";
			vm.$nextTick(() => {
				expect(el.querySelector(".form-group .hint").textContent).to.be.equal("12 of max 500 characters used!");
				done();
			});
		});

	});

	describe("check fieldFeatured with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					featured(model) { return model.status; }
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be featured", () => {
			expect(el.querySelector(".form-group").classList.contains("featured")).to.be.true;
		});

		it("should not be featured", (done) => {
			model.status = false;
			vm.$nextTick(() => {
				expect(el.querySelector(".form-group").classList.contains("featured")).to.be.false;
				done();
			});
		});

	});

	describe("check fieldRequired with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					required(model) { return model.status; }
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be required", () => {
			expect(el.querySelector(".form-group").classList.contains("required")).to.be.true;
		});

		it("should be optional", (done) => {
			model.status = false;
			vm.$nextTick(() => {
				expect(el.querySelector(".form-group").classList.contains("required")).to.be.false;
				done();
			});
		});

	});

	describe("check fieldVisible with function", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					visible(model) { return model.status; }
				}
			]
		};

		let model = {
			name: "John Doe",
			status: true
		};

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be visible the name field", () => {
			expect(el.querySelector("input[type=text]")).to.be.defined;
		});

		it("should be hidden the name field", (done) => {
			model.status = false;
			vm.$nextTick(() => {
				expect(el.querySelector("input[type=text]")).to.be.null;
				done();
			});
		});

	});

	describe("check fieldVisible with const", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					visible: true
				}
			]
		};

		let model = { name: "John Doe" };

		before( () => {
			createFormGenerator(schema, model);
		});

		it("should be enabled the name field", () => {
			expect(el.querySelector("input[type=text]")).to.be.defined;
		});

		it("should be disabled the name field", (done) => {
			schema.fields[0].visible = false;
			vm.$nextTick(() => {
				expect(el.querySelector("input[type=text]")).to.be.null;
				done();
			});
		});

	});

	describe("check validate", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					min: 3,
					validator: VueFormGenerator.validators.string
				}
			]
		};

		let model = { name: "John Doe" };
		let form;

		before( () => {
			createFormGenerator(schema, model);
			form = vm.$refs.form;
		});

		it("should empty the errors", () => {
			expect(form.errors).to.be.length(0);
			expect(form.validate()).to.be.true;
			expect(form.errors).to.be.length(0);
		});

		it("should give an validation error", () => {
			model.name = "Ab";
			expect(form.validate()).to.be.false;
			expect(form.errors).to.be.length(1);
		});

		it("should no validation error", () => {
			model.name = "Abc";
			expect(form.validate()).to.be.true;
			expect(form.errors).to.be.length(0);
		});

	});

	describe("check validate with validator as string instead of object", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					min: 3,
					validator: "string"
				}
			]
		};

		let model = { name: "John Doe" };
		let form;

		before( () => {
			createFormGenerator(schema, model);
			form = vm.$refs.form;
		});

		it("should empty the errors", () => {
			expect(form.errors).to.be.length(0);
			expect(form.validate()).to.be.true;
			expect(form.errors).to.be.length(0);
		});

		it("should give an validation error", () => {
			model.name = "Ab";
			expect(form.validate()).to.be.false;
			expect(form.errors).to.be.length(1);
		});

		it("should no validation error", () => {
			model.name = "Abc";
			expect(form.validate()).to.be.true;
			expect(form.errors).to.be.length(0);
		});

	});

	describe("check if option null", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name"
				}
			]
		};

		let model = { name: "Me" };
		let form, el, vm;

		before( () => {
			[el, vm] = createFormGenerator(schema, model);
			form = vm.$refs.form;
			document.body.appendChild(el);
		});

		after( () => {
			document.body.removeChild(el);
		});

		it("should be validation error at ready()", (done) => {
			vm.$nextTick( () => {
				expect(form).to.be.defined;
				expect(form.options).to.be.defined;
				done();
			});
		});
	});

	describe("check validateAfterLoad option", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					min: 3,
					validator: VueFormGenerator.validators.string
				}
			]
		};

		let model = { name: "Me" };
		let form;

		before( (done) => {
			createFormGenerator(schema, model, { validateAfterLoad: true });
			vm.$nextTick( () => {
				form = vm.$refs.form;
				done();
			});
		});

		it("should be validation error at mounted()", (done) => {
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(1);
				done();
			});
		});

		it("should be validation error if model is changed", (done) => {
			form.model = { name: "Al" };
			setTimeout(() => {
				expect(form.errors).to.be.length(1);
				done();
			}, 150);
		});

		it("should be no errors if model is correct", (done) => {
			form.model = { name: "Bob" };
			setTimeout(() => {
				expect(form.errors).to.be.length(0);
				done();
			}, 150);
		});

		it("should be no errors if validateAfterLoad is false", (done) => {
			form.options.validateAfterLoad = false;
			form.model = { name: "Ed" };
			setTimeout(() => {
				expect(form.errors).to.be.length(0);
				done();
			}, 150);
		});

	});

	describe("check onValidated event", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					min: 3,
					validator: VueFormGenerator.validators.string
				}
			]
		};

		let model = { name: "Bob" };
		let form;
		let onValidated = sinon.spy();

		before( (done) => {
			let elm = document.createElement("div");
			vm = new Vue({
				// eslint-disable-next-line quotes
				template: `<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="false" ref="form" @validated="onValidated"></vue-form-generator>`,
				data: {
					schema,
					model,
					options: {}
				},
				methods: {
					onValidated
				}
			}).$mount(elm);

			el = vm.$el;
			vm.$nextTick( () => {
				form = vm.$refs.form;
				done();
			});
		});

		it("should no errors after mounted()", (done) => {
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(0);
				done();
			});
		});

		it("should be validation error if model value is not valid", () => {
			vm.model.name = "A";
			onValidated.reset();
			form.validate();

			expect(form.errors).to.be.length(1);
			expect(onValidated.callCount).to.be.equal(1);
			expect(onValidated.calledWith(false, [{ field: schema.fields[0], error: "The length of text is too small! Current: 1, Minimum: 3"}] )).to.be.true;
		});

		it("should no validation error if model valie is valid", () => {
			vm.model.name = "Alan";
			onValidated.reset();
			form.validate();

			expect(form.errors).to.be.length(0);
			expect(onValidated.callCount).to.be.equal(1);
			expect(onValidated.calledWith(true, [] )).to.be.true;
		});
	});

	describe("check schema.onChanged when the model changed", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					onChanged: sinon.spy()
				}
			]
		};

		let model = { name: "Me" };
		let form;

		before( (done) => {
			createFormGenerator(schema, model, {});
			vm.$nextTick( () => {
				form = vm.$refs.form;
				done();
			});
		});

		it("should NOT called the schema.onChanged", (done) => {
			schema.fields[0].onChanged.reset();
			form.model = { name: "Bob" };
			vm.$nextTick(() => {
				expect(schema.fields[0].onChanged.called).to.be.false;
				done();
			});
		});

	});

	describe("check onFieldValidated method if child validate", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					min: 3,
					validator: VueFormGenerator.validators.string
				},
				{
					type: "input",
					inputType: "text",
					label: "City",
					model: "city",
					validator() { return "Validation error!"; }
				}
			]
		};

		let model = { name: "Bob" };
		let form;
		let field;
		let onValidated = sinon.spy();

		before( (done) => {
			let elm = document.createElement("div");
			vm = new Vue({
				// eslint-disable-next-line quotes
				template: `<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="false" ref="form" @validated="onValidated"></vue-form-generator>`,
				data: {
					schema,
					model,
					options: {}
				},
				methods: {
					onValidated
				}
			}).$mount(elm);

			el = vm.$el;
			vm.$nextTick( () => {
				form = vm.$refs.form;
				field = form.$children[0];
				done();
			});
		});

		it("should no errors after mounted()", (done) => {
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(0);
				done();
			});
		});

		it("should be validation error if model value is not valid", () => {
			onValidated.reset();
			vm.model.name = "A";
			field.validate();

			expect(form.errors).to.be.length(1);
			expect(onValidated.callCount).to.be.equal(1);
			expect(onValidated.calledWith(false, [{ field: schema.fields[0], error: "The length of text is too small! Current: 1, Minimum: 3"}] )).to.be.true;
		});

		it("should be 2 validation error", () => {
			form.$children[1].validate();
			expect(form.errors).to.be.length(2);
			expect(form.errors[0].error).to.be.equal("The length of text is too small! Current: 1, Minimum: 3");
			expect(form.errors[1].error).to.be.equal("Validation error!");
		});

		it("should only other field validation error", () => {
			vm.model.name = "Alan";
			onValidated.reset();
			field.validate();

			expect(form.errors).to.be.length(1);
			expect(onValidated.callCount).to.be.equal(1);
			expect(onValidated.calledWith(false, [{ field: schema.fields[1], error: "Validation error!"}] )).to.be.true;
		});
	});


	describe("check async validator", () => {
		let schema = {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					validator(value) {
						return new Promise( (resolve) => {
							setTimeout(() => {
								if (value.length >= 3) {
									resolve();
								} else {
									resolve([ "Invalid name" ]);
								}
							}, 50);
						});
					}
				}
			]
		};

		let model = { name: "Bob" };
		let form;
		let field;
		let onValidated = sinon.spy();

		before( (done) => {
			let elm = document.createElement("div");
			vm = new Vue({
				// eslint-disable-next-line quotes
				template: `<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="false" ref="form" @validated="onValidated"></vue-form-generator>`,
				data: {
					schema,
					model,
					options: {}
				},
				methods: {
					onValidated
				}
			}).$mount(elm);

			el = vm.$el;
			vm.$nextTick( () => {
				form = vm.$refs.form;
				field = form.$children[0];
				done();
			});
		});

		it("should no errors after mounted()", (done) => {
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(0);
				done();
			});
		});

		it("should be validation error if model value is not valid", (done) => {
			onValidated.reset();
			vm.model.name = "A";
			field.validate();

			setTimeout(() => {
				expect(form.errors).to.be.length(1);
				expect(onValidated.calledWith(false, [{ field: schema.fields[0], error: "Invalid name"}] )).to.be.true;

				done();
			}, 100);
		});
	});

	describe("check fieldTypeHasLabel function", () => {
		let form;
		before( () => {
			createFormGenerator({ fields: [] }, {});
			form = vm.$refs.form;
		});

		it("should return true", () => {
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "checkbox", label: "checkbox"})).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "text", label: "text"})).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "checklist",label: "checklist"})).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "image", label: "image"})).to.be.true;
		});

		it("should return false", () => {
			// with label text defined
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "button", label: "button"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "submit", label: "submit"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "reset", label: "reset"})).to.be.false;

			// without label text defined
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "checkbox"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "text"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "checklist"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "image"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "button"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "submit"})).to.be.false;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "reset"})).to.be.false;
		});

		it("should default to true for unknown types", () => {
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "unsupported-or-unknown", label:"unsupported"})).to.be.true;
			expect(form.fieldTypeHasLabel({ type: "input", inputType: "unsupported-or-unknown"})).to.be.false;
		});
	});

});
