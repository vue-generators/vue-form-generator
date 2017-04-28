<template lang="jade">
	label(v-if="schema.value || value") {{ schema.value || value }}
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],
	};
</script>

<style lang="sass">
	.vue-form-generator .field-label span {
		display: block;
		width: 100%;
		text-align: center;
	}
</style>
