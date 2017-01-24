<template lang="jade">
	div.input-wrapper(v-if="schema.title" class="clearfix")
		input(type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName")
		a(v-if="schema.href", :href="schema.href") {{ schema.title }}
		span(v-else) {{ schema.title }}
	input(v-else type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName")
</template>

<script>
	import abstractField from "./abstractField";
	
	export default {
		mixins: [ abstractField ]
	};
</script>

<style lang="sass">
	.vue-form-generator .field-checkbox {
	    a, span {
		    margin: 0 1rem;
	    }
	}
</style>