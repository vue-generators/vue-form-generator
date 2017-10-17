<template lang="pug">
	.wrapper
		.add
			button(@click='add') Add
		div(v-for='(row, index) in value')
			vue-form-generator(:schema='schema.schema', :model='value[index]', :options='formOptions')
			button.delete(@click='delete(index)') Delete
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],
	methods: {
		add() {
			this.value.push({});
		},
		delete(i) {
			this.value.splice(i, 1);
		}
	}
};

</script>

<style lang="sass" scoped>
.wrapper {
	width: 100%;
}

.add {
	width: 100%;
	text-align: right;
	margin-bottom: 20px;
}
</style>
