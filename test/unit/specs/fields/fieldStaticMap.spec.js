import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import FieldStaticMap from "src/fields/fieldStaticMap.vue";

Vue.component("FieldStaticMap", FieldStaticMap);

// eslint-disable-next-line
let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldStaticMap", schema, model, disabled, options);
}

describe("fieldStaticMap.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "staticMap",
			label: "Geo",
			model: "geo"
		};
		let model = { 
			geo: {
				lat: 13.4567,
				lng: 20.3321
			} 
		};
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("img")[0];
		});

		it("should contain an img element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.src).to.be.equal("http://maps.googleapis.com/maps/api/staticmap?center=13.4567,20.3321&zoom=8&scale=false&size=800x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000");
		});

	});

});