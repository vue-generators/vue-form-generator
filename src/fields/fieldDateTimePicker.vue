<template lang="jade">
	.input-group.date
		input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
		span.input-group-addon
			span.glyphicon.glyphicon-calendar
</template>

<script>
	/* global $ */
	import abstractField from "./abstractField";
	import fecha from "fecha";
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
				if (value != null) {
					let dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
					return fecha.format(dt, this.getDateFormat());
				}

				return value;
			},

			formatValueToModel(value) {
				if (value != null) {
					let m = fecha.parse(value, this.getDateFormat());
					if (this.schema.format)
						value = fecha.format(m, this.schema.format);
					else
						value = m.valueOf();
				}

				return value;
			}

		},

		mounted() {
			this.$nextTick(function () {
				if (window.$ && window.$.fn.datetimepicker) {
					$(this.$el).datetimepicker(defaults(this.schema.dateTimePickerOptions || {}, {
						format: inputFormat
					}));
				} else {
					console.warn("Bootstrap datetimepicker library is missing. Please download from https://eonasdan.github.io/bootstrap-datetimepicker/ and load the script and CSS in the HTML head section!");
				}
			});
		},

		beforeDestroy() {
			if (window.$ && window.$.fn.datetimepicker){
				$(this.$el).data("DateTimePicker").destroy();
			}
		}		
	};
</script>


<style lang="sass">
</style>
