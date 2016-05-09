<template lang="jade">
	textarea.form-control(v-model="value", :rows="schema.rows || 2", :readonly="schema.readonly", :placeholder="schema.placeholder", :disabled="disabled", :maxlength="schema.max")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
	
</script>


<style lang="sass" scoped>
	textarea {
		width: 100%;
	}
</style>
