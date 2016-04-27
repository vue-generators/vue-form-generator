<template lang="jade">
	input.form-control(type="date", v-model="value", :min="schema.min", :max="schema.max", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
	import abstractField from './abstractField';
	import moment from "moment";

	let inputFormat = "YYYY-MM-DD";

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

		}
	}
</script>


<style lang="sass" scoped>
	input {
		width: 100%;
	}
</style>
