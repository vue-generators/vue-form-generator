<template lang="pug">
	input.form-control(type="text", v-model="value", :autocomplete="fieldOptions.autocomplete", :disabled="disabled", :placeholder="placeholder", :readonly="readonly", :name="inputName")
</template>

<script>
import abstractField from "../abstractField";
import { defaults } from "lodash";
import dateFieldHelper from "../../utils/dateFieldHelper";

export default {
	mixins: [abstractField],
	data() {
		return { picker: null };
	},

	methods: {
		...dateFieldHelper
	},

	mounted() {
		this.$nextTick(() => {
			if (window.Pikaday) {
				this.picker = new window.Pikaday(
					defaults(this.fieldOptions, {
						field: this.$el, // bind the datepicker to a form field
						onSelect: () => {
							this.value = this.picker.toString();
						}
						// trigger: , // use a different element to trigger opening the datepicker, see [trigger example][] (default to `field`)
					})
				);
			} else {
				console.warn(
					"Pikaday is missing. Please download from https://github.com/dbushell/Pikaday/ and load the script and CSS in the HTML head section!"
				);
			}
		});
	},

	beforeDestroy() {
		if (this.picker) this.picker.destroy();
	}
};
</script>
