<template lang="jade">
	input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly")
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

		ready() {
			if (window.Pikaday){
				this.picker = new window.Pikaday(defaults(this.schema.pikadayOptions || {}, {
					field: this.$el, // bind the datepicker to a form field
					// trigger: , // use a different element to trigger opening the datepicker, see [trigger example][] (default to `field`)
					bound: true, // automatically show/hide the datepicker on `field` focus (default `true` if `field` is set)
					position: "bottom left", // preferred position of the datepicker relative to the form field, e.g.: `top right`, `bottom right` **Note:** automatic adjustment may occur to avoid datepicker from being displayed outside the viewport, see [positions example][] (default to "bottom left")
					reposition: true, // can be set to false to not reposition datepicker within the viewport, forcing it to take the configured `position` (default: true)
					// container: , // DOM node to render calendar into, see [container example][] (default: undefined)
					format: inputFormat, // the default output format for `.toString()` and `field` value (requires [Moment.js][moment] for custom formatting)
					// formatStrict: , // the default flag for moment"s strict date parsing (requires [Moment.js][moment] for custom formatting)
					// defaultDate: , // the initial date to view when first opened
					// setDefaultDate: , // make the `defaultDate` the initial selected value
					firstDay: 1, // first day of the week (0: Sunday, 1: Monday, etc)
					// minDate: , // the minimum/earliest date that can be selected (this should be a native Date object - e.g. `new Date()` or `moment().toDate()`)
					// maxDate: , // the maximum/latest date that can be selected (this should be a native Date object - e.g. `new Date()` or `moment().toDate()`)
					disableWeekends: false, // disallow selection of Saturdays or Sundays
					// disableDayFn: , // callback function that gets passed a Date object for each day in view. Should return true to disable selection of that day.
					// yearRange: , // number of years either side (e.g. `10`) or array of upper/lower range (e.g. `[1900,2015]`)
					showWeekNumber: false, // show the ISO week number at the head of the row (default `false`)
					isRTL: false, // reverse the calendar for right-to-left languages
					i18n: {
						previousMonth : "Previous Month",
						nextMonth     : "Next Month",
						months        : ["January","February","March","April","May","June","July","August","September","October","November","December"],
						weekdays      : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
						weekdaysShort : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
					}, // language defaults for month and weekday names (see internationalization below)
					// yearSuffix: , // additional text to append to the year in the title
					showMonthAfterYear: false, // render the month after year in the title (default `false`)
					showDaysInNextAndPreviousMonths: false, // render days of the calendar grid that fall in the next or previous months to the current month instead of rendering an empty table cell (default: false)
					// numberOfMonths: , // number of visible calendars
					// mainCalendar: , // when `numberOfMonths` is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`). Only used for the first display or when a selected date is not already visible
					theme: null, // define a classname that can be used as a hook for styling different themes, see [theme example][] (default `null`)
					// onSelect: , // callback function for when a date is selected
					// onOpen: , // callback function for when the picker becomes visible
					// onClose: , // callback function for when the picker is hidden
					// onDraw: , // callback function for when the picker draws a new month
				}));
			}
			else{
				console.warn("Pikaday is missing. Please download from https://github.com/dbushell/Pikaday/ and load the script and CSS in the HTML head section!");
			}

		},

		beforeDestroy() {
			if (this.picker)
				this.picker.destroy();
		}
	};
</script>


<style lang="sass">
</style>
