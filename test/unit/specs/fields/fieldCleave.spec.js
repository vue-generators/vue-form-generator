import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldCleave from "src/fields/optional/fieldCleave.vue";

Vue.component("FieldCleave", FieldCleave);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldCleave", schema, model, disabled, options);
}

describe("fieldCleave.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "masked",
			label: "Phone",
			model: "phone",
			autocomplete: "off",
			placeholder: "",
			readonly: false,
			cleaveOptions: {
				phone: true,
				phoneRegionCode: "HU",
			}
		};
		let model = { phone: "30 123 4567" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an masked input element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("30 123 4567");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.phone = "70 555 4433";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("70 555 4433");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "21 888 6655";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.phone).to.be.equal("21 888 6655");
				done();
			});

		});

		it("should be formatted data in model", (done) => {
			field.cleave.setRawValue("301234567");
			expect(input.value).to.be.equal("30 123 4567");
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.phone).to.be.equal("30 123 4567");
				done();
			});

		});

	});

});