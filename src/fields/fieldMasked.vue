<template lang="jade">
	input.form-control(type="text", v-model="value", :readonly="schema.readonly", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
	/* global $ */
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],

		ready() {
			if ($.fn.mask) {
				$(this.$el).unmask().mask(this.schema.mask, this.schema.maskOptions);
			}
			else
				console.warn("JQuery MaskedInput library is missing. Please download from https://github.com/digitalBush/jquery.maskedinput and load the script in the HTML head section!");
		},

		beforeDestroy() {
			if ($.fn.mask)
				$(this.$el).unmask();
		}	
	};
</script>

<style lang="sass">
</style>
