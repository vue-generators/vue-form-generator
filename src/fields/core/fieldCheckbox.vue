<template lang="pug">
	input(type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName")
</template>

<script>
	import abstractField from "../abstractField";
	
	export default {
		mixins: [ abstractField ]
	};
</script>

<style lang="sass">
	.vue-form-generator .field-checkbox input {
		margin-left: 12px;
	}
</style>