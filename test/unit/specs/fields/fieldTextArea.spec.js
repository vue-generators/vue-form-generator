import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldTextArea from "src/fields/core/fieldTextArea.vue";

Vue.component("FieldTextArea", FieldTextArea);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldTextArea", schema, model, disabled, options);
}


describe("fieldTextArea.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "textarea",
			label: "Description",
			model: "desc",
			max: 500,
			placeholder: "Field placeholder",
			readonly: false,
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("textarea")[0];
		});

		it("should contain a textarea element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.rows).to.be.equal(2);	// default value is 2
			expect(input.maxLength).to.be.equal(500);
		});

		it("should change rows to 4", (done) => {
			Vue.set(field.schema, "rows", 4);
			vm.$nextTick( () => {
				expect(input.rows).to.be.equal(4);
				done();
			});
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal(model.desc);
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.desc = "Jane Doe";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Jane Doe");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "John Smith";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.desc).to.be.equal("John Smith");
				done();
			});

		});

		it("should have 2 classes", () => {
			expect(input.className.indexOf("applied-class")).not.to.be.equal(-1);
			expect(input.className.indexOf("another-class")).not.to.be.equal(-1);
		});

	});

});