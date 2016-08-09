<template lang="jade">
	input(type="checkbox", v-model="value", :disabled="disabled")
</template>

<script>
	import abstractField from "./abstractField";
	
	export default {
		mixins: [ abstractField ]
	};
</script>

<style lang="sass">
	.vue-form-generator .field-checkbox {
		margin-left: 12px;
	}
</style>