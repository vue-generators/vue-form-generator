<template lang="jade">
	input(type="checkbox", v-model="value", :readonly="schema.readonly", :disabled="disabled")
</template>

<script>
	import abstractField from "./abstractField";
	
	export default {
		mixins: [ abstractField ]
	};
</script>
