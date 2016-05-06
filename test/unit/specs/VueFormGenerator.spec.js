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
					disabled: false,
					hint: null,
					helpText: null,
					placeholder: "User's name"
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

	});	
/*
	describe("check form row classes", () => {
		let schema = {
			fields: [
				{
					type: "text",
					label: "Name",
					model: "name",
					readonly: false,
					featured: false,
					required: false,
					disabled: false,
					hint: null,
					helpText: null,
					placeholder: "User's name"
				}
			]
		};
		let model = null;

		beforeEach((done) => {
			createFormGenerator(schema, model, {}, (_el, _vm) => {
				el = _el;
				vm = _vm;
				done();
			});
		});

		it("should be create a row and an input text field with empty value", () => {
			// check row
			let tr = el.getElementsByTagName("tr")[0];
			expect(tr).to.be.exist;
			expect(tr.classList.length).to.be.equal(0);

			let tdCaption = tr.getElementsByTagName("td")[0];
			expect(tdCaption).to.be.exist;
			expect(tdCaption.textContent.trim()).to.be.equal("Name"); // TODO why need to trim?

			let tdField = tr.getElementsByTagName("td")[1];
			expect(tdField).to.be.exist;
			
			let input = tdField.getElementsByTagName("input")[0];
			expect(input).to.be.exist;
			expect(input.type).to.be.equal("text");
		});

	});	*/

});