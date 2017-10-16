import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import FieldRadios from "src/fields/core/fieldRadios.vue";

Vue.component("FieldRadios", FieldRadios);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldRadios", schema, model, disabled, options);
}

describe("FieldRadios.vue", function() {

	describe("check template with static string array", () => {
		let schema = {
			type: "radios",
			label: "radios",
			model: "skills",
			values: [
				"HTML5",
				"Javascript",
				"CSS3",
				"CoffeeScript",
				"AngularJS",
				"ReactJS",
				"VueJS"
			],
			fieldClasses: ["applied-class", "another-class"]
		};
		let model = { skills: "Javascript" };
		let radioList;
		let radios;
		let labelList;

		function isChecked(idx) {
			return(radios[idx].checked);
		}

		before( () => {
			createField(this, schema, model, false);
			radioList = el.querySelector(".radio-list");
			radios = radioList.querySelectorAll("input[type=radio]");
			labelList = radioList.querySelectorAll("label");
		});

		it("should contain a checkbox element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(radioList).to.be.defined;
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

		it("label with checked input should have a 'is-checked' class", () =>{
			expect(labelList[0].classList.contains("is-checked")).to.be.false;
			expect(labelList[1].classList.contains("is-checked")).to.be.true;
			expect(labelList[2].classList.contains("is-checked")).to.be.false;
			expect(labelList[3].classList.contains("is-checked")).to.be.false;
			expect(labelList[4].classList.contains("is-checked")).to.be.false;
			expect(labelList[5].classList.contains("is-checked")).to.be.false;
			expect(labelList[6].classList.contains("is-checked")).to.be.false;
		});

		it("should have 2 classes", () => {
			expect(radios[0].className.indexOf("applied-class")).not.to.be.equal(-1);
			expect(radios[0].className.indexOf("another-class")).not.to.be.equal(-1);
		});


		describe("test values reactivity to changes", () => {
			
			it("radioList value should be the model value after changed", (done) => {
				model.skills = "ReactJS";
				vm.$nextTick( () => {
					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(2)).to.be.false;
					expect(isChecked(3)).to.be.false;
					expect(isChecked(4)).to.be.false;
					expect(isChecked(5)).to.be.true;
					expect(isChecked(6)).to.be.false;
					done();
				});
			});

			it("model value should be the radioList value if changed", (done) => {
				radios[0].click();

				vm.$nextTick( () => {
					expect(model.skills).to.be.equal("HTML5");
					done();
				});
			});
		});

		describe("test 'is-checked' class attribution reactivity to changes", () => {
			
			it("label with checked input should have a 'is-checked' class after model value is changed", (done) =>{
				model.skills = "ReactJS";
				vm.$nextTick( () => {
					expect(labelList[0].classList.contains("is-checked")).to.be.false;
					expect(labelList[1].classList.contains("is-checked")).to.be.false;
					expect(labelList[2].classList.contains("is-checked")).to.be.false;
					expect(labelList[3].classList.contains("is-checked")).to.be.false;
					expect(labelList[4].classList.contains("is-checked")).to.be.false;
					expect(labelList[5].classList.contains("is-checked")).to.be.true;
					expect(labelList[6].classList.contains("is-checked")).to.be.false;
					done();
				});
			});

			it("label with checked input should have a 'is-checked' class after radioList value is changed", (done) =>{
				radios[2].click();

				vm.$nextTick( () => {
					expect(labelList[0].classList.contains("is-checked")).to.be.false;
					expect(labelList[1].classList.contains("is-checked")).to.be.false;
					expect(labelList[2].classList.contains("is-checked")).to.be.true;
					expect(labelList[3].classList.contains("is-checked")).to.be.false;
					expect(labelList[4].classList.contains("is-checked")).to.be.false;
					expect(labelList[5].classList.contains("is-checked")).to.be.false;
					expect(labelList[6].classList.contains("is-checked")).to.be.false;
					done();
				});
			});
		});



	});

	describe("check static values with { value, name } objects (default key name)", () => {
		let schema = {
			type: "radios",
			label: "radios",
			model: "skills",
			values: [
				{name: "HTML5", value:"HTML5-123"},
				{name: "Javascript", value:{id:"Javascript-123", deep:true}},
				{name: "CSS3", value:"CSS3-123"},
				{name: "CoffeeScript", value:"CoffeeScript-123"},
				{name: "AngularJS", value:"AngularJS-123"},
				{name: "ReactJS", value:"ReactJS-123"},
				{name: "VueJS", value:"VueJS-123"}
			]
		};
		let model = { skills: "CSS3-123" };
		let radioList;
		let radios;
		let labelList;

		function isChecked(idx) {
			return(radios[idx].checked);
		}

		before( () => {
			createField(this, schema, model, false);
			radioList = el.querySelector(".radio-list");
			radios = radioList.querySelectorAll("input[type=radio]");
			labelList = radioList.querySelectorAll("label");
		});

		it("should contain a checkbox element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(radioList).to.be.defined;
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

		it("label with checked input should have a 'is-checked' class", () =>{
			expect(labelList[0].classList.contains("is-checked")).to.be.false;
			expect(labelList[1].classList.contains("is-checked")).to.be.false;
			expect(labelList[2].classList.contains("is-checked")).to.be.true;
			expect(labelList[3].classList.contains("is-checked")).to.be.false;
			expect(labelList[4].classList.contains("is-checked")).to.be.false;
			expect(labelList[5].classList.contains("is-checked")).to.be.false;
			expect(labelList[6].classList.contains("is-checked")).to.be.false;
		});
		describe("test values reactivity to changes", () => {
			
			it("radioList value should be the model value after changed", (done) => {
				model.skills = "ReactJS-123";
				vm.$nextTick( () => {
					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(2)).to.be.false;
					expect(isChecked(3)).to.be.false;
					expect(isChecked(4)).to.be.false;
					expect(isChecked(5)).to.be.true;
					expect(isChecked(6)).to.be.false;
					done();
				});
			});

			it("model value should be the radioList value if changed", (done) => {
				radios[0].click();

				vm.$nextTick( () => {
					expect(model.skills).to.be.equal("HTML5-123");
					done();
				});
			});
		});
		
		describe("test 'is-checked' class attribution reactivity to changes", () => {

			it("label with checked input should have a 'is-checked' class after model value is changed", (done) =>{
				model.skills = "ReactJS-123";
				vm.$nextTick( () => {
					expect(labelList[0].classList.contains("is-checked")).to.be.false;
					expect(labelList[1].classList.contains("is-checked")).to.be.false;
					expect(labelList[2].classList.contains("is-checked")).to.be.false;
					expect(labelList[3].classList.contains("is-checked")).to.be.false;
					expect(labelList[4].classList.contains("is-checked")).to.be.false;
					expect(labelList[5].classList.contains("is-checked")).to.be.true;
					expect(labelList[6].classList.contains("is-checked")).to.be.false;
					done();
				});
			});

			it("label with checked input should have a 'is-checked' class after radioList value is changed", (done) =>{
				radios[2].click();

				vm.$nextTick( () => {
					expect(labelList[0].classList.contains("is-checked")).to.be.false;
					expect(labelList[1].classList.contains("is-checked")).to.be.false;
					expect(labelList[2].classList.contains("is-checked")).to.be.true;
					expect(labelList[3].classList.contains("is-checked")).to.be.false;
					expect(labelList[4].classList.contains("is-checked")).to.be.false;
					expect(labelList[5].classList.contains("is-checked")).to.be.false;
					expect(labelList[6].classList.contains("is-checked")).to.be.false;
					done();
				});
			});
		});

	});

	describe("check static values with { id, label } objects (custom key name with `radiosOptions`)", () => {
		let schema = {
			type: "radios",
			label: "radios",
			model: "skills",
			values: [
				{label: "HTML5", id:"HTML5-123"},
				{label: "Javascript", id:{id:"Javascript-123", deep:true}},
				{label: "CSS3", id:"CSS3-123"},
				{label: "CoffeeScript", id:"CoffeeScript-123"},
				{label: "AngularJS", id:"AngularJS-123"},
				{label: "ReactJS", id:"ReactJS-123"},
				{label: "VueJS", id:"VueJS-123"}
			],
			radiosOptions: {
				value: "id",
				name: "label"
			}
		};
		let model = { skills: "CSS3-123" };
		let radioList;
		let radios;
		let labelList;

		function isChecked(idx) {
			return(radios[idx].checked);
		}

		before( () => {
			createField(this, schema, model, false);
			radioList = el.querySelector(".radio-list");
			radios = radioList.querySelectorAll("input[type=radio]");
			labelList = radioList.querySelectorAll("label");
		});

		it("should contain a checkbox element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(radioList).to.be.defined;
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

		it("label with checked input should have a 'is-checked' class", () =>{
			expect(labelList[0].classList.contains("is-checked")).to.be.false;
			expect(labelList[1].classList.contains("is-checked")).to.be.false;
			expect(labelList[2].classList.contains("is-checked")).to.be.true;
			expect(labelList[3].classList.contains("is-checked")).to.be.false;
			expect(labelList[4].classList.contains("is-checked")).to.be.false;
			expect(labelList[5].classList.contains("is-checked")).to.be.false;
			expect(labelList[6].classList.contains("is-checked")).to.be.false;
		});
		describe("test values reactivity to changes", () => {
			
			it("radioList value should be the model value after changed", (done) => {
				model.skills = "ReactJS-123";
				vm.$nextTick( () => {
					expect(isChecked(0)).to.be.false;
					expect(isChecked(1)).to.be.false;
					expect(isChecked(2)).to.be.false;
					expect(isChecked(3)).to.be.false;
					expect(isChecked(4)).to.be.false;
					expect(isChecked(5)).to.be.true;
					expect(isChecked(6)).to.be.false;
					done();
				});
			});

			it("model value should be the radioList value if changed", (done) => {
				radios[0].click();

				vm.$nextTick( () => {
					expect(model.skills).to.be.equal("HTML5-123");
					done();
				});
			});
		});
		
		describe("test 'is-checked' class attribution reactivity to changes", () => {

			it("label with checked input should have a 'is-checked' class after model value is changed", (done) =>{
				model.skills = "ReactJS-123";
				vm.$nextTick( () => {
					expect(labelList[0].classList.contains("is-checked")).to.be.false;
					expect(labelList[1].classList.contains("is-checked")).to.be.false;
					expect(labelList[2].classList.contains("is-checked")).to.be.false;
					expect(labelList[3].classList.contains("is-checked")).to.be.false;
					expect(labelList[4].classList.contains("is-checked")).to.be.false;
					expect(labelList[5].classList.contains("is-checked")).to.be.true;
					expect(labelList[6].classList.contains("is-checked")).to.be.false;
					done();
				});
			});

			it("label with checked input should have a 'is-checked' class after radioList value is changed", (done) =>{
				radios[2].click();

				vm.$nextTick( () => {
					expect(labelList[0].classList.contains("is-checked")).to.be.false;
					expect(labelList[1].classList.contains("is-checked")).to.be.false;
					expect(labelList[2].classList.contains("is-checked")).to.be.true;
					expect(labelList[3].classList.contains("is-checked")).to.be.false;
					expect(labelList[4].classList.contains("is-checked")).to.be.false;
					expect(labelList[5].classList.contains("is-checked")).to.be.false;
					expect(labelList[6].classList.contains("is-checked")).to.be.false;
					done();
				});
			});
		});

	});

});