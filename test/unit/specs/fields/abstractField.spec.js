/* global sinon */
import { expect } from "chai";

import Vue from "vue";
import AbstractField from "src/fields/abstractField";

Vue.component("AbstractField", AbstractField);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	el = document.createElement("div");		

	// eslint-disable-next-line quotes
	el.innerHTML = `<abstract-field :schema="schema" :model="model" :disabled="disabled" ref="field"></abstract-field>`;
	vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			disabled,
			options
		}
	});

	field = vm.$refs.field;
	// console.log(el);

	return [el, vm];
}

describe("abstractField.vue", function() {

	describe("check static value", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name"
		};
		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should give the model static value", () => {
			expect(field).to.be.exist;
			expect(field.value).to.be.equal("John Doe");
		});

		it("should set new value to model if value changed", () => {
			field.value = "Foo Bar";
			expect(model.name).to.be.equal("Foo Bar");
		});

	});
	
	describe("check value as get/set function", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			get: sinon.stub().returns("John Smith"),
			set: sinon.stub()
		};
		let model = {};

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should be called the schema.get function", () => {
			expect(field).to.be.exist;
			field.schema.get.reset();
			expect(field.value).to.be.equal("John Smith");
			expect(field.schema.get.calledOnce).to.be.true;
		});

		it("should set new value to model if value changed", () => {
			field.schema.set.reset();
			field.value = "John Roe";
			expect(field.schema.set.calledOnce).to.be.true;
			expect(field.schema.set.calledWith(model, "John Roe")).to.be.true;
		});

	});

	describe("check formatValueToField & formatValueToModel function", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name"
		};
		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
			field.formatValueToField = function(value) {
				return "**" + value + "**";
			};

			field.formatValueToModel = function(value) {
				return "!!" + value + "!!";
			};
		});

		it("should return the formatted value", () => {
			expect(field.value).to.be.equal("**John Doe**");
		});

		it("should set the formatted value to model", () => {
			field.value = "Foo Bar";
			expect(model.name).to.be.equal("!!Foo Bar!!");
		});

	});	

	describe("check schema onChanged event", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			onChanged: sinon.spy()
		};
		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should called once the schema.onChanged", (done) => {
			schema.onChanged.reset();
			model.name = "Jane Doe";
			vm.$nextTick(() => {
				expect(schema.onChanged.calledOnce).to.be.true;
				expect(schema.onChanged.calledWith(model, "Jane Doe", "John Doe", schema)).to.be.true;
				done();
			});
		});

	});	

	describe("check validateAfterChanged option", () => {
		let schema = {
			type: "text",		
			label: "Name", 
			model: "name"
		};

		let model = { name: "John Doe" };
		let options = {
			validateAfterChanged: false
		};

		beforeEach( () => {
			createField(this, schema, model, false, options);
			field.validate = sinon.spy();
		});

		it("should not call validate function after value changed", (done) => {
			model.name = "Jane Doe";
			vm.$nextTick( () => {
				expect(field.validate.callCount).to.be.equal(0);
				done();
			});
		});

		it("should not call validate function after value changed", (done) => {
			options.validateAfterChanged = true;
			model.name = "Jane Roe";
			vm.$nextTick( () => {
				expect(field.validate.callCount).to.be.equal(1);
				done();
			});
		});

	});	

	describe("check validate function with one validator", () => {
		let schema = {
			type: "text",		
			label: "Name", 
			model: "name", 
			validator: sinon.spy()
		};

		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should call schema validator", () => {
			schema.validator.reset();
			field.validate();
			expect(schema.validator.calledOnce).to.be.true;
			expect(schema.validator.calledWith(field.value, schema, model)).to.be.true;
		});

	});	

	describe("check validate function if field is disabled", () => {
		let schema = {
			type: "text",		
			label: "Name", 
			model: "name", 
			validator: sinon.spy()
		};

		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model, true);
		});

		it("should not call schema validator", () => {
			schema.validator.reset();
			field.validate();
			expect(schema.validator.callCount).to.be.equal(0);
		});

	});	

	describe("check validate function if field is readonly", () => {
		let schema = {
			type: "text",		
			label: "Name", 
			model: "name", 
			readonly: true,
			validator: sinon.spy()
		};

		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should not call schema validator", () => {
			schema.validator.reset();
			field.validate();
			expect(schema.validator.callCount).to.be.equal(0);
		});

	});		

	describe("check validate function with validator array", () => {
		let spy1 = sinon.spy();
		let spy2 = sinon.spy();
		let schema = {
			type: "text",		
			label: "Name", 
			model: "name", 
			validator: [spy1, spy2]
		};

		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should call schema validator", () => {
			spy1.reset();
			spy2.reset();
			field.validate();

			expect(spy1.calledOnce).to.be.true;
			expect(spy1.calledWith(field.value, schema, model)).to.be.true;

			expect(spy2.calledOnce).to.be.true;
			expect(spy2.calledWith(field.value, schema, model)).to.be.true;
		});

	});

	describe("check schema onValidated event", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			validator: sinon.stub().returns("Validation error!"),
			onValidated: sinon.spy()
		};
		let model = { name: "John Doe" };

		beforeEach( () => {
			createField(this, schema, model);
		});

		it("should called once the schema.onValidated", () => {
			schema.onValidated.reset();
			let res = field.validate();
			expect(res).to.be.an.array;
			expect(res.length).to.be.equal(1);
			expect(res[0]).to.be.equal("Validation error!");

			expect(schema.onValidated.calledOnce).to.be.true;
			expect(schema.onValidated.calledWith(model, field.schema.errors, schema)).to.be.true;
		});

	});		

	describe("check clearValidationErrors", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			validator: sinon.stub().returns("Validation error!")
		};
		let model = { name: "John Doe" };

		before( () => {
			createField(this, schema, model);
		});

		it("should be undefined", () => {
			expect(schema.errors).to.be.undefined;
		});

		it("should be an empty array", () => {
			field.clearValidationErrors();
			expect(schema.errors).to.be.defined;
			expect(schema.errors).to.be.length(0);
		});

		it("should contain one error string", () => {
			field.validate();
			expect(schema.errors).to.be.length(1);
			expect(schema.errors[0]).to.be.equal("Validation error!");
		});

	});	

});