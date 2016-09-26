<template lang="jade">
	.wrapper
		input.form-control(type="range", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :max="schema.max", :min="schema.min", :name="schema.inputName")
		.helpText {{ value }}
</template>

<script>
	import abstractField from "./abstractField";
	export default {
		mixins: [ abstractField ]
	};
</script>


<style lang="sass">
	.vue-form-generator .field-range {
		input {
			width: 100%;
		}

		.helpText {
			margin: auto 0.5em;
		}
	}
</style>
