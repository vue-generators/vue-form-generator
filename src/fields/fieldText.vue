<template lang="jade">
	input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :maxlength="schema.max", :placeholder="schema.placeholder", :readonly="schema.readonly")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
	
</script>

<style lang="sass">
</style>
