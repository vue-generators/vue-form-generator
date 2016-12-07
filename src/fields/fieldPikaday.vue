<template lang="jade">
	input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
</template>

<script>
	import abstractField from "./abstractField";
	import moment from "moment";
	import { defaults } from "lodash";

	let inputFormat = "YYYY-MM-DD";

	export default {
		mixins: [ abstractField ],
		data(){
			return {picker: null};
		},

		methods: {

			getDateFormat() {
				if (this.schema.pikadayOptions && this.schema.pikadayOptions.format) 
					return this.schema.pikadayOptions.format;
				else
					return inputFormat;
			},

			formatValueToField(value) {
				if (value != null)
					return moment(value, this.schema.format).format(this.getDateFormat());

				return value;
			},

			formatValueToModel(value) {
				if (value != null) {
					let m = moment(value, this.getDateFormat());
					if (this.schema.format)
						value = m.format(this.schema.format);
					else
						value = m.toDate().valueOf();
				}
				return value;
			}

		},

		mounted() {
			this.$nextTick(() => {
				if (window.Pikaday){
					this.picker = new window.Pikaday(defaults(this.schema.pikadayOptions || {}, {
						field: this.$el, // bind the datepicker to a form field
						// trigger: , // use a different element to trigger opening the datepicker, see [trigger example][] (default to `field`)
					}));
				} else {
					console.warn("Pikaday is missing. Please download from https://github.com/dbushell/Pikaday/ and load the script and CSS in the HTML head section!");
				}
			});

		},

		beforeDestroy() {
			if (this.picker)
				this.picker.destroy();
		}
	};
</script>


<style lang="sass">
</style>
