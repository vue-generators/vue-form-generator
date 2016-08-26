import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldGoogleAddress from "src/fields/fieldGoogleAddress.vue";

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
			readonly: false,
			placeholder: "Field placeholder"
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
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Paris, France");	
				done();
			});
		});

		it("should set readOnly", (done) => {
			schema.readonly = true;
			vm.$nextTick( () => {
				expect(input.readOnly).to.be.true;	
				schema.readonly = false;
				done();
			});
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;	
				field.disabled = false;
				done();
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
			trigger(input, "change");

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