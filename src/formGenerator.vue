<template lang="pug">
div.vue-form-generator(v-if='schema != null')
	div(v-text="totalNumberOfFields")
	div(v-html="errors")
	fieldset(v-if="schema.fields", :is='tag')
		template(v-for='field in fields')
			form-group(v-if='fieldVisible(field)', :field="field", :errors="errors", :model="model", :options="options", :eventBus="eventBus")

	template(v-for='group in groups')
		fieldset(:is='tag', :class='getFieldRowClasses(group)')
			legend(v-if='group.legend') {{ group.legend }}
			template(v-for='field in group.fields')
				form-group(v-if='fieldVisible(field)', :field="field", :errors="errors", :model="model", :options="options", :eventBus="eventBus")
</template>

<script>
import Vue from "vue";
import { get as objGet, forEach, isFunction, isNil, isArray } from "lodash";
import formMixin from "./formMixin.js";
import formGroup from "./formGroup.vue";

export default {
	name: "formGenerator",
	components: { formGroup },
	mixins: [formMixin],
	props: {
		schema: Object,

		model: Object,

		options: {
			type: Object,
			default() {
				return {
					validateAfterLoad: false,
					validateAsync: false,
					validateAfterChanged: false,
					validationErrorClass: "error",
					validationSuccessClass: ""
				};
			}
		},

		multiple: {
			type: Boolean,
			default: false
		},

		isNewModel: {
			type: Boolean,
			default: false
		},

		tag: {
			type: String,
			default: "fieldset",
			validator: function(value) {
				return value.length > 0;
			}
		}
	},

	data() {
		const eventBus = new Vue();
		return {
			eventBus: eventBus,
			totalNumberOfFields: 0,
			errors: [] // Validation errors
		};
	},

	computed: {
		fields() {
			let res = [];
			if (this.schema && this.schema.fields) {
				forEach(this.schema.fields, (field) => {
					if (!this.multiple || field.multi === true) res.push(field);
				});
			}

			return res;
		},
		groups() {
			let res = [];
			if (this.schema && this.schema.groups) {
				forEach(this.schema.groups.slice(0), (group) => {
					res.push(group);
				});
			}

			return res;
		}
	},

	watch: {
		// new model loaded
		model: {
			handler: function(newModel, oldModel) {
				if (oldModel === newModel)
					// model property changed, skip
					return;

				if (newModel != null) {
					this.$nextTick(() => {
						// Model changed!
						if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
							this.validate().then(() => {}, () => {});
						} else {
							this.clearValidationErrors();
						}
					});
				}
			},
			immediate: () => {
				return true;
			}
		}
	},

	methods: {
		// Get visible prop of field
		fieldVisible(field) {
			if (isFunction(field.visible)) return field.visible.call(this, this.model, field, this);

			if (isNil(field.visible)) return true;

			return field.visible;
		},

		// Child field executed validation
		onFieldValidated(fieldIsValid, fieldErrors, uid) {
			// Remove old errors for this field
			this.errors = this.errors.filter((e) => e.uid !== uid);

			if (!fieldIsValid && fieldErrors && fieldErrors.length > 0) {
				// Add errors with this field
				forEach(fieldErrors, (err) => {
					this.errors.push({
						uid: uid,
						error: err
					});
				});
			}

			let isValid = this.errors.length === 0;
			this.$emit("validated", isValid, this.errors, this);
		},

		onModelUpdated(newVal, schema) {
			this.$emit("model-updated", newVal, schema);
		},

		// Validating the model properties
		validate() {
			return new Promise((resolve, reject) => {
				this.clearValidationErrors();

				let fieldsValidated = 0;

				let formErrors = [];

				this.eventBus.$on("field-deregistering", () => {
					console.warn("Fields were deleted during validation process");
					this.eventBus.$emit("fields-validation-terminated", formErrors);
					reject(formErrors);
				});

				const counter = (isValid, fieldErrors, uid) => {
					fieldsValidated++;
					if (isArray(fieldErrors) && fieldErrors.length > 0) {
						forEach(fieldErrors, (error) => {
							formErrors.push({
								uid: uid,
								error: error
							});
						});
					}

					if (fieldsValidated === this.totalNumberOfFields) {
						this.eventBus.$off("field-validated", counter);
						if (objGet(this.options, "validateAfterChanged", false)) {
							this.eventBus.$on("field-validated", this.onFieldValidated);
						}
						this.errors = formErrors;
						let isValid = formErrors.length === 0;
						this.$emit("validated", isValid, formErrors, this);
						this.eventBus.$emit("fields-validation-terminated", formErrors);

						if (isValid) {
							resolve();
						} else {
							reject(formErrors);
						}
					}
				};
				if (objGet(this.options, "validateAfterChanged", false)) {
					this.eventBus.$off("field-validated", this.onFieldValidated);
				}
				this.eventBus.$on("field-validated", counter);
				this.eventBus.$emit("validate-fields", this);
			});
		},

		// Clear validation errors
		clearValidationErrors() {
			this.errors.splice(0);
			this.eventBus.$emit("clear-validation-errors", this.clearValidationErrors);
		}
	},

	created() {
		if (objGet(this.options, "validateAfterChanged", false)) {
			this.eventBus.$on("field-validated", this.onFieldValidated);
		}
		this.eventBus.$on("model-updated", this.onModelUpdated);
		this.eventBus.$on("fields-validation-trigger", this.validate);
		this.eventBus.$on("field-registering", () => {
			this.totalNumberOfFields = this.totalNumberOfFields + 1;
		});
		this.eventBus.$on("field-deregistering", () => {
			this.totalNumberOfFields = this.totalNumberOfFields - 1;
		});
	},
	beforeDestroy() {
		this.eventBus.$off("field-validated");
		this.eventBus.$off("model-updated");
		this.eventBus.$off("fields-validation-trigger");
		this.eventBus.$off("field-registering");
		this.eventBus.$off("field-deregistering");
	}
};
</script>

