<template lang="pug">
    q-checkbox(:id="getFieldID(schema)", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName" :value="value")
</template>

<script>
	import abstractField from "../../abstractField";
	
	export default {
		mixins: [ abstractField ]
	};
</script>

<style>
</style>