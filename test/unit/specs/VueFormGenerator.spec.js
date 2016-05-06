import { expect } from "chai";

import Vue from "vue";
import VueFormGenerator from "src/index";

function createFormGenerator(schema, model, options, done) {
	let el = document.createElement("div");		
	el.innerHTML = `<vue-form-generator :schema="schema" :model="model" :options="options"></vue-form-generator>`;

	let vm = new Vue({
		el: el,
		data: {
			schema,
			model,
			options
		}
	});

	vm.$nextTick(() => {
		console.log(el);
		done(el, vm);
	});
}

describe("VueFormGenerator.vue", () => {

	let el, vm;

	Vue.component("VueFormGenerator", VueFormGenerator.component);

	beforeEach((done) => {
		createFormGenerator({}, null, {}, (_el, _vm) => {
			el = _el;
			vm = _vm;
			done();
		});
	});

	it("should be create HTML divs", () => {
		expect(vm.$el).to.be.exist;
		expect(el.getElementsByTagName("table")).to.be.length(1);

		let table = el.getElementsByTagName("table")[0];

	});




});