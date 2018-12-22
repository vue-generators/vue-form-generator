import { get as objGet, forEach, isFunction, isString, isArray, debounce, uniqueId, uniq as arrayUniq } from "lodash";
import validators from "../utils/validators";
import { slugifyFormID } from "../utils/schema";

function convertValidator(validator) {
	if (isString(validator)) {
		if (validators[validator] != null) return validators[validator];
		else {
			console.warn(`'${validator}' is not a validator function!`);
			return null; // caller need to handle null
		}
	}
	return validator;
}

function attributesDirective(el, binding, vnode) {
	let attrs = objGet(vnode.context, "schema.attributes", {});
	let container = binding.value || "input";
	if (isString(container)) {
		attrs = objGet(attrs, container) || attrs;
	}
	forEach(attrs, (val, key) => {
		el.setAttribute(key, val);
	});
}

export default {
	props: ["vfg", "model", "schema", "formOptions", "disabled"],

	data() {
		return {
			errors: [],
			debouncedValidateFunc: null,
			debouncedFormatFunc: null
		};
	},

	directives: {
		attributes: {
			bind: attributesDirective,
			updated: attributesDirective,
			componentUpdated: attributesDirective
		}
	},

	computed: {
		value: {
			cache: false,
			get() {
				let val;
				if (isFunction(objGet(this.schema, "get"))) {
					val = this.schema.get(this.model);
				} else {
					val = objGet(this.model, this.schema.model);
				}

				return this.formatValueToField(val);
			},

			set(newValue) {
				let oldValue = this.value;
				newValue = this.formatValueToModel(newValue);

				if (isFunction(newValue)) {
					newValue(newValue, oldValue);
				} else {
					this.updateModelValue(newValue, oldValue);
				}
			}
		}
	},

	methods: {
		validate(calledParent) {
			this.clearValidationErrors();
			let validateAsync = objGet(this.formOptions, "validateAsync", false);

			let results = [];

			if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {
				let validators = [];
				if (!isArray(this.schema.validator)) {
					validators.push(convertValidator(this.schema.validator).bind(this));
				} else {
					forEach(this.schema.validator, validator => {
						validators.push(convertValidator(validator).bind(this));
					});
				}

				forEach(validators, validator => {
					if (validateAsync) {
						results.push(validator(this.value, this.schema, this.model));
					} else {
						let result = validator(this.value, this.schema, this.model);
						if (result && isFunction(result.then)) {
							result.then(err => {
								if (err) {
									this.errors = this.errors.concat(err);
								}
								let isValid = this.errors.length === 0;
								this.$emit("validated", isValid, this.errors, this);
							});
						} else if (result) {
							results = results.concat(result);
						}
					}
				});
			}

			let handleErrors = (errors) => {
				let fieldErrors = [];
				forEach(arrayUniq(errors), err => {
					if (isArray(err) && err.length > 0) {
						fieldErrors = fieldErrors.concat(err);
					} else if (isString(err)) {
						fieldErrors.push(err);
					}
				});
				if (isFunction(this.schema.onValidated)) {
					this.schema.onValidated.call(this, this.model, fieldErrors, this.schema);
				}

				let isValid = fieldErrors.length === 0;
				if (!calledParent) {
					this.$emit("validated", isValid, fieldErrors, this);
				}
				this.errors = fieldErrors;
				return fieldErrors;
			};

			if (!validateAsync) {
				return handleErrors(results);
			}

			return Promise.all(results).then(handleErrors);
		},

		debouncedValidate() {
			if (!isFunction(this.debouncedValidateFunc)) {
				this.debouncedValidateFunc = debounce(
					this.validate.bind(this),
					objGet(this.schema, "validateDebounceTime", objGet(this.formOptions, "validateDebounceTime", 500))
				);
			}
			this.debouncedValidateFunc();
		},

		updateModelValue(newValue, oldValue) {
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

				if (objGet(this.formOptions, "validateAfterChanged", false) === true) {
					if (objGet(this.schema, "validateDebounceTime", objGet(this.formOptions, "validateDebounceTime", 0)) > 0) {
						this.debouncedValidate();
					} else {
						this.validate();
					}
				}
			}
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

		getFieldID(schema, unique = false) {
			const idPrefix = objGet(this.formOptions, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix) + (unique ? "-" + uniqueId() : "");
		},

		getFieldClasses() {
			return objGet(this.schema, "fieldClasses", []);
		},

		formatValueToField(value) {
			return value;
		},

		formatValueToModel(value) {
			return value;
		}
	}
};
