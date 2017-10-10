import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldChecklist from "src/fields/core/fieldChecklist.vue";

Vue.component("FieldChecklist", FieldChecklist);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldChecklist", schema, model, disabled, options);
}

describe("fieldChecklist.vue", function() {

	describe("check listbox template", () => {

		describe("check template with static string array", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				listBox: true,
				values: [
					"HTML5",
					"Javascript",
					"CSS3",
					"CoffeeScript",
					"AngularJS",
					"ReactJS",
					"VueJS"
				]
			};
			let model = { skills: ["Javascript", "VueJS"] };
			let listbox;
			let checkboxes;
			let listRowList;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
				listRowList = listbox.querySelectorAll(".list-row");
			});

			it("should contain a .listbox element", () => {
				expect(field).to.be.exist;
				expect(field.$el).to.be.exist;

				expect(listbox).to.be.defined;
				expect(listbox.classList.contains("form-control")).to.be.true;
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
				
				it("listbox value should be the model value after changed", (done) => {
					model.skills = ["ReactJS"];
					vm.$nextTick( () => {
						expect(isChecked(0)).to.be.false;
						expect(isChecked(1)).to.be.false;
						expect(isChecked(6)).to.be.false;
						expect(isChecked(5)).to.be.true;
						done();
					});

				});

				it("model value should be the listbox value if changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal(["ReactJS", "HTML5"]);
						done();
					});

				});
			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {

				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList[0].classList.contains("is-checked")).to.be.true;
					expect(listRowList[1].classList.contains("is-checked")).to.be.false;
					expect(listRowList[2].classList.contains("is-checked")).to.be.false;
					expect(listRowList[3].classList.contains("is-checked")).to.be.false;
					expect(listRowList[4].classList.contains("is-checked")).to.be.false;
					expect(listRowList[5].classList.contains("is-checked")).to.be.true;
					expect(listRowList[6].classList.contains("is-checked")).to.be.false;
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", (done) => {
					model.skills = ["AngularJS"];
					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.false;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.false;
						expect(listRowList[4].classList.contains("is-checked")).to.be.true;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.true;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.false;
						expect(listRowList[4].classList.contains("is-checked")).to.be.true;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

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
			let listbox;
			let checkboxes;
			let listRowList;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
				listRowList = listbox.querySelectorAll(".list-row");
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

				it("listbox value should be the model value after changed", (done) => {
					model.skills = [3];
					vm.$nextTick( () => {
						expect(isChecked(0)).to.be.false;
						expect(isChecked(1)).to.be.false;
						expect(isChecked(2)).to.be.true;
						expect(isChecked(3)).to.be.false;
						expect(isChecked(4)).to.be.false;
						expect(isChecked(5)).to.be.false;
						expect(isChecked(6)).to.be.false;
						done();
					});

				});

				it("model value should be the listbox value if changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal([3, 1]);
						done();
					});

				});

			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {

				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList[0].classList.contains("is-checked")).to.be.true;
					expect(listRowList[1].classList.contains("is-checked")).to.be.false;
					expect(listRowList[2].classList.contains("is-checked")).to.be.true;
					expect(listRowList[3].classList.contains("is-checked")).to.be.false;
					expect(listRowList[4].classList.contains("is-checked")).to.be.false;
					expect(listRowList[5].classList.contains("is-checked")).to.be.false;
					expect(listRowList[6].classList.contains("is-checked")).to.be.false;
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", (done) => {
					model.skills = [4];
					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.false;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.true;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.true;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.true;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

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
			let listbox;
			let checkboxes;
			let listRowList;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
				listRowList = listbox.querySelectorAll(".list-row");
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

				it("listbox value should be the model value after changed", (done) => {
					model.skills = [3];
					vm.$nextTick( () => {
						expect(isChecked(0)).to.be.false;
						expect(isChecked(1)).to.be.false;
						expect(isChecked(2)).to.be.true;
						expect(isChecked(3)).to.be.false;
						expect(isChecked(4)).to.be.false;
						expect(isChecked(5)).to.be.false;
						expect(isChecked(6)).to.be.false;
						done();
					});

				});

				it("model value should be the listbox value if changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal([3, 1]);
						done();
					});

				});

			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {

				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList[0].classList.contains("is-checked")).to.be.true;
					expect(listRowList[1].classList.contains("is-checked")).to.be.false;
					expect(listRowList[2].classList.contains("is-checked")).to.be.true;
					expect(listRowList[3].classList.contains("is-checked")).to.be.false;
					expect(listRowList[4].classList.contains("is-checked")).to.be.false;
					expect(listRowList[5].classList.contains("is-checked")).to.be.false;
					expect(listRowList[6].classList.contains("is-checked")).to.be.false;
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", (done) => {
					model.skills = [4];
					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.false;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.true;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.true;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.true;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

			});

		});

		describe("check function values", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				inputName:"",
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
			let listbox;
			let checkboxes;
			let listRowList;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
				listRowList = listbox.querySelectorAll(".list-row");				
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

						
			it("should contain input name field withouth inputName", (done) => {
				
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
				expect(checkboxes[0].name).to.be.equal("1");
				expect(checkboxes[1].name).to.be.equal("2");
				expect(checkboxes[2].name).to.be.equal("3");
				expect(checkboxes[3].name).to.be.equal("4");
				expect(checkboxes[4].name).to.be.equal("5");
				expect(checkboxes[5].name).to.be.equal("6");
				expect(checkboxes[6].name).to.be.equal("7");
				
				done();
				
			});

			it("should contain input name field with inputName", (done) => {
				
				schema.inputName="skill";

				vm.$nextTick( () => {
					checkboxes = listbox.querySelectorAll("input[type=checkbox]");
					expect(checkboxes[0].name).to.be.equal("skill_1");
					expect(checkboxes[1].name).to.be.equal("skill_2");
					expect(checkboxes[2].name).to.be.equal("skill_3");
					expect(checkboxes[3].name).to.be.equal("skill_4");
					expect(checkboxes[4].name).to.be.equal("skill_5");
					expect(checkboxes[5].name).to.be.equal("skill_6");
					expect(checkboxes[6].name).to.be.equal("skill_7");
					
					done();
				});
			});

			describe("test values reactivity to changes", () => {
			
				it("listbox value should be the model value after changed", (done) => {
					model.skills = [3];
					vm.$nextTick( () => {
						expect(isChecked(0)).to.be.false;
						expect(isChecked(1)).to.be.false;
						expect(isChecked(2)).to.be.true;
						done();
					});

				});

				it("model value should be the listbox value if changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal([3, 1]);
						done();
					});

				});

			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {

				it(".list-row with checked input should have a 'is-checked' class", () => {
					expect(listRowList[0].classList.contains("is-checked")).to.be.true;
					expect(listRowList[1].classList.contains("is-checked")).to.be.false;
					expect(listRowList[2].classList.contains("is-checked")).to.be.true;
					expect(listRowList[3].classList.contains("is-checked")).to.be.false;
					expect(listRowList[4].classList.contains("is-checked")).to.be.false;
					expect(listRowList[5].classList.contains("is-checked")).to.be.false;
					expect(listRowList[6].classList.contains("is-checked")).to.be.false;
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", (done) => {
					model.skills = [4];
					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.false;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.true;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(listRowList[0].classList.contains("is-checked")).to.be.true;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.true;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.false;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

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
				inputName:"",
				values: [
					"HTML5",
					"Javascript",
					"CSS3",
					"CoffeeScript",
					"AngularJS",
					"ReactJS",
					"VueJS"
				]
			};
			let model = { skills: ["Javascript", "VueJS"] };
			let combobox;
			let dropList;
			let mainRow;
			let checkboxes;
			let listRowList;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				combobox = el.querySelector(".combobox");
				dropList = combobox.querySelector(".dropList");
				mainRow = combobox.querySelector(".mainRow");
			});

			it("should contain a .combobox element", () => {
				expect(field).to.be.exist;
				expect(field.$el).to.be.exist;

				expect(combobox).to.be.defined;
				expect(combobox.classList.contains("form-control")).to.be.true;
			});

			it("should contain a .dropList element", () => {
				expect(dropList).to.be.defined;
				checkboxes = dropList.querySelectorAll("input[type=checkbox]");
				expect(checkboxes).to.be.length(0); // collapsed
			});

			it("should contain a .mainRow element", () => {
				expect(mainRow).to.be.defined;
				expect(mainRow.querySelector(".info")).to.be.defined;
				expect(mainRow.querySelector(".info").textContent).to.be.equal("2 selected");
				expect(mainRow.querySelector(".arrow")).to.be.defined;
			});

			it("should contain 7 checkbox it expanded ", (done) => {
				mainRow.click();
				vm.$nextTick( () => {
					checkboxes = dropList.querySelectorAll("input[type=checkbox]");
					expect(checkboxes.length).to.be.equal(7);
					done();
				});
			});
			
			it("should contain input name field withouth inputName", (done) => {
				
				checkboxes = dropList.querySelectorAll("input[type=checkbox]");
				expect(checkboxes[0].name).to.be.equal("HTML5");
				expect(checkboxes[1].name).to.be.equal("Javascript");
				expect(checkboxes[2].name).to.be.equal("CSS3");
				expect(checkboxes[3].name).to.be.equal("CoffeeScript");
				expect(checkboxes[4].name).to.be.equal("AngularJS");
				expect(checkboxes[5].name).to.be.equal("ReactJS");
				expect(checkboxes[6].name).to.be.equal("VueJS");
				
				done();
				
			});

			it("should contain input name field with inputName", (done) => {
				
				schema.inputName="skill";

				vm.$nextTick( () => {
					checkboxes = dropList.querySelectorAll("input[type=checkbox]");
					expect(checkboxes[0].name).to.be.equal("skill_HTML5");
					expect(checkboxes[1].name).to.be.equal("skill_Javascript");
					expect(checkboxes[2].name).to.be.equal("skill_CSS3");
					expect(checkboxes[3].name).to.be.equal("skill_CoffeeScript");
					expect(checkboxes[4].name).to.be.equal("skill_AngularJS");
					expect(checkboxes[5].name).to.be.equal("skill_ReactJS");
					expect(checkboxes[6].name).to.be.equal("skill_VueJS");
					
					done();
				});
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(6)).to.be.true;
			});



			describe("test values reactivity to changes", () => {

				it("dropList value should be the model value after changed", (done) => {
					model.skills = ["ReactJS"];
					vm.$nextTick( () => {
						expect(isChecked(0)).to.be.false;
						expect(isChecked(1)).to.be.false;
						expect(isChecked(6)).to.be.false;
						expect(isChecked(5)).to.be.true;
						done();
					});

				});

				it("model value should be the dropList value if changed (add)", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal(["ReactJS", "HTML5"]);
						done();
					});

				});

				it("model value should be the checklist value if changed (remove)", (done) => {
					checkboxes[0].checked = false;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal(["ReactJS"]);
						done();
					});

				});

				it("model value should be the dropList value if changed (null)", (done) => {
					model.skills = null;
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						expect(model.skills).to.be.deep.equal(["HTML5"]);
						done();
					});

				});

			});

			describe("test 'is-checked' class attribution reactivity to changes", () => {

				it(".list-row with checked input should have a 'is-checked' class", () => {
					listRowList = dropList.querySelectorAll(".list-row");
					expect(listRowList[0].classList.contains("is-checked")).to.be.true;
					expect(listRowList[1].classList.contains("is-checked")).to.be.false;
					expect(listRowList[2].classList.contains("is-checked")).to.be.false;
					expect(listRowList[3].classList.contains("is-checked")).to.be.false;
					expect(listRowList[4].classList.contains("is-checked")).to.be.false;
					expect(listRowList[5].classList.contains("is-checked")).to.be.false;
					expect(listRowList[6].classList.contains("is-checked")).to.be.false;
				});

				it(".list-row with checked input should have a 'is-checked' class after model value is changed", (done) => {
					model.skills = ["ReactJS"];

					vm.$nextTick( () => {
						listRowList = dropList.querySelectorAll(".list-row");
						expect(listRowList[0].classList.contains("is-checked")).to.be.false;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.false;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.true;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

				it(".list-row with checked input should have a 'is-checked' class after listbox value is changed", (done) => {
					checkboxes[0].checked = true;
					trigger(checkboxes[0], "change");

					vm.$nextTick( () => {
						listRowList = dropList.querySelectorAll(".list-row");
						expect(listRowList[0].classList.contains("is-checked")).to.be.true;
						expect(listRowList[1].classList.contains("is-checked")).to.be.false;
						expect(listRowList[2].classList.contains("is-checked")).to.be.false;
						expect(listRowList[3].classList.contains("is-checked")).to.be.false;
						expect(listRowList[4].classList.contains("is-checked")).to.be.false;
						expect(listRowList[5].classList.contains("is-checked")).to.be.true;
						expect(listRowList[6].classList.contains("is-checked")).to.be.false;
						done();
					});

				});

			});

		});

	});

});