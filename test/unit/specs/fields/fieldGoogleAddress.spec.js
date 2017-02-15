import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import FieldGoogleAddress from "src/fields/optional/fieldGoogleAddress.vue";

Vue.component("FieldGoogleAddress", FieldGoogleAddress);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldGoogleAddress", schema, model, disabled, options);
}

describe("fieldGoogleAddress.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "text",
			label: "Address",
			model: "address",
			autocomplete: "off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { address: "Paris, France" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Paris, France");
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
			model.address = "Rome, Italy";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Rome, Italy");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "Budapest, Hungary";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.address).to.be.equal("Budapest, Hungary");
				done();
			});

		});

		/*
			TODO:
				1. check HTML list if typing
				2. check geolocate called if input got focus
				3. check onPlaceChanged called
		 */

	});

});