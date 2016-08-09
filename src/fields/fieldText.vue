<template lang="jade">
	input.form-control(type="text", v-model="value", :maxlength="schema.max", :readonly="schema.readonly", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
	
</script>

<style lang="sass">
</style>
