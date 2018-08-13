import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import fieldVueMultiSelect from "src/fields/optional/fieldVueMultiSelect.vue";
import VueMultiSelect from "vue-multiselect";

const localVue = createLocalVue();
let wrapper;
let input;

function createField(data, methods) {
	const _wrapper = mount(fieldVueMultiSelect, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: data,
		components: {
			multiselect: VueMultiSelect
		}
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}
	wrapper = _wrapper;
	input = wrapper.find(".multiselect");

	return _wrapper;
}

describe("fieldVueMultiSelect.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "vueMultiSelect",
			label: "Cities",
			model: "city",
			required: false,
			values: ["London", "Paris", "Rome", "Berlin"],
			fieldOptions: {
				multiple: true
			}
		};
		let model = { city: "Paris" };

		before(() => {
			createField({ schema, model });
		});

		it("should contain a select element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.exists()).to.be.true;
			expect(input.classes()).to.not.include("form-control");
			expect(input.classes()).to.not.include("multiselect--disabled");
		});

		it("should contain option elements", () => {
			let options = input.findAll("li.multiselect__element .multiselect__option");
			expect(options.length).to.be.equal(schema.values.length);
			expect(
				options
					.at(1)
					.find("span")
					.text()
			).to.be.equal("Paris");
			expect(options.at(1).classes()).to.include("multiselect__option--selected");
		});

		it("should set disabled", () => {
			schema.disabled = true;
			wrapper.setProps({ schema: { ...schema } });

			expect(input.classes()).to.include("multiselect--disabled");

			schema.disabled = false;
			wrapper.setProps({ schema: { ...schema } });
		});

		it("input value should be the model value after changed", () => {
			wrapper.setProps({ model: { city: ["Rome"] } });
			let tags = input.findAll(".multiselect__tag");

			expect(tags.length).to.be.equal(1);
			expect(
				tags
					.at(0)
					.find("span")
					.text()
			).to.be.equal("Rome");
		});

		it("input value should be the model value after changed (multiselection)", () => {
			wrapper.setProps({ model: { city: ["Paris", "Rome"] } });
			let tags = input.findAll(".multiselect__tag");

			expect(tags.length).to.be.equal(2);
			expect(
				tags
					.at(0)
					.find("span")
					.text()
			).to.be.equal("Paris");
			expect(
				tags
					.at(1)
					.find("span")
					.text()
			).to.be.equal("Rome");
		});

		it("model value should be the input value if changed", () => {
			let options = input.findAll("li .multiselect__option");
			options.at(2).trigger("click");

			expect(wrapper.props().model.city.length).to.be.equal(1);
			expect(wrapper.props().model.city[0]).to.be.equal("Paris");
		});

		describe("with objects", () => {
			const option = {
				name: "Vue.js",
				language: "JavaScript"
			};
			let schema = { ...schema };
			let model = {
				city: [option]
			};
			schema.values = [
				{
					name: "Vue.js",
					language: "JavaScript"
				},
				{
					name: "Rails",
					language: "Ruby"
				},
				{
					name: "Sinatra",
					language: "Ruby"
				}
			];
			schema.fieldOptions = {};

			before(() => {
				createField({ schema, model });
			});

			it("model value should work with objects", () => {
				schema.fieldOptions = { label: "name", trackBy: "name" };
				wrapper.setProps({ schema: { ...schema } });

				expect(wrapper.props().model.city.length).to.be.equal(1);
				expect(wrapper.props().model.city[0]).to.be.deep.equal(schema.values[0]);
			});

			it("options should contain only text specified in label", (done) => {
				schema.fieldOptions = { label: "language", trackBy: "language" };
				wrapper.setProps({ schema: { ...schema } });

				Vue.config.errorHandler = done;
				Vue.nextTick(() => {
					let options = input.findAll("li .multiselect__option");

					expect(
						options
							.at(0)
							.find("span")
							.text()
					).to.be.equal("JavaScript");
					done();
				});
			});

			it("options should contain custom text specified in customLabel", (done) => {
				schema.fieldOptions = {
					label: "name",
					trackBy: "name",
					customLabel: ({ name, language }) => {
						return `${name}-${language}`;
					}
				};
				wrapper.setProps({ schema: { ...schema } });

				Vue.config.errorHandler = done;
				Vue.nextTick(() => {
					let options = input.findAll("li .multiselect__option");

					expect(
						options
							.at(0)
							.find("span")
							.text()
					).to.be.equal("Vue.js-JavaScript");
					done();
				});
			});
		});
	});
});
