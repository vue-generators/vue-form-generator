<template lang="jade">
	label(v-if="schema.value") {{ schema.value }}
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
</script>

<style lang="sass">
	.vue-form-generator .field-label span {
		display: block;
		width: 100%;
		text-align: center;
	}
</style>
