import { expect } from "chai";

import VueFormGenerator from "src/index";

describe("VueFormGenerator", () => {

	it("class properties", () => {

		expect(true).to.be.true;

		expect(VueFormGenerator).to.be.exist;
		expect(VueFormGenerator).to.have.property("component");
		expect(VueFormGenerator).to.have.property("schema");
		expect(VueFormGenerator).to.have.property("validators");

	});

})