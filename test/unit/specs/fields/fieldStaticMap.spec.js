import { expect } from "chai";
import { createVueField } from "../util";

import Vue from "vue";
import FieldStaticMap from "src/fields/optional/fieldStaticMap.vue";

Vue.component("FieldStaticMap", FieldStaticMap);

// eslint-disable-next-line
let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldStaticMap", schema, model, disabled, options);
}

describe("fieldStaticMap.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "staticMap",
			label: "Geo",
			model: "geo",
			staticMapOptions: {
				lat: "latitude",
				lng: "longitude",
				zoom: 6,
				sizeX:640,
				sizeY:640,
				scale: 1,
				format:"png",
				maptype:"satellite",
				language:"FR-fr",
				markers:"size:mid%7Ccolor:0xff0000",
			}
		};
		let model = {
			geo: {
				latitude: 13.4567,
				longitude: 20.3321
			}
		};
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("img")[0];
		});

		it("should contain an img element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.src).to.be.equal("http://maps.googleapis.com/maps/api/staticmap?center=13.4567,20.3321&zoom=6&size=640x640&scale=1&format=png&maptype=satellite&language=FR-fr&markers=size:mid%7Ccolor:0xff0000");
		});

	});

});