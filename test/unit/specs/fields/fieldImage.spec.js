import { mount, createLocalVue } from "@vue/test-utils";

import FieldImage from "src/fields/optional/fieldImage.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldImage, {
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

describe("fieldImage.vue", () => {
	describe("check template without preview", () => {
		let schema = {
			type: "image",
			label: "Avatar",
			model: "avatar",
			disabled: false,
			placeholder: "",
			readonly: false,
			inputName: "",
			fieldOptions: {}
		};
		let model = { avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg" };
		let input, fileInput;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input[type=text]");
		});

		it("should contain an input text element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.exists()).to.be.true;
			expect(input.attributes().type).to.be.equal("text");
			expect(input.classes()).to.include("form-control");
			expect(input.classes()).to.include("link");
		});

		it("should contain a file input element", () => {
			fileInput = wrapper.find("input[type=file]");

			expect(fileInput.exists()).to.be.true;
			expect(fileInput.classes()).to.include("form-control");
			expect(fileInput.classes()).to.include("file");
		});

		it("should not visible the preview div", () => {
			let preview = wrapper.find(".preview");

			expect(preview.element.style.display).to.be.equal("block");
		});

		it("should contain the value", () => {
			expect(input.element.value).to.be.equal(model.avatar);
		});

		describe("check optional attribute on text input", () => {
			let attributes = ["disabled", "placeholder", "readonly", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, input, schema);
				});
			});
		});

		describe("check optional attribute on file input", () => {
			let attributes = ["disabled", "inputName"];

			attributes.forEach((name) => {
				it("should set " + name, () => {
					checkAttribute(name, fileInput, schema);
				});
			});
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/felipebsb/128.jpg" } });

			expect(input.element.value).to.be.equal("https://s3.amazonaws.com/uifaces/faces/twitter/felipebsb/128.jpg");
		});

		it("model value should be the input value if changed", () => {
			input.setValue("https://s3.amazonaws.com/uifaces/faces/twitter/peterme/128.jpg");

			expect(wrapper.props().model.avatar).to.be.equal(
				"https://s3.amazonaws.com/uifaces/faces/twitter/peterme/128.jpg"
			);
		});

		it("should not contain a file input element if browse is false", () => {
			schema.fieldOptions.browse = false;
			wrapper.setProps({ schema: { ...schema } });

			let fileInput = wrapper.find("input[type=file]");

			expect(fileInput.exists()).to.be.false;
		});

		it("should not visible the preview div", () => {
			schema.fieldOptions.preview = false;
			wrapper.setProps({ schema: { ...schema } });

			let preview = wrapper.find(".preview");

			expect(preview.element.style.display).to.be.equal("none");
		});

		it("should not show the link input element if hideInput is true", () => {
			schema.fieldOptions.hideInput = true;
			wrapper.setProps({ schema: { ...schema } });

			let fileInput = wrapper.find("input[type=text]");

			expect(fileInput.element.style.display).to.be.equal("none");

			schema.fieldOptions.hideInput = false;
			wrapper.setProps({ schema: { ...schema } });
		});

		it("should not show base64 data in input field", () => {
			wrapper.setProps({ model: { avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ" } });

			expect(input.element.value).to.be.equal("<inline base64 image>");
		});

		it("should clear input if press remove icon", () => {
			schema.fieldOptions.preview = true;
			wrapper.setProps({ schema: { ...schema } });

			let remove = wrapper.find(".remove");

			expect(input.element.value).to.be.not.equal("");

			remove.trigger("click");

			expect(input.element.value).to.be.equal("");
		});

		it.skip("should convert image to base64 if file input changed", () => {
			// Stub the browser FileReader
			let FR = window.FileReader;
			global.FileReader = window.FileReader;
			window.FileReader = sinon.stub().returns({
				readAsDataURL() {
					this.onload({
						target: {
							result: "base64 image data"
						}
					});
				}
			});
			wrapper.vm.fileChanged({
				target: {
					files: new File(["foo"], "test.jpg", {
						type: "image/jpeg"
					})
				}
			});
			expect(input.element.value).to.be.equal("base64 image data");
			expect(wrapper.props().model.avatar).to.be.equal("base64 image data");

			window.FileReader = FR;
		});
	});
});
