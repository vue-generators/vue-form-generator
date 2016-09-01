<template lang="jade">
	input.form-control(type="password", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :readonly="schema.readonly")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
</script>

<style lang="sass">
</style>
