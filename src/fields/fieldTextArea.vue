<template lang="jade">
	textarea.form-control(v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :maxlength="schema.max", :minlength="schema.min", :placeholder="schema.placeholder", :readonly="schema.readonly", :rows="schema.rows || 2")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
	
</script>


<style lang="sass">
</style>
