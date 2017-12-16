/* global sinon */
import { expect } from "chai";
import { createVueField, checkAttribute } from "../util";

import Vue from "vue";
import FieldSubmit from "src/fields/core/fieldSubmit.vue";

Vue.component("FieldSubmit", FieldSubmit);

// eslint-disable-next-line
let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldSubmit", schema, model, disabled, options);
}

describe("fieldSubmit.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "submit",
			buttonText: "Submit form",
			validateBeforeSubmit: false,
			onSubmit() {},
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { name: "John Doe" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input submit element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("submit");
			expect(input.value).to.be.equal("Submit form");
		});

		describe("valid form", function() {
			it("should not call validate if validateBeforeSubmit is false", () => {
				schema.onSubmit = sinon.spy();
				let cb = sinon.spy();
				field.$parent.validate = cb;

				input.click();
				expect(cb.called).to.be.false;
				expect(schema.onSubmit.calledOnce).to.be.true;
				expect(schema.onSubmit.calledWith(model, schema)).to.be.true;
			});


			it("should call validate if validateBeforeSubmit is true", () => {
				schema.validateBeforeSubmit = true;
				schema.onSubmit = sinon.spy();
				let cb = sinon.spy();
				field.$parent.validate = cb;

				input.click();
				expect(cb.called).to.be.true;
				expect(schema.onSubmit.called).to.be.true;
			});
		});

		describe("invalid form", function() {
			it("should not call onSubmit if validateBeforeSubmit is true", () => {
				schema.validateBeforeSubmit = true;
				schema.onSubmit = sinon.spy();
				let cb = sinon.spy(() => {
					return ["an error occurred"];
				});
				field.$parent.validate = cb;

				input.click();
				expect(cb.called).to.be.true;
				expect(schema.onSubmit.called).to.be.true;
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("should have 2 classes", () => {
			expect(input.className.indexOf("applied-class")).not.to.be.equal(-1);
			expect(input.className.indexOf("another-class")).not.to.be.equal(-1);
		});

	});

});