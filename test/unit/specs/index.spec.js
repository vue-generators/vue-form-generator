import { expect } from "chai";

import VueFormGenerator from "src/index";

describe("module", () => {

	it("module properties", () => {

		expect(VueFormGenerator).to.be.exist;
		expect(VueFormGenerator).to.have.property("component");
		expect(VueFormGenerator).to.have.property("schema");
		expect(VueFormGenerator).to.have.property("validators");
		expect(VueFormGenerator).to.have.property("abstractField");
		expect(VueFormGenerator.install).to.be.a("function");

	});

});