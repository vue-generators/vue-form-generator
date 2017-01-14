import { each, isFunction, isString, isArray, isUndefined } from "lodash";

export default {
	props: [
		"model",
		"schema",
		"disabled"
	],

	computed: {
		value: {
			cache: false,
			get() {
				let val;
				if (isFunction(this.schema.get))
					val = this.schema.get(this.model);

				else if (this.model && this.schema.model)
					val = this.model[this.schema.model];

				if (isFunction(this.formatValueToField))
					val = this.formatValueToField(val);

				return val;
			},

			set(newValue) {
				// console.log("Model value changed!", newValue);
				if (isFunction(this.formatValueToModel))
					newValue = this.formatValueToModel(newValue);

				if (isFunction(this.schema.set)) {
					this.schema.set(this.model, newValue);
					// console.log("model-updated via schema", this.model[this.schema.model]);
					this.$emit("model-updated", this.model[this.schema.model], this.schema.model);

				} else if (this.schema.model) {
					this.$set(this.model, this.schema.model, newValue);
					// console.log("model-updated via normal", this.model[this.schema.model]);
					this.$emit("model-updated", this.model[this.schema.model], this.schema.model);
				}
			}
		}
	},

	watch: {
		value(newVal, oldVal) {
			// console.log("Changed", newVal, oldVal);
			if (isFunction(this.schema.onChanged)) {
				this.schema.onChanged(this.model, newVal, oldVal, this.schema);
			}

			if (this.$parent.options && this.$parent.options.validateAfterChanged === true){
				this.validate();
			}
		}
	},

	methods: {
		validate() {
			this.clearValidationErrors();

			if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {

				let validators = [];
				if (!isArray(this.schema.validator)) {
					validators.push(this.schema.validator.bind(this));
				} else {
					each(this.schema.validator, (validator) => {
						validators.push(validator.bind(this));
					});
				}

				each(validators, (validator) => {
					let err = validator(this.value, this.schema, this.model);
					if (err) {
						if (isArray(err))
							Array.prototype.push.apply(this.schema.errors, err);
						else if (isString(err))
							this.schema.errors.push(err);
					}
				});

			}

			if (isFunction(this.schema.onValidated)) {
				this.schema.onValidated(this.model, this.schema.errors, this.schema);
			}

			return this.schema.errors;
		},

		clearValidationErrors() {
			if (isUndefined(this.schema.errors))
				this.$set(this.schema, "errors", []); // Be reactive
			else
				this.schema.errors.splice(0); // Clear
		},

		getFieldID(schema) {
			// Try to get a reasonable default id from the schema,
			// then slugify it.
			if (typeof schema.id !== 'undefined') {
				// If an ID's been explicitly set, use it unchanged
				return schema.id
			} else {
				return (schema.inputName || schema.label || schema.model)
				.toString()
				.trim()
				.toLowerCase()
				// Spaces to dashes
				.replace(/ /g, '-')
				// Multiple dashes to one
				.replace(/-{2,}/g, '-')
				// Remove leading & trailing dashes
				.replace(/^-+|-+$/g, '')
				// Remove anything that isn't a (English/ASCII) letter or number.
				.replace(/([^a-zA-Z0-9\._-]+)/g, '')
				;
			}
		}
	}
};
