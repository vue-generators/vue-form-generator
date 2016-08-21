<template lang="jade">
	input.form-control(type="text", v-model="value", :readonly="schema.readonly", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
import abstractField from "./abstractField";
import { defaults } from "lodash";

export default {
	mixins: [abstractField],

	data() {
		return {
			cleave: null
		};
	},

	ready() {
		if (window.Cleave) {
			this.cleave = new window.Cleave(this.$el, defaults(this.schema.cleaveOptions || {}, {
				// Credit Card
				creditCard: false,
				// onCreditCardTypeChanged: onCreditCardTypeChanged.bind(this),
				// Phone
				phone: false,
				phoneRegionCode: 'AU',
				// Date
				date: false,
				datePattern: ['d', 'm', 'Y'],
				// Numerals
				numeral: false,
				numeralThousandsGroupStyle: 'thousand',
				numeralDecimalScale: 2,
				numeralDecimalMark: '.',
				// General
				blocks: [],
				delimiter: ' ',
				prefix: null,
				numericOnly: false,
				uppercase: false,
				lowercase: false
			}));
		} else {
			console.warn("Cleave is missing. Please download from https://github.com/nosir/cleave.js/ and load the script in the HTML head section!");
		}
	}
};
</script>

<style lang="sass">
	.vue-form-generator .field-cleave {}
</style>
