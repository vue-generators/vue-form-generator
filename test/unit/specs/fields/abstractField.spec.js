import { mount, createLocalVue } from "@vue/test-utils";

import AbstractField from "src/fields/abstractField";
const localVue = createLocalVue();

let wrapper, field;

function createField(data, methods) {
	const _wrapper = mount(AbstractField, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: data,
		template: `<div></div>`
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}

	wrapper = _wrapper;

	field = wrapper.vm;

	return wrapper;
}

describe("abstractField.vue", () => {
	describe("check static value", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name"
		};
		let model = { name: "John Doe" };

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should give the model static value", () => {
			expect(wrapper.exists()).to.be.true;
			expect(field.value).to.be.equal("John Doe");
		});

		it("should set new value to model if value changed", () => {
			field.value = "Foo Bar";
			expect(wrapper.props().model.name).to.be.equal("Foo Bar");
		});
	});

	describe("check nested value", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "user.name"
		};
		let model = {
			user: {
				name: "John Doe"
			}
		};

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should give the model static value", () => {
			expect(field).to.be.exist;
			expect(field.value).to.be.equal("John Doe");
		});

		it("should set new value to model if value changed", () => {
			field.value = "Foo Bar";

			expect(model.user.name).to.be.equal("Foo Bar");
		});
	});

	describe("check nested value if not exists", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "user.name.first"
		};
		let model = {
			user: {}
		};

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should give the model static value", () => {
			expect(field).to.be.exist;
			expect(field.value).to.be.undefined;
		});

		it("should set new value to model if value changed", () => {
			field.value = "Foo Bar";

			expect(model.user.name.first).to.be.equal("Foo Bar");
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it.skip("should be called the schema.get function", () => {
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

		beforeEach(() => {
			createField({ schema, model });
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should called once the schema.onChanged", () => {
			schema.onChanged.resetHistory();
			field.value = "Jane Doe";

			expect(schema.onChanged.calledOnce).to.be.true;
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

		beforeEach(() => {
			createField({ schema, model, options });
			field.validate = sinon.spy();
		});

		it("should not call validate function after value changed", () => {
			model.name = "Jane Doe";

			expect(field.validate.callCount).to.be.equal(0);
		});

		it.skip("should call validate function after value changed", () => {
			options.validateAfterChanged = true;
			field.value = "Jane Roe";

			expect(field.validate.callCount).to.be.equal(1);
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should call schema validator", () => {
			schema.validator.resetHistory();
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it.skip("should not call schema validator", () => {
			schema.validator.resetHistory();
			wrapper.setProps({ schema: { ...schema } });
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should not call schema validator", () => {
			schema.validator.resetHistory();
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should call schema validator", () => {
			spy1.resetHistory();
			spy2.resetHistory();
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

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should called once the schema.onValidated", () => {
			schema.onValidated.resetHistory();
			let res = field.validate();

			expect(res).to.be.an.instanceof(Array);
			expect(res.length).to.be.equal(1);
			expect(res[0]).to.be.equal("Validation error!");

			expect(schema.onValidated.calledOnce).to.be.true;
			expect(schema.onValidated.calledWith(model, field.errors, schema)).to.be.true;
		});
	});

	describe("check schema onValidated event", () => {
		let schema = {
			type: "text",
			label: "Name",
			model: "name",
			fieldOptions: {
				min: 3
			},
			validator: ["string"]
		};
		let model = { name: "John Doe" };

		beforeEach(() => {
			createField({ schema, model });
		});

		it("should return empty array", () => {
			let res = field.validate();

			expect(res).to.be.an.instanceof(Array);
			expect(res.length).to.be.equal(0);
			expect(wrapper.emitted().validated).to.be.an.instanceof(Array);
			expect(wrapper.emitted().validated[0][0]).to.be.true;
			expect(wrapper.emitted().validated[0][1]).to.be.an.instanceof(Array);
		});

		it("should not call 'onValidated'", () => {
			let res = field.validate(true);

			expect(res).to.be.an.instanceof(Array);
			expect(res.length).to.be.equal(0);

			expect(wrapper.emitted().validated).to.be.undefined;
		});

		it("should return empty array", () => {
			model.name = "Al";
			let res = field.validate();

			expect(res).to.be.an.instanceof(Array);
			expect(res.length).to.be.equal(1);
			expect(res[0]).to.be.equal("The length of text is too small! Current: 2, Minimum: 3");

			expect(wrapper.emitted().validated).to.be.an.instanceof(Array);
			expect(wrapper.emitted().validated[0][0]).to.be.false;
			expect(wrapper.emitted().validated[0][1]).to.be.an.instanceof(Array);
			expect(wrapper.emitted().validated[0][1][0]).to.be.equal(
				"The length of text is too small! Current: 2, Minimum: 3"
			);
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

		before(() => {
			createField({ schema, model });
		});

		it("should be undefined", () => {
			expect(field.errors).to.be.an.instanceof(Array);
		});

		it("should be an empty array", () => {
			field.clearValidationErrors();

			expect(field.errors).to.be.not.undefined;
			expect(field.errors).to.be.length(0);
		});

		it("should contain one error string", () => {
			field.validate();

			expect(field.errors).to.be.length(1);
			expect(field.errors[0]).to.be.equal("Validation error!");
		});
	});
	// TODO move into formElement.spec
	// describe("check getFieldID function", () => {
	// 	let schema = {
	// 		type: "text",
	// 		label: "First Name",
	// 		model: "user__model",
	// 		inputName: "input_name"
	// 	};
	// 	let model = {};

	// 	before(() => {
	// 		createField({ schema, model });
	// 	});

	// 	it("should return slugified inputName, if available", () => {
	// 		expect(field.getFieldID(schema)).to.be.equal("input-name");
	// 	});

	// 	it("should return slugified label, if no inputName", () => {
	// 		delete schema.inputName;

	// 		expect(field.getFieldID(schema)).to.be.equal("first-name");
	// 	});

	// 	it("should return slugified model name, if no inputName or label", () => {
	// 		delete schema.label;

	// 		expect(field.getFieldID(schema)).to.be.equal("user-model");
	// 	});
	// });

	describe("check classes application to fields", () => {
		let schema = {
			type: "text",
			label: "First Name",
			model: "user__model",
			inputName: "input_name",
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = {};

		before(() => {
			createField({ schema, model });
		});

		it("should have 2 classes ('applied-class' and 'another-class')", () => {
			expect(field.fieldClasses.length).to.be.equal(2);
			expect(field.fieldClasses[0]).to.be.equal("applied-class");
			expect(field.fieldClasses[1]).to.be.equal("another-class");
		});
	});
});
