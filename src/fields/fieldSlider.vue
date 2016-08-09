<template lang="jade">
	input(type="text", :data-min="schema.min", :data-max="schema.max", :data-step="schema.step", :data-disable="disabled")
</template>

<script>
	import abstractField from "./abstractField";
	import { defaults, isArray } from "lodash";

	export default {
		mixins: [ abstractField ],

		watch: {
			model: function() {
				if ($.fn.ionRangeSlider) {
					let valueFrom, valueTo;
					if (isArray(this.value)) {
						[ valueFrom, valueTo ] = this.value;
					} else
						valueFrom = this.value;

					$(this.$el).data("ionRangeSlider").update({
						from: valueFrom,
						to: valueTo
					});	
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

				$(this.$el).ionRangeSlider(defaults(this.schema.sliderOptions || {}, {
					type: "single",
					grid: true,
					hide_min_max: true,
					from: valueFrom,
					to: valueTo,
					onChange: (slider) => {
						if (this.schema.sliderOptions.type == "double") {
							this.value = [ slider.from, slider.to ];
						} else {
							this.value = slider.from;
						}
					}
				}));
			}
			else
				console.warn("ion.rangeSlider library is missing. Please download from https://github.com/IonDen/ion.rangeSlider and load the script and CSS in the HTML head section!");
		}		
	};
</script>


<style lang="sass">
	.vue-form-generator .field-slider .irs {
		width: 100%;
	}
</style>
