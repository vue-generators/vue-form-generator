<template lang="pug">
	.input-group.date
		input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName", :id="getFieldID(schema)")
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
		mixins: [ abstractField ],

		methods: {

			getDateFormat() {
				if (this.schema.dateTimePickerOptions && this.schema.dateTimePickerOptions.format)
					return this.schema.dateTimePickerOptions.format;
				else
					return inputFormat;
			},

			...dateFieldHelper
		},

		mounted() {
			this.$nextTick(function () {
				if (window.$ && window.$.fn.datetimepicker) {
					let input = this.$el.querySelector(".form-control");
					$(this.$el).datetimepicker(defaults(this.schema.dateTimePickerOptions || {}, {
						format: inputFormat
					})).on("dp.change", () => {
						this.value = input.value;
					});
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
