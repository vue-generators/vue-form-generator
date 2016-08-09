<template lang="jade">
	input.form-control(type="range", v-model="value", :min="schema.min", :max="schema.max", :disabled="disabled", :placeholder="schema.placeholder")
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