<style lang="scss">
.vue-form-generator {
	* {
		box-sizing: border-box;
	}

	.form-control {
		// Default Bootstrap .form-control style
		display: block;
		&:not([class*=" col-"]) {
			width: 100%;
		}
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
	} // .form-control

	span.help {
		margin-left: 0.3em;
		position: relative;

		.icon {
			display: inline-block;
			width: 16px;
			height: 14px;
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA+UlEQVQ4ja3TS0oDQRAG4C8+lq7ceICICoLGK7iXuNBbeAMJuPVOIm7cqmDiIncIggg+cMZFaqCnZyYKWtB0df31V1VXdfNH6S2wD9CP8xT3KH8T9BiTcE7XBMOfyBcogvCFO9ziLWwFRosyV+QxthNsA9dJkEYlvazsQdi3sBv6Ol6TBLX+HWT3fcQZ3vGM5fBLk+ynAU41m1biCXvhs4OPBDuBpa6GxF0P8YAj3GA1d1qJfdoS4DOIcIm1DK9x8iaWeDF/SP3QU6zRROpjLDFLsFlibx1jJaMkSIGrWKntvItcyTBKzCcybsvc9ZmYz3kz9Ooz/b98A8yvW13B3ch6AAAAAElFTkSuQmCC");
			background-repeat: no-repeat;
			background-position: center center;
		} // .icon

		.helpText {
			background-color: #444;
			bottom: 30px;
			color: #fff;
			display: block;
			left: 0px;
			//margin-bottom: 15px;
			opacity: 0;
			padding: 20px;
			pointer-events: none;
			position: absolute;
			text-align: justify;
			width: 300px;
			//transform: translateY(10%);
			transition: all 0.25s ease-out;
			box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
			border-radius: 6px;

			a {
				font-weight: bold;
				text-decoration: underline;
			} // a
		} // .helpText

		/* This bridges the gap so you can mouse into the tooltip without it disappearing */
		.helpText:before {
			bottom: -20px;
			content: " ";
			display: block;
			height: 20px;
			left: 0;
			position: absolute;
			width: 100%;
		}

		&:hover .helpText {
			opacity: 1;
			pointer-events: auto;
			transform: translateY(0px);
		}
	} // span.help

	.field-wrap {
		display: flex;

		.buttons {
			white-space: nowrap;
			margin-left: 4px;
		}

		button,
		input[type="submit"] {
			// Default Bootstrap button style
			display: inline-block;
			padding: 6px 12px;
			margin: 0px;
			font-size: 14px;
			font-weight: normal;
			line-height: 1.42857143;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			touch-action: manipulation;
			cursor: pointer;
			user-select: none;
			color: #333;
			background-color: #fff;
			border: 1px solid #ccc;
			border-radius: 4px;

			&:not(:last-child) {
				margin-right: 4px;
			}

			&:hover {
				color: #333;
				background-color: #e6e6e6;
				border-color: #adadad;
			}

			&:active {
				color: #333;
				background-color: #d4d4d4;
				border-color: #8c8c8c;
				outline: 0;
				box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
			}

			&:disabled {
				opacity: 0.6;
				cursor: not-allowed;
			}
		} // button, input[submit]
	} // .field-wrap

	.hint {
		font-style: italic;
		font-size: 0.8em;
	} // .hint
} // fieldset
</style>
