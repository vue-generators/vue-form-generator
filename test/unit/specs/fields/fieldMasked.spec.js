import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldMasked from "src/fields/optional/fieldMasked.vue";

Vue.component("FieldMasked", FieldMasked);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldMasked", schema, model, disabled, options);
}

describe("fieldMasked.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "masked",
			label: "Phone",
			model: "phone",
			mask: "(99) 999-9999",
			autocomplete: "off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { phone: "(30) 123-4567" };
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
				expect(input.value).to.be.equal("(30) 123-4567");
				done();
			});
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, function(done) {
					checkAttribute(name, vm, input, field, schema, done);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.phone = "(70) 555- 4433";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("(70) 555- 4433");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "(21) 888-6655";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.phone).to.be.equal("(21) 888-6655");
				done();
			});

		});

		it("should be formatted data in model", (done) => {
			input.value = "123456789";
			// Call the paste event what trigger the formatter
			let $input = window.jQuery(input);
			$input.trigger(window.jQuery.Event("paste"));

			setTimeout( () => {
				expect(input.value).to.be.equal("(12) 345-6789");
				trigger(input, "input");

				vm.$nextTick( () => {
					expect(model.phone).to.be.equal("(12) 345-6789");
					done();
				});

			}, 10);

		});

	});

});