<template lang="jade">
	input(type="color", v-model="value", :disabled="disabled", :placeholder="schema.placeholder")
	span.helper {{ value }}
</template>

<script>
	import abstractField from "./abstractField";
	export default {
		mixins: [ abstractField ]
	};
</script>


<style lang="sass" scoped>
	span {
		margin-left: 0.3em;
	}
</style>
