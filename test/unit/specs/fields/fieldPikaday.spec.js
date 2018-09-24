import { mount, createLocalVue } from "@vue/test-utils";
import fecha from "fecha";

import Vue from "vue";
import FieldPikaday from "src/fields/optional/fieldPikaday.vue";

let Pikaday = require("pikaday");
window.Pikaday = Pikaday;

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldPikaday, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: {
			eventBus: new Vue(),
			...data
		}
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}
	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldPikaday.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "dateTime",
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
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal(fecha.format(new Date(1462799081231), "YYYY-MM-DD"));
		});

		describe("check optional attribute", () => {
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, input, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { event: 1234567890123 } });

			expect(input.element.value).to.be.equal(fecha.format(new Date(1234567890123), "YYYY-MM-DD HH:mm:ss"));
		});

		it.skip("model value should be the input value if changed", (done) => {
			let day = fecha.format(new Date(1420070400000), "YYYY-MM-DD");
			wrapper.vm.picker.setDate(day);

			Vue.config.errorHandler = done;
			Vue.nextTick(() => {
				expect(input.element.value).to.be.equal(day);
				expect(fecha.format(wrapper.props().model.event, "YYYY-MM-DD")).to.be.equal(day);
				done();
			});
		});
	});
});
