import { mount, createLocalVue } from "@vue/test-utils";

import FieldRadios from "src/fields/core/fieldRadios.vue";

const localVue = createLocalVue();
let wrapper;
let radioList;
let radios;
let labelList;

function createField2(data, methods) {
	const _wrapper = mount(FieldRadios, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;
	radioList = wrapper.find(".radio-list");
	radios = wrapper.findAll("input[type=radio]");
	labelList = wrapper.findAll("label");

	return _wrapper;
}

function isChecked(idx) {
	return radios.at(idx).element.checked;
}

describe("FieldRadios.vue", () => {
	describe("check template with static string array", () => {
		let schema = {
			type: "radios",
			label: "radios",
			model: "skills",
			values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"],
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { skills: "Javascript" };

		before(() => {
			createField2({ schema, model, disabled: false });
		});

		it("should contain a checkbox element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(radioList.exists()).to.be.true;
		});

		it("should contain 7 items", () => {
			expect(radios.length).to.be.equal(7);
		});

		it("should checked the values", () => {
			expect(isChecked(0)).to.be.false;
			expect(isChecked(1)).to.be.true;
			expect(isChecked(2)).to.be.false;
			expect(isChecked(3)).to.be.false;
			expect(isChecked(4)).to.be.false;
			expect(isChecked(5)).to.be.false;
			expect(isChecked(6)).to.be.false;
		});

		it("label with checked input should have a 'is-checked' class", () => {
			expect(labelList.at(0).classes()).to.not.include("is-checked");
			expect(labelList.at(1).classes()).to.include("is-checked");
			expect(labelList.at(2).classes()).to.not.include("is-checked");
			expect(labelList.at(3).classes()).to.not.include("is-checked");
			expect(labelList.at(4).classes()).to.not.include("is-checked");
			expect(labelList.at(5).classes()).to.not.include("is-checked");
			expect(labelList.at(6).classes()).to.not.include("is-checked");
		});

		it("should have 2 classes", () => {
			expect(radios.at(0).classes()).to.include("applied-class");
			expect(radios.at(0).classes()).to.include("another-class");
		});

		describe("test values reactivity to changes", () => {
			it("radioList value should be the model value after changed", () => {
				model.skills = "ReactJS";
				wrapper.update();

				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.false;
				expect(isChecked(2)).to.be.false;
				expect(isChecked(3)).to.be.false;
				expect(isChecked(4)).to.be.false;
				expect(isChecked(5)).to.be.true;
				expect(isChecked(6)).to.be.false;
			});

			it("model value should be the radioList value if changed", () => {
				radios.at(0).trigger("click");

				expect(model.skills).to.be.equal("HTML5");
			});
		});

		describe("test 'is-checked' class attribution reactivity to changes", () => {
			it("label with checked input should have a 'is-checked' class after model value is changed", () => {
				model.skills = "ReactJS";
				wrapper.update();

				expect(labelList.at(0).classes()).to.not.include("is-checked");
				expect(labelList.at(1).classes()).to.not.include("is-checked");
				expect(labelList.at(2).classes()).to.not.include("is-checked");
				expect(labelList.at(3).classes()).to.not.include("is-checked");
				expect(labelList.at(4).classes()).to.not.include("is-checked");
				expect(labelList.at(5).classes()).to.include("is-checked");
				expect(labelList.at(6).classes()).to.not.include("is-checked");
			});

			it("label with checked input should have a 'is-checked' class after radioList value is changed", () => {
				radios.at(2).trigger("click");

				expect(labelList.at(0).classes()).to.not.include("is-checked");
				expect(labelList.at(1).classes()).to.not.include("is-checked");
				expect(labelList.at(2).classes()).to.include("is-checked");
				expect(labelList.at(3).classes()).to.not.include("is-checked");
				expect(labelList.at(4).classes()).to.not.include("is-checked");
				expect(labelList.at(5).classes()).to.not.include("is-checked");
				expect(labelList.at(6).classes()).to.not.include("is-checked");
			});
		});
	});

	describe("check static values with { value, name } objects (default key name)", () => {
		let schema = {
			type: "radios",
			label: "radios",
			model: "skills",
			values: [
				{ name: "HTML5", value: "HTML5-123" },
				{ name: "Javascript", value: { id: "Javascript-123", deep: true } },
				{ name: "CSS3", value: "CSS3-123" },
				{ name: "CoffeeScript", value: "CoffeeScript-123" },
				{ name: "AngularJS", value: "AngularJS-123" },
				{ name: "ReactJS", value: "ReactJS-123" },
				{ name: "VueJS", value: "VueJS-123" }
			]
		};
		let model = { skills: "CSS3-123" };

		before(() => {
			createField2({ schema, model, disabled: false });
		});

		it("should contain a checkbox element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(radioList.exists()).to.be.true;
		});

		it("should contain 7 items", () => {
			expect(radios.length).to.be.equal(7);
		});

		it("should checked the values", () => {
			expect(isChecked(0)).to.be.false;
			expect(isChecked(1)).to.be.false;
			expect(isChecked(2)).to.be.true;
			expect(isChecked(3)).to.be.false;
			expect(isChecked(4)).to.be.false;
			expect(isChecked(5)).to.be.false;
			expect(isChecked(6)).to.be.false;
		});

		it("label with checked input should have a 'is-checked' class", () => {
			expect(labelList.at(0).classes()).to.not.include("is-checked");
			expect(labelList.at(1).classes()).to.not.include("is-checked");
			expect(labelList.at(2).classes()).to.include("is-checked");
			expect(labelList.at(3).classes()).to.not.include("is-checked");
			expect(labelList.at(4).classes()).to.not.include("is-checked");
			expect(labelList.at(5).classes()).to.not.include("is-checked");
			expect(labelList.at(6).classes()).to.not.include("is-checked");
		});
		describe("test values reactivity to changes", () => {
			it("radioList value should be the model value after changed", () => {
				model.skills = "ReactJS-123";
				wrapper.update();

				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.false;
				expect(isChecked(2)).to.be.false;
				expect(isChecked(3)).to.be.false;
				expect(isChecked(4)).to.be.false;
				expect(isChecked(5)).to.be.true;
				expect(isChecked(6)).to.be.false;
			});

			it("model value should be the radioList value if changed", () => {
				radios.at(0).trigger("click");

				expect(model.skills).to.be.equal("HTML5-123");
			});
		});

		describe("test 'is-checked' class attribution reactivity to changes", () => {
			it("label with checked input should have a 'is-checked' class after model value is changed", () => {
				model.skills = "ReactJS-123";
				wrapper.update();

				expect(labelList.at(0).classes()).to.not.include("is-checked");
				expect(labelList.at(1).classes()).to.not.include("is-checked");
				expect(labelList.at(2).classes()).to.not.include("is-checked");
				expect(labelList.at(3).classes()).to.not.include("is-checked");
				expect(labelList.at(4).classes()).to.not.include("is-checked");
				expect(labelList.at(5).classes()).to.include("is-checked");
				expect(labelList.at(6).classes()).to.not.include("is-checked");
			});

			it("label with checked input should have a 'is-checked' class after radioList value is changed", () => {
				radios.at(2).trigger("click");

				expect(labelList.at(0).classes()).to.not.include("is-checked");
				expect(labelList.at(1).classes()).to.not.include("is-checked");
				expect(labelList.at(2).classes()).to.include("is-checked");
				expect(labelList.at(3).classes()).to.not.include("is-checked");
				expect(labelList.at(4).classes()).to.not.include("is-checked");
				expect(labelList.at(5).classes()).to.not.include("is-checked");
				expect(labelList.at(6).classes()).to.not.include("is-checked");
			});
		});
	});

	describe("check static values with { id, label } objects (custom key name with `radiosOptions`)", () => {
		let schema = {
			type: "radios",
			label: "radios",
			model: "skills",
			values: [
				{ label: "HTML5", id: "HTML5-123" },
				{ label: "Javascript", id: { id: "Javascript-123", deep: true } },
				{ label: "CSS3", id: "CSS3-123" },
				{ label: "CoffeeScript", id: "CoffeeScript-123" },
				{ label: "AngularJS", id: "AngularJS-123" },
				{ label: "ReactJS", id: "ReactJS-123" },
				{ label: "VueJS", id: "VueJS-123" }
			],
			radiosOptions: {
				value: "id",
				name: "label"
			}
		};
		let model = { skills: "CSS3-123" };

		before(() => {
			createField2({ schema, model, disabled: false });
		});

		it("should contain a checkbox element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(radioList.exists()).to.be.true;
		});

		it("should contain 7 items", () => {
			expect(radios.length).to.be.equal(7);
		});

		it("should checked the values", () => {
			expect(isChecked(0)).to.be.false;
			expect(isChecked(1)).to.be.false;
			expect(isChecked(2)).to.be.true;
			expect(isChecked(3)).to.be.false;
			expect(isChecked(4)).to.be.false;
			expect(isChecked(5)).to.be.false;
			expect(isChecked(6)).to.be.false;
		});

		it("label with checked input should have a 'is-checked' class", () => {
			expect(labelList.at(0).classes()).to.not.include("is-checked");
			expect(labelList.at(1).classes()).to.not.include("is-checked");
			expect(labelList.at(2).classes()).to.include("is-checked");
			expect(labelList.at(3).classes()).to.not.include("is-checked");
			expect(labelList.at(4).classes()).to.not.include("is-checked");
			expect(labelList.at(5).classes()).to.not.include("is-checked");
			expect(labelList.at(6).classes()).to.not.include("is-checked");
		});
		describe("test values reactivity to changes", () => {
			it("radioList value should be the model value after changed", () => {
				model.skills = "ReactJS-123";
				wrapper.update();

				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.false;
				expect(isChecked(2)).to.be.false;
				expect(isChecked(3)).to.be.false;
				expect(isChecked(4)).to.be.false;
				expect(isChecked(5)).to.be.true;
				expect(isChecked(6)).to.be.false;
			});

			it("model value should be the radioList value if changed", () => {
				radios.at(0).trigger("click");

				expect(model.skills).to.be.equal("HTML5-123");
			});
		});

		describe("test 'is-checked' class attribution reactivity to changes", () => {
			it("label with checked input should have a 'is-checked' class after model value is changed", () => {
				model.skills = "ReactJS-123";
				wrapper.update();

				expect(labelList.at(0).classes()).to.not.include("is-checked");
				expect(labelList.at(1).classes()).to.not.include("is-checked");
				expect(labelList.at(2).classes()).to.not.include("is-checked");
				expect(labelList.at(3).classes()).to.not.include("is-checked");
				expect(labelList.at(4).classes()).to.not.include("is-checked");
				expect(labelList.at(5).classes()).to.include("is-checked");
				expect(labelList.at(6).classes()).to.not.include("is-checked");
			});

			it("label with checked input should have a 'is-checked' class after radioList value is changed", () => {
				radios.at(2).trigger("click");

				expect(labelList.at(0).classes()).to.not.include("is-checked");
				expect(labelList.at(1).classes()).to.not.include("is-checked");
				expect(labelList.at(2).classes()).to.include("is-checked");
				expect(labelList.at(3).classes()).to.not.include("is-checked");
				expect(labelList.at(4).classes()).to.not.include("is-checked");
				expect(labelList.at(5).classes()).to.not.include("is-checked");
				expect(labelList.at(6).classes()).to.not.include("is-checked");
			});
		});
	});
});
