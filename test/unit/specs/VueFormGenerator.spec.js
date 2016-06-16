import { expect } from "chai";

import Vue from "vue";
import VueFormGenerator from "src/index";

Vue.use(VueFormGenerator);

let el, vm;

function createFormGenerator(schema = {}, model = null, options = {}, multiple = false) {
	el = document.createElement("div");		
	// eslint-disable-next-line quotes
	el.innerHTML = `<vue-form-generator :schema="schema" :model="model" :options="options" :multiple="multiple" v-ref:form></vue-form-generator>`;
	vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			options,
			multiple
		}
	});

	// console.log(el);

	return [el, vm];
}

describe("VueFormGenerator.vue", () => {

	describe("with empty schema", () => {
		let schema = {};

		beforeEach( () => {
			createFormGenerator(schema);
		});

		it("should be create fieldset", () => {
			expect(vm.$el).to.be.exist;
			expect(el.getElementsByTagName("fieldset")).to.be.length(1);
		});

	});

	describe("check form-group classes", () => {
		let group;
		let schema = {
			fields: [
				{
					type: "text",
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
			expect(group.classList.contains("field-text")).to.be.true;
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
			vm.$set("schema.fields[0].errors", [ "!!!" ]);
			vm.$nextTick(() => {
				expect(group.classList.contains("error")).to.be.true;
				done();
			});
		});		

		it("should be add a custom classes", (done) => {
			vm.$set("schema.fields[0].styleClasses", "classA");
			vm.$nextTick(() => {
				expect(group.classList.contains("classA")).to.be.true;
				done();
			});
		});		

		it("should be add more custom classes", (done) => {
			vm.$set("schema.fields[0].styleClasses", [ "classB", "classC" ]);
			vm.$nextTick(() => {
				expect(group.classList.contains("classB")).to.be.true;
				expect(group.classList.contains("classC")).to.be.true;
				done();
			});
		});		

	});	

	describe("check form row caption cell", () => {
		let group, label;
		let schema = {
			fields: [
				{
					type: "text",
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
					type: "text",
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
			vm.schema.fields[0].errors.push("Some error!", "Another error!");
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
				{	type: "text",	label: "name", model: "name", multi: false	},
				{	type: "text",	label: "phone", model: "phone", multi: true	}, 
				{	type: "text",	label: "email", model: "email"	} // multi is undefined
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
					type: "text",		
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

	describe("check fieldDisabled with const", () => {
		let schema = {
			fields: [
				{	
					type: "text",		
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

	describe("check fieldVisible with function", () => {
		let schema = {
			fields: [
				{	
					type: "text",		
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
					type: "text",		
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
					type: "text",		
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

	describe("check validateAfterLoad option", () => {
		let schema = {
			fields: [
				{	
					type: "text",		
					label: "Name", 
					model: "name", 
					min: 3,
					validator: VueFormGenerator.validators.string
				}
			]
		};

		let model = { name: "Me" };
		let form;

		before( () => {
			createFormGenerator(schema, model, { validateAfterLoad: true });
			form = vm.$refs.form;
		});

		it("should be validation error at ready()", (done) => {
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(1);
				done();
			});
		});

		it("should be validation error if model is changed", (done) => {
			form.model = { name: "Al" };
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(1);
				done();
			});
		});		

		it("should be no errors if model is correct", (done) => {
			form.model = { name: "Bob" };
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(0);
				done();
			});
		});		

		it("should be no errors if validateAfterLoad is false", (done) => {
			form.options.validateAfterLoad = false;
			form.model = { name: "Ed" };
			vm.$nextTick( () => {
				expect(form.errors).to.be.length(0);
				done();
			});
		});		

	});

});