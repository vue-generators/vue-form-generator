import { get as objGet, each, isFunction, isString, isArray, isUndefined } from "lodash";

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
						this.schema.onChanged(this.model, newValue, oldValue, this.schema);
					}

					if (this.$parent.options && this.$parent.options.validateAfterChanged === true){
						this.validate();
					}					
				}
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
				this.$root.$set(this.schema, "errors", []); // Be reactive
			else
				this.schema.errors.splice(0); // Clear
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
		}
	}
};
