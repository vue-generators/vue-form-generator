<template lang="pug">
	.wrapper
		button.add(@click='add') Add
		div(v-for='(row, index) in value')
			vue-form-generator(:schema='schema.schema', :model='value[index]', :options='formOptions')
			button(@click='remove(index)') Delete
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],
	methods: {
		add() {
			this.value.push({});
		},
		remove(i) {
			this.value.splice(i, 1);
		}
	}
};

</script>

<style lang="sass">
.add {
	float: right;
}
</style>
