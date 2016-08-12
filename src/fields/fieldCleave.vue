<template lang="jade">
	input.form-control(type="text")
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

	watch: {
		/*model: {
			get(){
				if (window.Cleave) {
					console.log("get model", this.model);
				}
			},
			set(value) {
				if (window.Cleave) {
					console.log("set model", this.model, value);
					
				}
			}
		}*/
	},

	methods: {
		/*formatValueToField(){
			console.log(" 1 formatValueToField",this.cleave);
			if (this.cleave) {

				return this.cleave.getRawValue();
			}else{
				console.log("fail")
				// this.cleave.element.value = "";
				return "";
			}
		},*/
		/*formatValueToModel(newValue){
			console.log(" 2 formatValueToModel");
			this.cleave.setRawValue(newValue);
			return newValue;
		}*/
		// onCreditCardTypeChanged(type){
		// 	let onCreditCardTypeChanged = this.schema.onCreditCardTypeChanged;
		// 	if (typeof(onNewTag) == "function") {
		// 		onNewTag(newTag, id, this.options, this.value);
		// 	}
		// }
		/*onChange(value) {
			console.log(value);
			if (value.length === 1) {
				// Single value
				this.value = parseFloat(value[0]);
			} else {
				// Array (range)
				this.value = [parseFloat(value[0]), parseFloat(value[1])];
			}
		}*/
	},

	ready() {
		if (window.Cleave) {
			this.cleave = new Cleave(this.$el, defaults(this.schema.cleaveOptions || {}, {
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
