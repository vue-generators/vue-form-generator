import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import FieldRadios from "src/fields/fieldRadios.vue";

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
			]
		};
		let model = { skills: "Javascript" };
		let radioList;
		let radios;

		function isChecked(idx) {
			return(radios[idx].checked);
		}

		before( () => {
			createField(this, schema, model, false);
			radioList = el.querySelector(".radio-list");
			radios = radioList.querySelectorAll("input[type=radio]");
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

	describe("check template with object array", () => {
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
			],
			radiosOptions: {
				value:"value",
				name:"name"
			}
		};
		let model = { skills: "CSS3-123" };
		let radioList;
		let radios;

		function isChecked(idx) {
			return(radios[idx].checked);
		}

		before( () => {
			createField(this, schema, model, false);
			radioList = el.querySelector(".radio-list");
			radios = radioList.querySelectorAll("input[type=radio]");
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

});