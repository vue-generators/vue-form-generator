import { expect } from "chai";
import { clone } from "lodash";

import SchemaUtils from "src/utils/schema";

describe("SchemaUtils", () => {

	describe("test createDefaultObject function", () => {

		let schema = {
			fields: [
				{	model: "id"									},
				{	model: "name",		default: "Anonymous" 	},
				{	model: "password"							},	
				{	model: "age",		default: 30 			},	
				{	model: "email"								},					
				{	model: "skills",	default: [] 			},
				{	model: "status",	default: true 			}
			]
		};

		it("create default object by schema", () => {
			let res = SchemaUtils.createDefaultObject(schema, {
				id: 5,
				age: 45
			});
			expect(res).to.be.deep.equal({
				id: 5,
				name: "Anonymous",
				age: 45,
				skills: [],
				status: true
			});
		});


	});

	describe("test getMultipleFields function", () => {

		let schema = {
			fields: [
				{	model: "id"							},
				{	model: "name",		multi: false 	},
				{	model: "password"					},	
				{	model: "age",		multi: true 	},	
				{	model: "email"						},					
				{	model: "skills",	multi: true 	},
				{	model: "status",	multi: true 	}
			]
		};

		it("collect fields from schema where multi is true", () => {
			let res = SchemaUtils.getMultipleFields(schema);
			expect(res.length).to.be.equal(3);
			expect(res[0].model).to.be.equal("age");
			expect(res[1].model).to.be.equal("skills");
			expect(res[2].model).to.be.equal("status");
		});

	});	

	describe("test mergeMultiObjectFields function", () => {

		let schema = {
			fields: [
				{	model: "id"							},
				{	model: "name",		multi: true 	},
				{	model: "age",		multi: true		},	
				{	model: "status",	multi: true 	}
			]
		};

		let models = [
			{	id: 1, name: "John", age: 25, status: true },
			{	id: 2, name: "James", age: 30, status: true }
		];

		it("create merged model from multiple objects #1", () => {
			let res = SchemaUtils.mergeMultiObjectFields(schema, models);
			expect(res).to.be.deep.equal({
				name: undefined,
				age: undefined,
				status: true
			});
		});

		it("create merged model from multiple objects #2", () => {
			models[1].age = 25;
			models[1].status = false;

			let res = SchemaUtils.mergeMultiObjectFields(schema, models);
			expect(res).to.be.deep.equal({
				name: undefined,
				age: 25,
				status: undefined
			});
		});		


		it("create merged model from cloned objects", () => {
			models[1] = clone(models[0]);

			let res = SchemaUtils.mergeMultiObjectFields(schema, models);
			expect(res).to.be.deep.equal({
				name: "John",
				age: 25,
				status: true
			});
		});	
	});
	

});