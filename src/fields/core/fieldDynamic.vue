<template>
	<div class="wrapper">
		<button @click="add" class="add">Add</button>
		<div v-for="(row, index) in value">
			<vue-form-generator :schema="schema.schema" :model="value[index]" :options="formOptions"></vue-form-generator>
			<button @click="remove(index)">Delete</button>
		</div>
	</div>
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
