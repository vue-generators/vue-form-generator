<template lang="jade">
	input(type="checkbox", :disabled="disabled", v-model="value")
</template>

<script>
	import abstractField from './abstractField';
	
	export default {
		mixins: [ abstractField ]
	}
</script>
