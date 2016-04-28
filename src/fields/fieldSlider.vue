<template lang="jade">
	input.form-control(type="text", number, v-model="value", :data-slider-value="value", :data-slider-min="schema.min", :data-slider-max="schema.max", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
	import abstractField from './abstractField';
	export default {
		mixins: [ abstractField ],


		watch: {
			model: function() {
				if ($.fn.slider)
					$(this.$el).slider("setValue", this.value);	
			}
		},

		ready() {
			if ($.fn.slider)
				$(this.$el).slider(this.schema.sliderOptions);
		}		
	}
</script>


<style lang="sass">
	.slider.slider-horizontal {
		width: 100% !important;
	}
</style>
