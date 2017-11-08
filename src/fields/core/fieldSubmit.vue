<template lang="pug">
	input(:id="getFieldID(schema)", type="submit", :value="schema.buttonText", @click="click", :name="schema.inputName", :disabled="disabled", :class="schema.fieldClasses")
</template>

<script>
	import abstractField from "../abstractField";
	import { isFunction } from "lodash";

	export default {
		mixins: [ abstractField ],

		methods: {
			click() {
				if (this.schema.validateBeforeSubmit === true)
				{
					if (!this.$parent.validate()) {
						// There are validation errors. Stop the submit
						return;
					}
				}

				if (isFunction(this.schema.onSubmit))
					this.schema.onSubmit(this.model, this.schema);
			}
		}
	};
	
</script>

<style lang="sass">
	.vue-form-generator .field-submit input {
		// Default bootstrap primary button style
		color: #fff !important;
		background-color: #337ab7 !important;
		border-color: #2e6da4 !important;
	}
</style>
