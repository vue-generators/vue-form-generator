import { expect } from "chai";

import v from "src/utils/validators";

function check(validator, value, field, errorCount) {
	let res = validator(value, field);
	expect(res).to.be.instanceof(Array);
	expect(res).to.be.length(errorCount);
	return res;
}

describe("Validators", () => {

	describe("test Validators.number", () => {

		let field = {
			min: 5,
			max: 10,
			required: true
		}

		it("should give error if value is null, but field is required", () => {
			check(v.number, null, field, 1);
		});

		it("should give error if value is smaller than min", () => {
			check(v.number, -1, field, 1);
			check(v.number, 0, field, 1);
			check(v.number, 3, field, 1);
		});
		
		it("should give error if value is greater than max", () => {
			check(v.number, 15, field, 1);
		});
		
		it("should not give error", () => {
			check(v.number, 5, field, 0);
			check(v.number, 8, field, 0);
			check(v.number, 10, field, 0);
			check(v.number, 7.56, field, 0);
		});

		it("should give error if value is string", () => {
			check(v.number, "Abc", field, 1);
			check(v.number, "12 Abc", field, 1);
			check(v.number, "", field, 1);
			check(v.number, "    ", field, 1);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.number, null, field, 0);
		});

	});

	describe("test Validators.integer", () => {

		let field = {}

		it("should give error if value is not integer", () => {
			check(v.integer, 3.14, field, 1);
			check(v.integer, "3.14", field, 1);
		});

		it("should not give error if value is integer", () => {
			check(v.integer, -5, field, 0);
			check(v.integer, 0, field, 0);
			check(v.integer, 10, field, 0);
		});

	});

	describe("test Validators.double", () => {

		let field = {}

		it("should give error if value is not double", () => {
			check(v.double, "3,14", field, 1);
			check(v.double, false, field, 1);
		});

		it("should not give error if value is double", () => {
			check(v.double, 3.14, field, 0);
		});

	});

	describe("test Validators.string", () => {

		let field = {
			required: true,
			min: 3,
			max: 10
		}

		it("should give error if value is null, but field is required", () => {
			check(v.string, null, field, 1);
		});

		it("should give error if value is smaller than min", () => {
			check(v.string, "", field, 1);
			check(v.string, "A", field, 1);
			check(v.string, "ab", field, 1);
		});
		
		it("should give error if value is greater than max", () => {
			check(v.string, "abcdefghijklmnop", field, 1);
		});
		
		it("should not give error", () => {
			check(v.string, "Foo", field, 0);
			check(v.string, "Foobar", field, 0);
			check(v.string, "John Doe", field, 0);
			check(v.string, "Foobar7890", field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.string, null, field, 0);
		});
	});

	describe("test Validators.date", () => {

		let field = {
			required: true,
			min: 1262799081231,
			max: 1562799081231
		}

		it("should give error if value is null, but field is required", () => {
			check(v.date, null, field, 1);
		});

		it("should not give error", () => {
			check(v.date, "2016-05-09", field, 0);
			check(v.date, 1462799081231, field, 0);
		});

		it("should give error if value is smaller than min", () => {
			check(v.date, 1220000000000, field, 1);
			check(v.date, "1900-04-05", field, 1);
		});
		
		it("should give error if value is greater than max", () => {
			check(v.date, 1600000000000, field, 1);
			check(v.date, "2100-04-05", field, 1);
		});

	});

});