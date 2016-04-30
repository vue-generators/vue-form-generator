<template lang="jade">
	.input-group.date
		input.form-control(type="text", v-model="value", :disabled="disabled")
		span.input-group-addon
			span.glyphicon.glyphicon-calendar
</template>

<script>
	import abstractField from './abstractField';
	import moment from "moment";

	let inputFormat = "YYYY-MM-DD HH:mm:ss";

	export default {
		mixins: [ abstractField ],

		methods: {

			formatValueToField(value) {
				if (value != null)
					return moment(value, this.schema.format).format(inputFormat);

				return value;
			},

			formatValueToModel(value) {
				if (value != null) {
					let m = moment(value, inputFormat);
					if (this.schema.format)
						value = m.format(this.schema.format);
					else
						value = m.toDate().valueOf();
				}

				return value;
			}

		},

		ready() {
			if ($.fn.datetimepicker) 
				$(this.$el).datetimepicker(this.schema.dateTimePickerOptions);
		}		
	}
</script>


<style lang="sass" scoped>
	input {
		width: 100%;
	}
</style>
