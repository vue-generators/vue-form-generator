<template>
	<input type="text"
		:autocomplete="fieldOptions.autocomplete"
		:data-disable="disabled"
		:data-max="fieldOptions.max"
		:data-min="fieldOptions.min"
		:data-step="fieldOptions.step"
		:placeholder="placeholder"
		:readonly="readonly"

		:name="inputName">
</template>

<script>
/* global $ */
import abstractField from "../abstractField";
import { defaults, isArray } from "lodash";

export default {
	name: "field-rangeSlider",
	mixins: [abstractField],

	data() {
		return {
			slider: null
		};
	},

	watch: {
		model: function() {
			if (window.$ && window.$.fn.ionRangeSlider) {
				let valueFrom, valueTo;
				if (isArray(this.value)) {
					[valueFrom, valueTo] = this.value;
				} else valueFrom = this.value;

				if (this.slider) {
					this.slider.update({
						from: valueFrom,
						to: valueTo
					});
				}
			}
		}
	},

	mounted() {
		this.$nextTick(function() {
			if (window.$ && window.$.fn.ionRangeSlider) {
				let valueFrom, valueTo;
				if (isArray(this.value)) {
					[valueFrom, valueTo] = this.value;
				} else valueFrom = this.value;

				let self = this;
				$(this.$el).ionRangeSlider(
					defaults(this.fieldOptions, {
						type: "single",
						grid: true,
						hide_min_max: true,
						from: valueFrom,
						to: valueTo,
						onChange(slider) {
							if (self.slider.options.type === "double") {
								self.value = [slider.from, slider.to];
							} else {
								self.value = slider.from;
							}
						}
					})
				);
				this.slider = $(this.$el).data("ionRangeSlider");
			} else {
				console.warn(
					"ion.rangeSlider library is missing. Please download from https://github.com/IonDen/ion.rangeSlider and load the script and CSS in the HTML head section!"
				);
			}
		});
	},

	beforeDestroy() {
		if (this.slider) this.slider.destroy();
	}
};
</script>


<style lang="scss">
.vue-form-generator .field-rangeSlider .irs {
	width: 100%;
}
</style>
