import { mount, createLocalVue } from "@vue/test-utils";

import FieldSwitch from "src/fields/optional/fieldSwitch.vue";

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldSwitch, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("FieldSwitch.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "switch",
			label: "Status",
			model: "status",
			autocomplete: "off",
			disabled: false,
			inputName: ""
		};
		let model = { status: true };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it("should contain a checkbox element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("checkbox");
		});

		it("should contain the value", () => {
			expect(input.element.checked).to.be.true;
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("should contain the default On/Off texts", () => {
			let span = wrapper.find("span.label");
			expect(span.attributes()["data-on"]).to.be.equal("On");
			expect(span.attributes()["data-off"]).to.be.equal("Off");
		});

		it("should set disabled", () => {
			wrapper.vm.disabled = true;
			wrapper.update();

			expect(input.attributes().disabled).to.be.equal("disabled");

			wrapper.vm.disabled = false;
			wrapper.update();
		});

		it("input value should be the model value after changed", () => {
			model.status = false;
			wrapper.update();
			expect(input.element.checked).to.be.false;
		});

		it("model value should be the input value if changed", () => {
			input.element.checked = true;
			input.trigger("change");

			expect(model.status).to.be.true;
		});
	});

	describe("check template with custom On/Off texts", () => {
		let schema = {
			type: "switch",
			label: "Status",
			model: "status",
			textOn: "Yes",
			textOff: "No"
		};
		let model = { status: true };

		before(() => {
			createField2({ schema, model, disabled: false });
		});

		it("check attributes", () => {
			let span = wrapper.find("span.label");
			expect(span.attributes()["data-on"]).to.be.equal("Yes");
			expect(span.attributes()["data-off"]).to.be.equal("No");
		});
	});

	describe("check template with custom On/Off values", () => {
		let schema = {
			type: "switch",
			model: "sex",
			textOn: "Female",
			textOff: "Male",
			valueOn: "female",
			valueOff: "male"
		};
		let model = { sex: "female" };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it("check input value", () => {
			expect(input.element.checked).to.be.true;
		});

		it("input value should be the model value after changed", () => {
			model.sex = "male";
			wrapper.update();

			expect(input.element.checked).to.be.false;
		});

		it("model value should be the input value if changed", () => {
			input.element.checked = true;
			input.trigger("change");

			expect(model.sex).to.be.equal("female");
		});
	});
});
