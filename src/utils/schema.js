import {get, set, each} from "lodash";

// Create a new model by schema default values
module.exports.createDefaultObject = function (schema, obj = {}){
	each(schema.fields, (field) => {
		if (get(obj, field.model) === undefined && field.default !== undefined)
			set(obj, field.model, field.default);
	});
	return obj;
};

// Get a new model which contains only properties of multi-edit fields
module.exports.getMultipleFields = function(schema) {
	let res = [];
	each(schema.fields, (field) => {
		if (field.multi === true) 
			res.push(field);
	});

	return res;
};

// Merge many models to one 'work model' by schema
module.exports.mergeMultiObjectFields = function(schema, objs) {
	let model = {};

	let fields = module.exports.getMultipleFields(schema);

	each(fields, (field) => {
		let mergedValue = undefined;
		let notSet = true;
		let path = field.model;

		each(objs, (obj) => {
			let v = get(obj, path);
			if (notSet) {
				mergedValue = v;
				notSet = false;
			}
			else if (mergedValue != v) {
				mergedValue = undefined;
			}
		});

		set(model, path, mergedValue);
	});

	return model;
};