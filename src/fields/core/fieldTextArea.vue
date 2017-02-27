<template lang="pug">
	textarea.form-control(v-model="value", :disabled="disabled", :maxlength="schema.max", :minlength="schema.min", :placeholder="schema.placeholder", :readonly="schema.readonly", :rows="schema.rows || 2", :name="schema.inputName")
</template>

<script>
	import abstractField from "../abstractField";

	export default {
		mixins: [ abstractField ]
	};
	
</script>


<style lang="sass">
</style>
