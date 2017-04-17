<template lang="jade">
	input(type="submit", :value="buttonText()", @click="click", :name="schema.inputName")
</template>

<script>
	import isFunction from 'lodash/isFunction';
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],

		methods: {
			click() {
				if (this.schema.validateBeforeSubmit === true) {
					if (!this.$parent.validate()) {
						// There are validation errors. Stop the submit
						return;
					}
				}

				if (isFunction(this.schema.onSubmit)) {
					this.schema.onSubmit(this.model, this.schema);
				}
			},

			buttonText() {
				if (isFunction(this.schema.buttonText)) {
					return this.schema.buttonText()
				}

				return this.schema.buttonText
			}
		}
	};
	
</script>

<style lang="sass">
	.vue-form-generator .field-submit input {
		// Default bootstrap primary button style
		color: #fff !important;
		background-color: #37578d !important;
		margin: 0 auto !important;
	}
</style>
