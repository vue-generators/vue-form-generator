<template lang="pug">
	.input-group.date
		input.form-control(type="text", v-model="value", :autocomplete="fieldOptions.autocomplete", :disabled="disabled", :placeholder="placeholder", :readonly="readonly", :name="inputName", :id="getFieldID(schema)")
		span.input-group-addon
			span.glyphicon.glyphicon-calendar
</template>

<script>
/* global $ */
import abstractField from "../abstractField";
import { defaults } from "lodash";
import dateFieldHelper from "../../utils/dateFieldHelper";

let inputFormat = "YYYY-MM-DD HH:mm:ss";

export default {
	mixins: [abstractField],

	methods: {
		getDateFormat() {
			if (typeof this.fieldOptions.format !== "undefined") return this.fieldOptions.format;
			else return inputFormat;
		},

		...dateFieldHelper
	},

	mounted() {
		this.$nextTick(() => {
			if (window.$ && window.$.fn.datetimepicker) {
				let input = this.$el.querySelector(".form-control");
				$(this.$el)
					.datetimepicker(
						defaults(this.fieldOptions, {
							format: inputFormat
						})
					)
					.on("dp.change", () => {
						this.value = input.value;
					});
			} else {
				console.warn(
					"Bootstrap datetimepicker library is missing. Please download from https://eonasdan.github.io/bootstrap-datetimepicker/ and load the script and CSS in the HTML head section!"
				);
			}
		});
	},

	beforeDestroy() {
		if (window.$ && window.$.fn.datetimepicker) {
			$(this.$el)
				.data("DateTimePicker")
				.destroy();
		}
	}
};
</script>
