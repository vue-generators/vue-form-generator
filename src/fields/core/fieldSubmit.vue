<template>
	<input :id="fieldID"
		type="submit"
		:value="fieldOptions.buttonText"
		@click="onClick"
		:name="inputName"
		:disabled="disabled"
		:class="fieldClasses"
		v-attributes="'input'">
</template>

<script>
import abstractField from "../abstractField";
import { isFunction, isEmpty } from "lodash";

export default {
	name: "field-submit",
	mixins: [abstractField],

	methods: {
		onClick($event) {
			if (this.fieldOptions.validateBeforeSubmit === true) {
				// prevent a <form /> from having it's submit event triggered
				// when we have to validate data first
				$event.preventDefault();

				this.eventBus.$emit("fields-validation-trigger");
				this.eventBus.$on("fields-validation-terminated", (formErrors) => {
					if (!isEmpty(formErrors) && isFunction(this.fieldOptions.onValidationError)) {
						this.fieldOptions.onValidationError(this.model, this.schema, formErrors, $event);
					} else if (isFunction(this.fieldOptions.onSubmit)) {
						this.fieldOptions.onSubmit(this.model, this.schema, $event);
					}
				});
			} else if (isFunction(this.fieldOptions.onSubmit)) {
				// if we aren't validating, just pass the onSubmit handler the $event
				// so it can be handled there
				this.fieldOptions.onSubmit(this.model, this.schema, $event);
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
