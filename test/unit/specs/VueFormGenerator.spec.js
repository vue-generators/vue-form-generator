import { expect } from "chai";

import Vue from "vue";
import VueFormGenerator from "src/index";

Vue.use(VueFormGenerator);

let el, vm;

function createFormGenerator(schema = {}, model = null, options = {}) {
	el = document.createElement("div");		
	el.innerHTML = `<vue-form-generator :schema="schema" :model="model" :options="options"></vue-form-generator>`;
	vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			options
		}
	});

	console.log(el);

	return [el, vm];
}

describe("VueFormGenerator.vue", () => {

	describe("with empty schema", () => {
		let schema = {};
		let model = null;

		beforeEach( () => {
			createFormGenerator(schema);
		});

		it("should be create HTML table", () => {
			expect(vm.$el).to.be.exist;
			expect(el.getElementsByTagName("table")).to.be.length(1);

			let table = el.getElementsByTagName("table")[0];
			expect(table.getElementsByTagName("tbody")).to.be.length(1);
		});

	});

	describe("check form row classes", () => {
		let tr;
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
			tr = el.getElementsByTagName("tr")[0];
		});

		it("should be empty classList", () => {
			expect(tr.classList.length).to.be.equal(0);
		});

		it("should be featured class", (done) => {
			vm.schema.fields[0].featured = true;
			vm.$nextTick(() => {
				expect(tr.classList.contains("featured")).to.be.true;
				done();
			})
		});

		it("should be readonly class", (done) => {
			vm.schema.fields[0].readonly = true;
			vm.$nextTick(() => {
				expect(tr.classList.contains("readonly")).to.be.true;
				done();
			})
		});		

		it("should be disabled class", (done) => {
			vm.schema.fields[0].disabled = true;
			vm.$nextTick(() => {
				expect(tr.classList.contains("disabled")).to.be.true;
				done();
			})
		});		

		it("should be required class", (done) => {
			vm.schema.fields[0].required = true;
			vm.$nextTick(() => {
				expect(tr.classList.contains("required")).to.be.true;
				done();
			})
		});		

		it("should be error class", (done) => {
			vm.$set("schema.fields[0].errors", [ "!!!" ]);
			vm.$nextTick(() => {
				expect(tr.classList.contains("error")).to.be.true;
				done();
			})
		});		

		it("should be add a custom classes", (done) => {
			vm.$set("schema.fields[0].styleClasses", "classA");
			vm.$nextTick(() => {
				expect(tr.classList.contains("classA")).to.be.true;
				done();
			})
		});		

		it("should be add more custom classes", (done) => {
			vm.$set("schema.fields[0].styleClasses", [ "classB", "classC" ]);
			vm.$nextTick(() => {
				expect(tr.classList.contains("classB")).to.be.true;
				expect(tr.classList.contains("classC")).to.be.true;
				done();
			})
		});		

	});	

	describe("check form row caption cell", () => {
		let tr, tdCaption, tdField;
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
			tr = el.getElementsByTagName("tr")[0];
			tdCaption = tr.getElementsByTagName("td")[0];
			tdField = tr.getElementsByTagName("td")[1];
		});

		it("should be text of cell is the name of field", () => {
			expect(tdCaption).to.be.exist;
			expect(tdCaption.textContent).to.be.equal("Name");
		});

		it("should be a question icon if has helpText", (done) => {
			vm.schema.fields[0].help = "Sample help";
			vm.$nextTick(() => {
				let span = tr.querySelector(".help");
				expect(span).to.be.exist;
				expect(span.querySelector("i")).to.be.exist;
				expect(span.querySelector(".helpText")).to.be.exist;
				expect(span.querySelector(".helpText").textContent).to.be.equal("Sample help");
				done();
			})
		});

	});

	describe("check form row field cell", () => {
		let tr, tdField;
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
			tr = el.getElementsByTagName("tr")[0];
			tdField = tr.getElementsByTagName("td")[1];
		});

		it("should be a .field-wrap div", () => {
			expect(tdField.querySelector(".field-wrap")).to.be.exist;
		});

		it("should be a hint div if hint is not null", () => {
			let hint = tdField.querySelector(".hint");
			expect(hint).to.be.exist;
			expect(hint.textContent).to.be.equal("Hint text");
		});

		it("should be .errors div if there are errors in fields", (done) => {
			vm.schema.fields[0].errors.push("Some error!", "Another error!");
			vm.$nextTick(() => {
				let div = tdField.querySelector(".errors");
				expect(div).to.be.exist;
				let errors = div.querySelectorAll("span");
				expect(errors.length).to.be.equal(2);
				expect(errors[0].textContent).to.be.equal("Some error!");
				expect(errors[1].textContent).to.be.equal("Another error!");
				done();
			});
		});

	});


});