import { mount, createLocalVue } from "@vue/test-utils";
import fecha from "fecha";

import FieldPikaday from "src/fields/optional/fieldPikaday.vue";

let Pikaday = require("pikaday");
window.Pikaday = Pikaday;

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldPikaday, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldPikaday.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "dateTime",
			label: "Event",
			model: "event",
			autocomplete: "off",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { event: 1462799081231 };
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal(fecha.format(new Date(1462799081231), "YYYY-MM-DD"));
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute(name, input, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			model.event = 1234567890123;
			wrapper.update();
			expect(input.element.value).to.be.equal(fecha.format(new Date(1234567890123), "YYYY-MM-DD"));
		});

		it.skip("model value should be the input value if changed", () => {
			let day = fecha.format(new Date(1420070400000), "YYYY-MM-DD");
			wrapper.vm.picker.setDate(day);
			// wrapper.update();
			// expect(input.element.value).to.be.equal(day);
			// expect(fecha.format(new Date(model.event), "YYYY-MM-DD")).to.be.equal(day);
		});
	});
});
