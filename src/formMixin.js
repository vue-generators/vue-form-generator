import { get as objGet, forEach, isNil, isArray, isString, isFunction } from "lodash";

export default {
	methods: {
		// Get style classes of field
		getFieldRowClasses(field) {
			const hasErrors = this.fieldErrors(field).length > 0;
			let baseClasses = {
				[objGet(this.options, "validationErrorClass", "error")]: hasErrors,
				[objGet(this.options, "validationSuccessClass", "valid")]: !hasErrors,
				disabled: this.getValueFromOption(field, "disabled"),
				readonly: this.getValueFromOption(field, "readonly"),
				featured: this.getValueFromOption(field, "featured"),
				required: this.getValueFromOption(field, "required")
			};
			let styleClasses = field.styleClasses;

			if (isArray(styleClasses)) {
				forEach(styleClasses, (c) => (baseClasses[c] = true));
			} else if (isString(styleClasses)) {
				baseClasses[styleClasses] = true;
			}

			if (!isNil(field.type)) {
				baseClasses["field-" + field.type] = true;
			}

			return baseClasses;
		},
		fieldErrors(field) {
			let res = this.errors.filter((e) => e.field === field);
			return res.map((item) => item.error);
		},
		getValueFromOption(field, option, defaultValue = false) {
			if (isFunction(field[option])) return field[option].call(this, this.model, field, this);

			if (isNil(field[option])) return defaultValue;

			return field[option];
		}
	}
};
