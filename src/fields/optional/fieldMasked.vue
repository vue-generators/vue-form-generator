<template lang="pug">
	input.form-control(type="text", v-model="value", :autocomplete="fieldOptions.autocomplete", :disabled="disabled", :placeholder="placeholder", :readonly="readonly", :name="inputName", :id="getFieldID(schema)")
</template>

<script>
/* global $ */
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],

	mounted() {
		this.$nextTick(function() {
			if (window.$ && window.$.fn.mask) {
				$(this.$el)
					.unmask()
					.mask(this.fieldOptions.mask, this.fieldOptions.maskOptions);
			} else {
				console.warn(
					"JQuery MaskedInput library is missing. Please download from https://github.com/digitalBush/jquery.maskedinput and load the script in the HTML head section!"
				);
			}
		});
	},

	beforeDestroy() {
		if (window.$ && window.$.fn.mask) $(this.$el).unmask();
	}
};
</script>
