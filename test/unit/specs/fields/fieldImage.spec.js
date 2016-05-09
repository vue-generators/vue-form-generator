import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldImage from "src/fields/fieldImage.vue";

Vue.component("FieldImage", FieldImage);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldImage", schema, model, disabled, options);
}

describe("fieldImage.vue", () => {

	describe("check template without preview", () => {
		let schema = {
			type: "image",
			label: "Avatar",
			model: "avatar",
			readonly: false,
			placeholder: "Field placeholder"
		};
		let model = { avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.querySelector("input[type=text]");
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.classList.contains("link")).to.be.true;
			expect(input.placeholder).to.be.equal(schema.placeholder);	
			expect(input.readOnly).to.be.false;	
			expect(input.disabled).to.be.false;	
		});

		it("should contain a file input element", () => {
			let fileInput = el.querySelector("input[type=file]");
			expect(fileInput).to.be.defined;
			expect(fileInput.classList.contains("form-control")).to.be.true;
			expect(fileInput.classList.contains("file")).to.be.true;
			expect(fileInput.readOnly).to.be.false;	
			expect(fileInput.disabled).to.be.false;	
		});	

		it("should not visible the preview div", () => {
			let preview = el.querySelector(".preview");
			expect(preview.style.display).to.be.equal("block");
		});		


		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal(model.avatar);	
				done();
			});
		});

		it("should set readOnly", (done) => {
			schema.readonly = true;
			vm.$nextTick( () => {
				expect(input.readOnly).to.be.true;	
				done();
			});
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;	
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/felipebsb/128.jpg";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("https://s3.amazonaws.com/uifaces/faces/twitter/felipebsb/128.jpg");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "https://s3.amazonaws.com/uifaces/faces/twitter/peterme/128.jpg";
			trigger(input, "change");

			vm.$nextTick( () => {
				expect(model.avatar).to.be.equal("https://s3.amazonaws.com/uifaces/faces/twitter/peterme/128.jpg");	
				done();
			});

		});

		it("should not contain a file input element if browse is false", (done) => {
			vm.$set("schema.browse", false);

			vm.$nextTick( () => {
				let fileInput = el.querySelector("input[type=file]");
				expect(fileInput).to.be.null;
				done();
			});
		});	

		it("should not visible the preview div", (done) => {
			vm.$set("schema.preview", false);

			vm.$nextTick( () => {
				let preview = el.querySelector(".preview");
				expect(preview.style.display).to.be.equal("none");
				done();
			});
		});			

		it("should not show base64 data in input field", (done) => {
			model.avatar = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ";

			vm.$nextTick( () => {
				expect(input.value).to.be.equal("<inline base64 image>");
				done();
			});
		});	

		it("should clear input if press remove icon", (done) => {
			vm.$set("schema.preview", true);
			vm.$nextTick( () => {
				let remove = el.querySelector(".remove");
				expect(input.value).to.be.not.equal("");
				remove.click();

				vm.$nextTick( () => {
					expect(input.value).to.be.equal("");
					done();
				});
			});
		});

	});

});
