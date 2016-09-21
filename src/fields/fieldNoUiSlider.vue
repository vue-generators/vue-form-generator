<template lang="jade">
	div.slider(:disabled="disabled")
</template>

<script>
	import abstractField from "./abstractField";
	import { isArray, defaults } from "lodash";

	export default {
		mixins: [abstractField],

		data() {
			return {
				slider: null
			};
		},

		watch: {
			model: function() {
				if (window.noUiSlider && this.slider && this.slider.noUiSlider) {
					this.slider.noUiSlider.set(this.value);
				}
			}
		},

		methods: {
			onChange(value) {
				if (isArray(value)) {
					// Array (range)
					this.value = [parseFloat(value[0]), parseFloat(value[1])];
				} else {
					// Single value
					this.value = parseFloat(value);
				}
			getStartValue(){
				if (this.value != null) {
					return this.value;
				}else{
					if (this.schema.noUiSliderOptions.double) {
						return [this.schema.min, this.schema.min];
					}else{
						return this.schema.min;
					}
				}
			}
		},

		ready() {
			if (window.noUiSlider) {
				this.slider = this.$el;
				window.noUiSlider.create(this.slider, defaults(this.schema.noUiSliderOptions || {}, {
					start: this.getStartValue(),
					range: {
						"min": this.schema.min,
						"max": this.schema.max
					}
				}));
				this.slider.noUiSlider.on("change", this.onChange.bind(this));
			} else {
				console.warn("noUiSlider is missing. Please download from https://github.com/leongersen/noUiSlider and load the script and CSS in the HTML head section!");
			}
		},

		beforeDestroy() {
			if (this.slider)
				this.slider.noUiSlider.off("change");
		}
	};
</script>

<style lang="sass">

	.vue-form-generator .field-noUiSlider {

		.field-wrap {
			display: block;
		}
		
	}

</style>
