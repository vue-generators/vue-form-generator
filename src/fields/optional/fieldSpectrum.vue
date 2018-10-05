<template>
	<input type="text"
		:autocomplete="fieldOptions.autocomplete"
		:disabled="disabled"
		:placeholder="placeholder"
		:readonly="readonly"
		:name="inputName"
		:id="fieldID" >
</template>

<script>
/* global $ */
import abstractField from "../abstractField";
import { defaults } from "lodash";
export default {
	name: "field-spectrum",
	mixins: [abstractField],

	data() {
		return {
			picker: null
		};
	},

	watch: {
		model() {
			if (window.$ && window.$.fn.spectrum) {
				this.picker.spectrum("set", this.value);
			}
		},

		disabled(val) {
			if (val) this.picker.spectrum("disable");
			else this.picker.spectrum("enable");
		}
	},

	mounted() {
		this.$nextTick(function() {
			if (window.$ && window.$.fn.spectrum) {
				this.picker = $(this.$el)
					.spectrum("destroy")
					.spectrum(
						defaults(this.fieldOptions, {
							showInput: true,
							showAlpha: true,
							disabled: this.schema.disabled,
							allowEmpty: !this.schema.required,
							preferredFormat: "hex",
							change: (color) => {
								this.value = color ? color.toString() : null;
							}
						})
					);
				this.picker.spectrum("set", this.value);
			} else {
				console.warn(
					"Spectrum color library is missing. Please download from http://bgrins.github.io/spectrum/ and load the script and CSS in the HTML head section!"
				);
			}
		});
	},

	beforeDestroy() {
		if (this.picker) this.picker.spectrum("destroy");
	}
};
</script>
