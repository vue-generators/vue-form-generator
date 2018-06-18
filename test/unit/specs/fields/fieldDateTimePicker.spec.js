import { mount, createLocalVue } from "@vue/test-utils";
import fecha from "fecha";

let jQuery = require("jquery");
let $ = jQuery(window);
global.$ = $; // make availble to other files if necessary
global.datetimepicker = window.datetimepicker;
require("eonasdan-bootstrap-datetimepicker");

import FieldDateTimePicker from "src/fields/optional/fieldDateTimePicker.vue";

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(FieldDateTimePicker, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldDateTimePicker.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "dateTimePicker",
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
			expect(input.exists()).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal(fecha.format(new Date(1462799081231), "YYYY-MM-DD HH:mm:ss"));
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			model.event = 1234567890123;
			wrapper.update();

			expect(input.element.value).to.be.equal(fecha.format(new Date(1234567890123), "YYYY-MM-DD HH:mm:ss"));
		});

		it("model value should be the input value if changed", () => {
			input.element.value = fecha.format(new Date(1420194153000), "YYYY-MM-DD HH:mm:ss");
			input.trigger("input");

			expect(model.event).to.be.equal(1420194153000);
		});
	});

	describe("check YYYYMMDD format", () => {
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

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
		});

		it.skip("should contain the value", () => {
			console.log(input.element.value);
			console.log(schema.format);
			console.log(new Date(20160509));
			console.log(fecha.format(new Date(20160509), schema.format));
			console.log(schema.dateTimePickerOptions.format);

			expect(input.element.value).to.be.equal(fecha.format(new Date(20160509), schema.format));
		});

		it("model value should be the formatted input value if changed", () => {
			input.element.value = "2015.01.02";
			input.trigger("input");

			expect(model.event).to.be.equal("20150102");
		});
	});
});
