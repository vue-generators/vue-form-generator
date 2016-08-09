<template lang="jade">
	span {{ value }}
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
</script>

<style lang="sass">
	.vue-form-generator .field-label {
		display: block;
		width: 100%;
		margin-left: 12px;
	}
</style>
