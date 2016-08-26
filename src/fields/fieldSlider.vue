<template lang="jade">
	input(type="text", :data-min="schema.min", :data-max="schema.max", :data-step="schema.step", :data-disable="disabled")
</template>

<script>
	/* global $ */
	import abstractField from "./abstractField";
	import { defaults, isArray } from "lodash";

	export default {
		mixins: [ abstractField ],

		data() {
			return {
				slider: null
			};
		},

		watch: {
			model: function() {
				if ($.fn.ionRangeSlider) {
					let valueFrom, valueTo;
					if (isArray(this.value)) {
						[ valueFrom, valueTo ] = this.value;
					} else
						valueFrom = this.value;

					if (this.slider) {
						this.slider.update({
							from: valueFrom,
							to: valueTo
						});	
					}
				}
			}
		},

		ready() {
			if ($.fn.ionRangeSlider) {
				let valueFrom, valueTo;
				if (isArray(this.value)) {
					[ valueFrom, valueTo ] = this.value;
				} else
					valueFrom = this.value;

				let self = this;
				$(this.$el).ionRangeSlider(defaults(this.schema.sliderOptions || {}, {
					type: "single",
					grid: true,
					hide_min_max: true,
					from: valueFrom,
					to: valueTo,
					onChange(slider) {
						if (self.slider.options.type == "double") {
							self.value = [ slider.from, slider.to ];
						} else {
							self.value = slider.from;
						}
					}
				}));
				this.slider = $(this.$el).data("ionRangeSlider");
			}
			else
				console.warn("ion.rangeSlider library is missing. Please download from https://github.com/IonDen/ion.rangeSlider and load the script and CSS in the HTML head section!");
		},

		beforeDestroy() {
			if (this.slider)
				this.slider.destroy();
		}	
	};
</script>


<style lang="sass">
	.vue-form-generator .field-slider .irs {
		width: 100%;
	}
</style>
