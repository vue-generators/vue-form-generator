import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldChecklist from "src/fields/fieldChecklist.vue";

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

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
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

		describe("check static values with { id, name } objects", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				listBox: true,
				values: [
					{ id: 1, name: "HTML5" },
					{ id: 2, name: "Javascript" },
					{ id: 3, name: "CSS3" },
					{ id: 4, name: "CoffeeScript" },
					{ id: 5, name: "AngularJS" },
					{ id: 6, name: "ReactJS" },
					{ id: 7, name: "VueJS" }
				]
			};
			let model = { skills: [2, 7] };
			let listbox;
			let checkboxes;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
			});

			it("should contain items", () => {
				expect(checkboxes.length).to.be.equal(7);
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(6)).to.be.true;
			});

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

		describe("check function values", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
				listBox: true,
				values() {
					return [
						{ id: 1, name: "HTML5" },
						{ id: 2, name: "Javascript" },
						{ id: 3, name: "CSS3" },
						{ id: 4, name: "CoffeeScript" },
						{ id: 5, name: "AngularJS" },
						{ id: 6, name: "ReactJS" },
						{ id: 7, name: "VueJS" }
					];
				}
			};
			let model = { skills: [2, 7] };
			let listbox;
			let checkboxes;

			function isChecked(idx) {
				return(checkboxes[idx].checked);
			}

			before( () => {
				createField(this, schema, model, false);
				listbox = el.querySelector(".listbox");
				checkboxes = listbox.querySelectorAll("input[type=checkbox]");
			});

			it("should contain items", () => {
				expect(checkboxes.length).to.be.equal(7);
			});

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(6)).to.be.true;
			});

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

	});

	describe("check combobox template", () => {

		describe("check template", () => {
			let schema = {
				type: "checklist",
				label: "Skills",
				model: "skills",
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

			it("should checked the values", () => {
				expect(isChecked(0)).to.be.false;
				expect(isChecked(1)).to.be.true;
				expect(isChecked(6)).to.be.true;
			});

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

	});

});