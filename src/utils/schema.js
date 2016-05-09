import {get, set, each} from "lodash";

module.exports.createDefaultObject = function (schema, obj = {}){
	each(schema.fields, (field) => {
		if (get(obj, field.model) === undefined && field.default !== undefined)
			set(obj, field.model, field.default);
	});
	return obj;
};

module.exports.getMultipleFields = function(schema) {
	let res = [];
	each(schema.fields, (field) => {
		if (field.multi === true) 
			res.push(field);
	});

	return res;
};

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