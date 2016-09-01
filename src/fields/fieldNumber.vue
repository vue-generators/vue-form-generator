<template lang="jade">
	input.form-control(type="number", v-model="value", number, :autocomplete="schema.autocomplete", :disabled="disabled", :max="schema.max", :min="schema.min", :readonly="schema.readonly")
</template>

<script>
	import abstractField from "./abstractField";
	export default {
		mixins: [ abstractField ]
	};
</script>


<style lang="sass">
</style>
