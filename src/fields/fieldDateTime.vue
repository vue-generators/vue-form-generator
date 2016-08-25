<template lang="jade">
	.input-group.date
		input.form-control(type="text", v-model="value", :disabled="disabled")
		span.input-group-addon
			span.glyphicon.glyphicon-calendar
</template>

<script>
	/* global $ */
	import abstractField from "./abstractField";
	import moment from "moment";
	import { defaults } from "lodash";

	let inputFormat = "YYYY-MM-DD HH:mm:ss";

	export default {
		mixins: [ abstractField ],

		methods: {

			getDateFormat() {
				if (this.schema.dateTimePickerOptions && this.schema.dateTimePickerOptions.format) 
					return this.schema.dateTimePickerOptions.format;
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

		ready() {
			if ($.fn.datetimepicker) {
				$(this.$el).datetimepicker(this.schema.dateTimePickerOptions);
				//$(this.$el).data("DateTimePicker").date(this.formatValueToField(this.value));
			}
			else
				console.warn("Bootstrap datetimepicker library is missing. Please download from https://eonasdan.github.io/bootstrap-datetimepicker/ and load the script and CSS in the HTML head section!");
		}		
	};
</script>


<style lang="sass">
</style>
