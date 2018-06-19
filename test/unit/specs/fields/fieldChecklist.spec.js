import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldChecklist from "src/fields/core/fieldChecklist.vue";

const localVue = createLocalVue();
let wrapper;
let listbox;
let checkboxes;
let listRowList;

function createField2(data, methods) {
	const _wrapper = mount(FieldChecklist, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	listbox = wrapper.find(".listbox");
	checkboxes = wrapper.findAll("input[type=checkbox]");
	listRowList = wrapper.findAll(".list-row");

	return _wrapper;
}

function isChecked(idx) {
	return checkboxes.at(idx).element.checked;
}

describe("fieldChecklist.vue", () => {
	describe("check listbox template", () => {
		describe("check template with static string array", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				listBox: true,
				values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
			};
			let model = { skills: ["Javascript", "VueJS"] };

			before(() => {
				createField2({ schema, model, disabled: false });
			});

			it("should contain a .listbox element", () => {
				expect(wrapper.exists()).to.be.true;
				expect(listbox.exists()).to.be.true;
				expect(listbox.classes()).to.include("form-control");
			});

			it("should contain 7 items", () => {
				expect(checkboxes.length).to.be.equal(7);
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(6)).to.be.true;
			});

			describe("test values reactivity to changes", () => {
				it("listbox value should be the model value after changed", () => {
					model.skills = ["ReactJS"];
					checkboxes.update();

					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(6)).to.be.false;
					expect(isChecked(5)).to.be.true;
				});

				it("model value should be the listbox value if changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(model.skills).to.be.deep.equal(["ReactJS", "HTML5"]);
				});
			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {
				it(".list-row with checked input should have a 'is-checked' class", () => {
					model.skills = ["HTML5", "ReactJS"];
					wrapper.update();

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", () => {
					model.skills = ["AngularJS"];
					wrapper.update();

					expect(listRowList.at(0).classes()).to.not.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});
			});
		});

		describe("check static values with { value, name } objects (default key name)", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				listBox: true,
				values: [
					{ value: 1, name: "HTML5" },
					{ value: 2, name: "Javascript" },
					{ value: 3, name: "CSS3" },
					{ value: 4, name: "CoffeeScript" },
					{ value: 5, name: "AngularJS" },
					{ value: 6, name: "ReactJS" },
					{ value: 7, name: "VueJS" }
				]
			};
			let model = { skills: [2, 7] };

			before(() => {
				createField2({ schema, model, disabled: false });
			});

			it("should contain items", () => {
				expect(checkboxes.length).to.be.equal(7);
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(2)).to.be.false;
				expect(isChecked(3)).to.be.false;
				expect(isChecked(4)).to.be.false;
				expect(isChecked(5)).to.be.false;
				expect(isChecked(6)).to.be.true;
			});

			describe("test values reactivity to changes", () => {
				it("listbox value should be the model value after changed", () => {
					model.skills = [3];
					wrapper.update();

					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(2)).to.be.true;
					expect(isChecked(3)).to.be.false;
					expect(isChecked(4)).to.be.false;
					expect(isChecked(5)).to.be.false;
					expect(isChecked(6)).to.be.false;
				});

				it("model value should be the listbox value if changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(model.skills).to.be.deep.equal([3, 1]);
				});
			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {
				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", () => {
					model.skills = [4];
					wrapper.update();

					expect(listRowList.at(0).classes()).to.not.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});
			});
		});

		describe("check static values with { id, label } objects (custom key name with `checklistOptions`)", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				listBox: true,
				values: [
					{ id: 1, label: "HTML5" },
					{ id: 2, label: "Javascript" },
					{ id: 3, label: "CSS3" },
					{ id: 4, label: "CoffeeScript" },
					{ id: 5, label: "AngularJS" },
					{ id: 6, label: "ReactJS" },
					{ id: 7, label: "VueJS" }
				],
				checklistOptions: {
					value: "id",
					name: "label"
				}
			};
			let model = { skills: [2, 7] };

			before(() => {
				createField2({ schema, model, disabled: false });
			});

			it("should contain items", () => {
				expect(checkboxes.length).to.be.equal(7);
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(2)).to.be.false;
				expect(isChecked(3)).to.be.false;
				expect(isChecked(4)).to.be.false;
				expect(isChecked(5)).to.be.false;
				expect(isChecked(6)).to.be.true;
			});

			describe("test values reactivity to changes", () => {
				it("listbox value should be the model value after changed", () => {
					model.skills = [3];
					wrapper.update();

					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(2)).to.be.true;
					expect(isChecked(3)).to.be.false;
					expect(isChecked(4)).to.be.false;
					expect(isChecked(5)).to.be.false;
					expect(isChecked(6)).to.be.false;
				});

				it("model value should be the listbox value if changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(model.skills).to.be.deep.equal([3, 1]);
				});
			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {
				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", () => {
					model.skills = [4];
					wrapper.update();

					expect(listRowList.at(0).classes()).to.not.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});
			});
		});

		describe("check function values", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				inputName: "",
				listBox: true,
				values() {
					return [
						{ value: 1, name: "HTML5" },
						{ value: 2, name: "Javascript" },
						{ value: 3, name: "CSS3" },
						{ value: 4, name: "CoffeeScript" },
						{ value: 5, name: "AngularJS" },
						{ value: 6, name: "ReactJS" },
						{ value: 7, name: "VueJS" }
					];
				}
			};
			let model = { skills: [2, 7] };

			before(() => {
				createField2({ schema, model, disabled: false });
			});

			it("should contain items", () => {
				expect(checkboxes.length).to.be.equal(7);
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(2)).to.be.false;
				expect(isChecked(3)).to.be.false;
				expect(isChecked(4)).to.be.false;
				expect(isChecked(5)).to.be.false;
				expect(isChecked(6)).to.be.true;
			});

			it("should contain input name field withouth inputName", () => {
				expect(checkboxes.at(0).attributes().name).to.be.equal("1");
				expect(checkboxes.at(1).attributes().name).to.be.equal("2");
				expect(checkboxes.at(2).attributes().name).to.be.equal("3");
				expect(checkboxes.at(3).attributes().name).to.be.equal("4");
				expect(checkboxes.at(4).attributes().name).to.be.equal("5");
				expect(checkboxes.at(5).attributes().name).to.be.equal("6");
				expect(checkboxes.at(6).attributes().name).to.be.equal("7");
			});

			it("should contain input name field with inputName", () => {
				schema.inputName = "skill";
				wrapper.update();

				expect(checkboxes.at(0).attributes().name).to.be.equal("skill_1");
				expect(checkboxes.at(1).attributes().name).to.be.equal("skill_2");
				expect(checkboxes.at(2).attributes().name).to.be.equal("skill_3");
				expect(checkboxes.at(3).attributes().name).to.be.equal("skill_4");
				expect(checkboxes.at(4).attributes().name).to.be.equal("skill_5");
				expect(checkboxes.at(5).attributes().name).to.be.equal("skill_6");
				expect(checkboxes.at(6).attributes().name).to.be.equal("skill_7");
			});

			describe("test values reactivity to changes", () => {
				it("listbox value should be the model value after changed", () => {
					model.skills = [3];
					wrapper.update();

					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(2)).to.be.true;
				});

				it("model value should be the listbox value if changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(model.skills).to.be.deep.equal([3, 1]);
				});
			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {
				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", () => {
					model.skills = [4];
					wrapper.update();

					expect(listRowList.at(0).classes()).to.not.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});
			});
		});
	});

	describe("check combobox template", () => {
		describe("check template", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				inputName: "",
				values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
			};
			let model = { skills: ["Javascript", "VueJS"] };
			let combobox;
			let dropList;
			let mainRow;

			before(() => {
				createField2({ schema, model, disabled: false });
				combobox = wrapper.find(".combobox");
				dropList = combobox.find(".dropList");
				mainRow = combobox.find(".mainRow");
			});

			it("should contain a .combobox element", () => {
				expect(wrapper.exists()).to.be.true;
				expect(combobox.exists()).to.be.true;
				expect(combobox.classes()).to.include("form-control");
			});

			it("should contain a .dropList element", () => {
				expect(dropList.exists()).to.be.true;

				checkboxes = dropList.findAll("input[type=checkbox]");

				expect(checkboxes).to.be.length(0); // collapsed
			});

			it("should contain a .mainRow element", () => {
				expect(mainRow.exists()).to.be.true;
				expect(mainRow.find(".info").exists()).to.be.true;
				expect(mainRow.find(".info").text()).to.be.equal("2 selected");
				expect(mainRow.find(".arrow").exists()).to.be.true;
			});

			it("should contain 7 checkbox it expanded ", () => {
				mainRow.trigger("click");
				checkboxes = dropList.findAll("input[type=checkbox]");

				expect(checkboxes.length).to.be.equal(7);
			});

			it("should contain input name field withouth inputName", () => {
				checkboxes = dropList.findAll("input[type=checkbox]");

				expect(checkboxes.at(0).attributes().name).to.be.equal("HTML5");
				expect(checkboxes.at(1).attributes().name).to.be.equal("Javascript");
				expect(checkboxes.at(2).attributes().name).to.be.equal("CSS3");
				expect(checkboxes.at(3).attributes().name).to.be.equal("CoffeeScript");
				expect(checkboxes.at(4).attributes().name).to.be.equal("AngularJS");
				expect(checkboxes.at(5).attributes().name).to.be.equal("ReactJS");
				expect(checkboxes.at(6).attributes().name).to.be.equal("VueJS");
			});

			it("should contain input name field with inputName", () => {
				schema.inputName = "skill";
				wrapper.update();
				checkboxes = dropList.findAll("input[type=checkbox]");

				expect(checkboxes.at(0).attributes().name).to.be.equal("skill_HTML5");
				expect(checkboxes.at(1).attributes().name).to.be.equal("skill_Javascript");
				expect(checkboxes.at(2).attributes().name).to.be.equal("skill_CSS3");
				expect(checkboxes.at(3).attributes().name).to.be.equal("skill_CoffeeScript");
				expect(checkboxes.at(4).attributes().name).to.be.equal("skill_AngularJS");
				expect(checkboxes.at(5).attributes().name).to.be.equal("skill_ReactJS");
				expect(checkboxes.at(6).attributes().name).to.be.equal("skill_VueJS");
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(6)).to.be.true;
			});

			describe("test values reactivity to changes", () => {
				it("dropList value should be the model value after changed", () => {
					model.skills = ["ReactJS"];
					wrapper.update();

					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(6)).to.be.false;
					expect(isChecked(5)).to.be.true;
				});

				it("model value should be the dropList value if changed (add)", () => {
					checkboxes.at(0).element.checked = true;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(model.skills).to.be.deep.equal(["ReactJS", "HTML5"]);
				});

				it("model value should be the checklist value if changed (remove)", () => {
					checkboxes.at(0).element.checked = false;
					checkboxes.at(0).trigger("change");
					wrapper.update();

					expect(model.skills).to.be.deep.equal(["ReactJS"]);
				});

				it.skip("model value should be the dropList value if changed (null)", done => {
					model.skills = null;
					wrapper.update();
					Vue.config.errorHandler = done;
					Vue.nextTick(() => {
						checkboxes.at(0).element.checked = true;
						checkboxes.at(0).trigger("change");
						wrapper.update();
						expect(model.skills).to.be.deep.equal(["HTML5"]);
						done();
					});
				});
			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {
				it(".list-row with checked input should have a 'is-checked' class", () => {
					model.skills = ["HTML5"]; // TODO remove when previous step is fixed
					wrapper.update();
					listRowList = wrapper.findAll(".list-row");

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.not.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", () => {
					model.skills = ["ReactJS"];
					wrapper.update();
					listRowList = wrapper.findAll(".list-row");

					expect(listRowList.at(0).classes()).to.not.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});

				it.skip(".list-row with checked input should have a 'is-checked' class after listbox value is changed", () => {
					checkboxes.at(0).element.checked = false;
					checkboxes.at(0).trigger("change");
					wrapper.update();
					dropList.update();
					listRowList = dropList.findAll(".list-row");

					expect(listRowList.at(0).classes()).to.include("is-checked");
					expect(listRowList.at(1).classes()).to.not.include("is-checked");
					expect(listRowList.at(2).classes()).to.not.include("is-checked");
					expect(listRowList.at(3).classes()).to.not.include("is-checked");
					expect(listRowList.at(4).classes()).to.not.include("is-checked");
					expect(listRowList.at(5).classes()).to.include("is-checked");
					expect(listRowList.at(6).classes()).to.not.include("is-checked");
				});
			});
		});
	});

	describe("check dynamic html attributes", () => {
		describe("check listbox input/wrapper attributes", () => {
			let schema = {
				type: "checklist",
				listBox: true,
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"],
				attributes: {
					wrapper: {
						"data-wrapper": "collapse"
					},
					input: {
						"data-input": "tooltip"
					}
				}
			};
			let model = {};
			let input, wrap;

			before(() => {
				createField2({ schema, model });
				input = wrapper.find("input");
				wrap = wrapper.find(".wrapper");
			});

			it("wrapper should have data-* attribute", () => {
				expect(wrap.attributes()["data-wrapper"]).to.be.equal("collapse");
			});

			it("input should have data-* attribute", () => {
				expect(input.attributes()["data-input"]).to.be.equal("tooltip");
			});
		});

		describe("check combobox input/wrapper attributes", () => {
			let schema = {
				type: "checklist",
				listBox: false,
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"],
				attributes: {
					wrapper: {
						"data-wrapper": "collapse"
					},
					input: {
						"data-input": "tooltip"
					}
				}
			};
			let model = {};
			let input, wrap;

			before(() => {
				createField2({ schema, model });
				input = wrapper.find("input");
				wrap = wrapper.find(".wrapper");
			});

			it("wrapper should have data-* attribute", () => {
				expect(wrap.attributes()["data-wrapper"]).to.be.equal("collapse");
			});

			it.skip("input should have data-* attribute", done => {
				// TODO: figure out how to get this test to work
				wrapper.setData({ comboExpanded: true });
				Vue.config.errorHandler = done;
				Vue.nextTick(() => {
					expect(input.attributes()["data-input"]).to.be.equal("tooltip");
					done();
				});
			});
		});

		describe("check non-specific attributes", () => {
			let schema = {
				type: "checklist",
				listBox: true,
				label: "First Name",
				model: "user__model",
				inputName: "input_name",
				fieldClasses: ["applied-class", "another-class"],
				values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"],
				attributes: {
					"data-input": "tooltip"
				}
			};
			let model = {};
			let input;

			before(() => {
				createField2({ schema, model });
				input = wrapper.find("input");
			});

			it("input should have data-* attribute", () => {
				expect(input.attributes()["data-input"]).to.be.equal("tooltip");
			});
		});
	});
});
