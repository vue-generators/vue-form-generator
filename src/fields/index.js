/** Load all fields from '../fields' folder **/
import { each, isFunction, isNil, isArray, isString } from "lodash";

export const fieldComponents = {};

let coreFields = require.context("./core", false, /^\.\/field([\w-_]+)\.vue$/);

each(coreFields.keys(), (key) => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	module.exports.fieldComponents[compName] = coreFields(key);
});

if (process.env.FULL_BUNDLE) {  // eslint-disable-line
	let Fields = require.context("./optional", false, /^\.\/field([\w-_]+)\.vue$/);

	each(Fields.keys(), (key) => {
		let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
		module.exports.fieldComponents[compName] = Fields(key);
	});
}