import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import fieldUpload from "src/fields/core/fieldUpload.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(fieldUpload, {
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

describe("fieldUpload.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "upload",
			label: "Upload",
			inputName: "testupload",
			placeholder: "",
			readonly: false,
			required: false,
			disabled: false,
			fieldOptions: {
				multiple: true,
				accept: "image/*"
			}
		};
		let model = {};
		let attributes = ["disabled", "placeholder", "readonly"];
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
			schema.fieldOptions = { inputType: "file" };
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("file");
			expect(input.classes()).to.include("form-control");
		});

		describe("check optional attribute", () => {
			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, wrapper, schema);
				});
			});

			it("should set name", () => {
				expect(input.attributes().name).to.be.equal("testupload");
			});

			it("should set required", () => {
				expect(input.attributes().required).to.be.undefined;
			});

			it("should set multiple", () => {
				expect(input.attributes().multiple).to.be.equal("multiple");
			});

			it("should set accept", () => {
				expect(input.attributes().accept).to.be.equal("image/*");
			});
		});
	});
});
