import { get as objGet, each, isFunction, isString, isArray } from "lodash";
import validators from "../utils/validators";

function convertValidator(validator) {
	if (isString(validator)) {
		if (validators[validator] != null)
			return validators[validator];
		else {
			console.warn(`'${validator}' is not a validator function!`);
			return null; // caller need to handle null
		}
	}
	return validator;
}

export default {
	props: [
		"model",
		"schema",
		"disabled"
	],

	data() {
		return {
			errors: []
		};
	},

	computed: {
		value: {
			cache: false,
			get() {
				let val;
				if (isFunction(this.schema.get))
					val = this.schema.get(this.model);

				else if (this.model && this.schema.model)
					val = objGet(this.model, this.schema.model);

				if (isFunction(this.formatValueToField))
					val = this.formatValueToField(val);

				return val;
			},

			set(newValue) {
				let oldValue = this.value;

				if (isFunction(this.formatValueToModel))
					newValue = this.formatValueToModel(newValue);

				let changed = false;
				if (isFunction(this.schema.set)) {
					this.schema.set(this.model, newValue);
					changed = true;

				} else if (this.schema.model) {
					this.setModelValueByPath(this.schema.model, newValue);
					changed = true;
				}

				if (changed) {
					this.$emit("model-updated", newValue, this.schema.model);

					if (isFunction(this.schema.onChanged)) {
						this.schema.onChanged.call(this, this.model, newValue, oldValue, this.schema);
					}

					if (this.$parent.options && this.$parent.options.validateAfterChanged === true){
						this.validate();
					}
				}
			}
		}
	},

	methods: {
		validate(calledParent) {
			this.clearValidationErrors();

			if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {

				let validators = [];
				if (!isArray(this.schema.validator)) {
					validators.push(convertValidator(this.schema.validator).bind(this));
				} else {
					each(this.schema.validator, (validator) => {
						validators.push(convertValidator(validator).bind(this));
					});
				}

				each(validators, (validator) => {
					let addErrors = err => {
						if (isArray(err))
							Array.prototype.push.apply(this.errors, err);
						else if (isString(err))
							this.errors.push(err);
					};

					let res = validator(this.value, this.schema, this.model);
					if (res && isFunction(res.then)) {
						// It is a Promise, async validator
						res.then(err => {
							if (err) {
								addErrors(err);
								let isValid = this.errors.length == 0;
								this.$emit("validated", isValid, this.errors, this);
							}
						});
					} else {
						if (res)
							addErrors(res);
					}
				});

			}

			if (isFunction(this.schema.onValidated)) {
				this.schema.onValidated.call(this, this.model, this.errors, this.schema);
			}

			let isValid = this.errors.length == 0;
			if (!calledParent)
				this.$emit("validated", isValid, this.errors, this);

			return this.errors;
		},

		clearValidationErrors() {
			this.errors.splice(0);
		},

		setModelValueByPath(path, value) {
			// convert array indexes to properties
			let s = path.replace(/\[(\w+)\]/g, ".$1");

			// strip a leading dot
			s = s.replace(/^\./, "");

			let o = this.model;
			const a = s.split(".");
			let i = 0;
			const n = a.length;
			while (i < n) {
				let k = a[i];
				if (i < n - 1)
					if (o[k] !== undefined) {
						// Found parent property. Step in
						o = o[k];
					} else {
						// Create missing property (new level)
						this.$root.$set(o, k, {});
						o = o[k];
					}
				else {
					// Set final property value
					this.$root.$set(o, k, value);
					return;
				}

				++i;
			}
		},

		getFieldID(schema) {
			// Try to get a reasonable default id from the schema,
			// then slugify it.
			if (typeof schema.id !== "undefined") {
				// If an ID's been explicitly set, use it unchanged
				return schema.idPrefix + schema.id;
			} else {
				// Return the slugified version of either:
				return schema.idPrefix + (schema.inputName || schema.label || schema.model)
				// NB: This is a very simple, conservative, slugify function,
				// avoiding extra dependencies.
				.toString()
				.trim()
				.toLowerCase()
				// Spaces & underscores to dashes
				.replace(/ |_/g, "-")
				// Multiple dashes to one
				.replace(/-{2,}/g, "-")
				// Remove leading & trailing dashes
				.replace(/^-+|-+$/g, "")
				// Remove anything that isn't a (English/ASCII) letter, number or dash.
				.replace(/([^a-zA-Z0-9-]+)/g, "")
				;
			}
		}

	}
};
