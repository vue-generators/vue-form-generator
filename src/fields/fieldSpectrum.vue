<template lang="jade">
	input(type="text", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
	import abstractField from './abstractField';
	import { defaults } from 'lodash';
	export default {
		mixins: [ abstractField ],

		watch: { 
			model() {
				if ($.fn.spectrum) {
					$(this.$el).spectrum("set", this.value);
				}
			}
		},

		ready() {
			if ($.fn.spectrum)
				$(this.$el).spectrum("destroy").spectrum(defaults(this.schema.colorOptions || {}, {
					showInput: true,
					showAlpha: true,
					disabled: this.schema.disabled,
					allowEmpty: !this.schema.required,
					preferredFormat: "hex",
					change: (color) => {
						this.value = color ? color.toString() : null

					}
				}));
		}
	}
</script>


<style lang="sass" scoped>
</style>
