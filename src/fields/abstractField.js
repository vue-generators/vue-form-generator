import { get as objGet, forEach, isFunction, isString, isArray, debounce, isNil } from "lodash";
import validators from "../utils/validators";
import { slugifyFormID } from "../utils/schema";
import { eventBus } from "../event-bus.js";

const convertValidator = (validator) => {
	if (isString(validator)) {
		if (validators[validator] != null) return validators[validator];
		else {
			console.warn(`'${validator}' is not a validator function!`);
			return null; // caller need to handle null
		}
	}
	return validator;
};

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
	props: {
		model: {
			type: Object
		},
		schema: {
			type: Object
		},
		formOptions: {
			type: Object
		}
	},

	data() {
		return {
			errors: [],
			debouncedValidateFunc: null,
			debouncedFormatFunction: null
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
		},
		disabled() {
			return this.getValueFromOption(this.schema, "disabled");
		},
		fieldClasses() {
			return this.getValueFromOption(this.schema, "fieldClasses", []);
		},
		fieldOptions() {
			return this.getValueFromOption(this.schema, "fieldOptions", {});
		},
		inputName() {
			return this.getValueFromOption(this.schema, "inputName", "");
		},
		placeholder() {
			return this.getValueFromOption(this.schema, "placeholder", "");
		},
		readonly() {
			return this.getValueFromOption(this.schema, "readonly");
		},
		required() {
			return this.getValueFromOption(this.schema, "required");
		},
		values() {
			return this.getValueFromOption(this.schema, "values", []);
		}
	},

	methods: {
		getValueFromOption(field, option, defaultValue) {
			if (typeof this.$parent.getValueFromOption === "function") {
				return this.$parent.getValueFromOption(field, option, defaultValue);
			} else {
				// Environnement de test ?
				if (isNil(field[option])) return defaultValue;

				return field[option];
			}
		},
		validate() {
			this.clearValidationErrors();
			let validateAsync = objGet(this.formOptions, "validateAsync", false);

			let results = [];

			if (
				this.schema.validator &&
				this.readonly !== true &&
				this.schema.readonly !== true && // only for the test
				this.disabled !== true
			) {
				let validators = [];
				if (!isArray(this.schema.validator)) {
					validators.push(convertValidator(this.schema.validator).bind(this));
				} else {
					forEach(this.schema.validator, (validator) => {
						validators.push(convertValidator(validator).bind(this));
					});
				}

				forEach(validators, (validator) => {
					if (validateAsync) {
						results.push(validator(this.value, this.schema, this.model));
					} else {
						let result = validator(this.value, this.schema, this.model);
						if (result && isFunction(result.then)) {
							result.then((err) => {
								if (err) {
									this.errors = this.errors.concat(err);
								}
								// let isValid = this.errors.length === 0;
								// this.$emit("validated", isValid, this.errors, this);
								// eventBus.$emit("validated", isValid, this.errors, this);
							});
						} else if (result) {
							results = results.concat(result);
						}
					}
				});
			}

			let handleErrors = (errors) => {
				let fieldErrors = [];
				forEach(errors, (err) => {
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

				this.errors = fieldErrors;
				eventBus.$emit("field-validated", isValid, fieldErrors, this._uid);
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
					objGet(this.formOptions, "validateDebounceTime", 500)
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
				eventBus.$emit("model-updated", newValue, this.schema.model);

				if (isFunction(this.schema.onChanged)) {
					this.schema.onChanged.call(this, this.model, newValue, oldValue, this.schema);
				}
				if (objGet(this.formOptions, "validateAfterChanged", false)) {
					if (objGet(this.formOptions, "validateDebounceTime", 500) > 0) {
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

		getFieldID(schema) {
			const idPrefix = objGet(this.formOptions, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix);
		},

		formatValueToField(value) {
			return value;
		},

		formatValueToModel(value) {
			return value;
		}
	},
	created() {
		eventBus.$on("clear-validation-errors", this.clearValidationErrors);
		eventBus.$on("validate-fields", this.validate);
		eventBus.$emit("field-registering");
	},
	mounted() {
		const diff = function(a, b) {
			return b.filter(function(i) {
				return a.indexOf(i) < 0;
			});
		};
		const allowedKeys = [
			// Minimal
			"type",
			"model",
			// Identity
			"id",
			"inputName",
			// Texts
			"label",
			"placeholder",
			"hint",
			"help",
			// Modifiers
			"featured",
			"visible",
			"disabled",
			"required",
			"readonly",
			"validator",
			// Other options
			"styleClasses",
			"labelClasses",
			"fieldClasses",
			"fieldOptions",
			"values",
			"buttons",
			"attributes",
			// Getter/Setter
			"get",
			"set",
			// Events
			"onChanged",
			"onValidated"
		];
		if (this.schema) {
			let currentKeys = Object.keys(this.schema);
			let result = diff(allowedKeys, currentKeys);
			if (result.length > 0) {
				console.log("diff", result, this.schema.type, this.schema.model);
			}
		}
	},
	beforeDestroy() {
		eventBus.$off("clear-validation-errors");
		eventBus.$off("validate-fields");
		eventBus.$emit("field-deregistering", this);
	}
};
