import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import FieldLabel from "src/fields/core/fieldLabel.vue";

Vue.component("FieldLabel", FieldLabel);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldLabel", schema, model, disabled, options);
}

describe("fieldLabel.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "label",
			label: "Timestamp",
			model: "timestamp",
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { timestamp: "2 days ago" };
		let span;

		before( () => {
			createField(this, schema, model, false);
			span = el.getElementsByTagName("span")[0];
		});

		it("should contain a span element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(span).to.be.defined;
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(span.textContent).to.be.equal("2 days ago");
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.timestamp = "Foo bar";
			vm.$nextTick( () => {
				expect(span.textContent).to.be.equal("Foo bar");
				done();
			});

		});

		it("should have 2 classes", () => {
			expect(span.className.indexOf("applied-class")).not.to.be.equal(-1);
			expect(span.className.indexOf("another-class")).not.to.be.equal(-1);
		});

	});

});