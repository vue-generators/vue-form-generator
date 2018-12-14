<template lang="pug">
	input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
</template>

<script>
import abstractField from "../abstractField";
import { defaults, get as objGet } from "lodash";
import dateFieldHelper from "../../utils/dateFieldHelper";

let inputFormat = "YYYY-MM-DD";

export default {
	mixins: [ abstractField ],
	data() {
		return { 
			picker: null,
			options: null
		};
	},

	methods: {
		getDateFormat() {
			return objGet(this.schema, "pikadayOptions.format", inputFormat);
		},
		...dateFieldHelper,
		initialize(options) {
			if(this.picker && this.picker.destroy) {
				// if an existing picker is already set, destroy it first
				this.picker.destroy();
			}

			this.$nextTick(() => {
				if (window.Pikaday) {
					this.options = defaults({}, options, {
						field: this.$el, // bind the datepicker to a form field
						onSelect: () => {
							this.value = this.picker.toString();
						}
						// trigger: , // use a different element to trigger opening the datepicker, see [trigger example][] (default to `field`)
					});
					this.picker = new window.Pikaday(this.options);
				} else {
					console.warn("Pikaday is missing. Please download from https://github.com/dbushell/Pikaday/ and load the script and CSS in the HTML head section!");
				}
			});
		}
	},

	mounted() {
		this.initialize(objGet(this.schema, "pikadayOptions", {}));
	},

	beforeDestroy() {
		if (this.picker) {
			this.picker.destroy();
		}
	}
};
</script>


<style lang="scss">

</style>
