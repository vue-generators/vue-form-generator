import { expect } from "chai";
import { createVueField, checkAttribute } from "../util";

import Vue from "vue";
import fieldFile from "src/fields/core/fieldFile.vue";

Vue.component("fieldFile", fieldFile);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[el, vm, field] = createVueField(test, "fieldFile", schema, model, disabled, options);
}

describe("fieldFile.vue", function () {

	describe("check template", () => {
		let schema = {
			type: "file",
			label: "Upload",
			inputName: "testupload",
			placeholder: "Field placeholder",
			readonly: false,
			required: false,
			disabled: false,
			multiple: true,
			accept: "image/*"
		};
		let model = {};
		let attributes = ["disabled", "placeholder", "readonly"];
		let input;

		before(() => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
			field.schema.inputType = "file";
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("file");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		describe("check optional attribute", () => {
			attributes.forEach(function (name) {
				it("should set " + name, function (done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});

			it("should set name", () => {
				expect(input.name).to.be.equal("testupload");
			});

			it("should change name", () => {
				expect(input.name).to.be.equal("testupload");
			});

			it("should set required", () => {
				expect(input.required).to.be.false;
			});

			it("should set multiple", () => {
				expect(input.multiple).to.be.exist;
			});

			it("should set accept", () => {
				expect(input.accept).to.be.equal("image/*");
			});

		});

	});
});
