<template lang="pug">
	input(:id="getFieldID(schema)", type="submit", :value="schema.buttonText", @click="onClick", :name="schema.inputName", :disabled="disabled", :class="schema.fieldClasses", v-attributes="'input'")
</template>

<script>
import abstractField from "../abstractField";
import { get as objGet, isFunction, isEmpty } from "lodash";

export default {
	mixins: [abstractField],

	methods: {
		onClick($event) {
			if (this.schema.validateBeforeSubmit === true) {
				// prevent a <form /> from having it's submit event triggered
				// when we have to validate data first
				$event.preventDefault();
				let validateAsync = objGet(this.formOptions, "validateAsync", false);
				let errors = this.vfg.validate();
				let handleErrors = errors => {
					if ((validateAsync && !isEmpty(errors)) || (!validateAsync && !errors)) {
						if (isFunction(this.schema.onValidationError)) {
							this.schema.onValidationError(this.model, this.schema, errors, $event);
						}
					} else if (isFunction(this.schema.onSubmit)) {
						this.schema.onSubmit(this.model, this.schema, $event);
					}
				};

				if (errors && isFunction(errors.then)) {
					errors.then(handleErrors);
				} else {
					handleErrors(errors);
				}
			} else if (isFunction(this.schema.onSubmit)) {
				// if we aren't validating, just pass the onSubmit handler the $event
				// so it can be handled there
				this.schema.onSubmit(this.model, this.schema, $event);
			}
		}
	}
};
</script>

<style lang="scss">
.vue-form-generator .field-submit input {
	// Default bootstrap primary button style
	color: #fff !important;
	background-color: #337ab7 !important;
	border-color: #2e6da4 !important;
}
</style>
