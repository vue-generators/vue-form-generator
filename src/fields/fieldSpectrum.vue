<template lang="jade">
	input(type="text", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
	/* global $ */
	import abstractField from "./abstractField";
	import { defaults } from "lodash";
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
						this.value = color ? color.toString() : null;
					}
				}));
			else
				console.warn("Spectrum color library is missing. Please download from http://bgrins.github.io/spectrum/ and load the script and CSS in the HTML head section!");
		}

	};
</script>


<style lang="sass">
</style>
