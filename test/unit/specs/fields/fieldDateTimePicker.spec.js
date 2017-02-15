import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";
import fecha from "fecha";

import Vue from "vue";
import FieldDateTimePicker from "src/fields/optional/fieldDateTimePicker.vue";

Vue.component("FieldDateTimePicker", FieldDateTimePicker);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldDateTimePicker", schema, model, disabled, options);
}

describe("fieldDateTimePicker.vue", function() {

	describe.skip("check template", () => {
		let schema = {
			type: "dateTimePicker",
			label: "Event",
			model: "event",
			autocomplete: "off",
			placeholder: "",
			readonly: false
		};
		let model = { event: 1462799081231 };
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
				expect(input.value).to.be.equal( fecha.format(new Date(1462799081231), "YYYY-MM-DD HH:mm:ss") );
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
			model.event = 1234567890123;
			vm.$nextTick( () => {
				expect(input.value).to.be.equal( fecha.format(new Date(1234567890123), "YYYY-MM-DD HH:mm:ss") );
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = fecha.format(new Date(1420194153000), "YYYY-MM-DD HH:mm:ss");
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.event).to.be.equal(1420194153000);
				done();
			});

		});

	});

	describe.skip("check YYYYMMDD format", () => {
		let schema = {
			type: "dateTimePicker",
			label: "Event",
			model: "event",
			format: "YYYYMMDD",
			dateTimePickerOptions: {
				format: "YYYY.MM.DD"
			}
		};
		let model = { event: "20160509" };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal( fecha.format(new Date("20160509"), schema.format).format(schema.dateTimePickerOptions.format) );
				done();
			});
		});

		it("model value should be the formatted input value if changed", (done) => {
			input.value = "2015.01.02";
			trigger(input, "input");

			vm.$nextTick( () => {
				expect(model.event).to.be.equal( "20150102" );
				done();
			});

		});
	});

});
