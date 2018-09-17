import { mount, createLocalVue } from "@vue/test-utils";
import fecha from "fecha";
import Vue from "vue";

let jQuery = require("jquery");
let $ = jQuery(window);
global.$ = $; // make availble to other files if necessary
global.datetimepicker = window.datetimepicker;
require("eonasdan-bootstrap-datetimepicker");

import FieldDateTimePicker from "src/fields/optional/fieldDateTimePicker.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldDateTimePicker, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: data
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}
	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldDateTimePicker.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "dateTimePicker",
			label: "Event",
			model: "event",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: ""
		};
		let model = { event: 1462799081231 };
		let input;

		before(() => {
			createField({ schema, model });
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
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach(function(name) {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});
		});

		it("input value should be the model value after changed", (done) => {
			wrapper.setProps({ model: { event: 1234567890123 } });

			Vue.config.errorHandler = done;
			Vue.nextTick(() => {
				expect(input.element.value).to.be.equal(fecha.format(new Date(1234567890123), "YYYY-MM-DD HH:mm:ss"));
				done();
			});
		});

		it("model value should be the input value if changed", () => {
			input.setValue(fecha.format(new Date(1420194153000), "YYYY-MM-DD HH:mm:ss"));

			expect(wrapper.props().model.event).to.be.equal(1420194153000);
		});
	});

	describe("check YYYYMMDD format", () => {
		let schema = {
			type: "dateTimePicker",
			label: "Event",
			model: "event",
			fieldOptions: {
				format: "YYYYMMDD"
			}
		};
		let model = { event: "20160509" };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal(fecha.format(new Date("2016-05-09"), schema.fieldOptions.format));
		});

		it("model value should be the formatted input value if changed", () => {
			input.setValue("2015.01.02");

			expect(wrapper.props().model.event).to.be.equal("20150102");
		});
	});
});
