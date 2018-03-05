import { mount, createLocalVue } from "@vue/test-utils";

import fieldUpload from "src/fields/core/fieldUpload.vue";

const localVue = createLocalVue();
let wrapper;

function createField2(data, methods) {
	const _wrapper = mount(fieldUpload, {
		localVue,
		propsData: data,
		methods: methods
	});

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
			multiple: true,
			accept: "image/*"
		};
		let model = {};
		let attributes = ["disabled", "placeholder", "readonly"];
		let input;

		before(() => {
			createField2({ schema, model, disabled: false });
			input = wrapper.find("input");
			schema.inputType = "file";
			wrapper.update();
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("file");
			expect(input.classes()).to.include("form-control");
		});

		describe("check optional attribute", () => {
			attributes.forEach(name => {
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
