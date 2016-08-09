<template lang="jade">
	input(type="color", v-model="value", :disabled="disabled")
	span.helper {{ value }}
</template>

<script>
	import abstractField from "./abstractField";
	export default {
		mixins: [ abstractField ]
	};
</script>


<style lang="sass">
	.vue-form-generator .field-color .helper {
		margin-left: 0.3em;
	}
</style>
