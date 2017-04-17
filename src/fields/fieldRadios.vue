<template lang="jade">

	.radio-list(:disabled="disabled")
		label(v-for="item in items")
			input(type="radio", :disabled="disabled", :name="id", @click="onSelection(item)", :value="getItemValue(item)", :checked="isItemChecked(item)" )
			| {{ getItemName(item) }}

</template>

<script>
	import isObject from 'lodash/isObject';
	import abstractField from './abstractField';
	
	export default {
		mixins: [ abstractField ],

		computed: {
			items() {
				let values = this.schema.values;
				if (typeof(values) == "function") {
					return values.apply(this, [this.model, this.schema]);
				} else {
					return values;
				}
			},
			id(){
				return this.schema.model;
			}
		},

		methods: {
			onSelection(item) {
				if (isObject(item) && item.hasOwnProperty('id')){
					this.value = item['id'];
				} else {
					this.value = item;
				}
			},
			getItemValue(item) {
				if (isObject(item) && item.hasOwnProperty('id')){
					return item['id'];
				}
				return item;
			},
			getItemName(item) {
				if (isObject(item) && item.hasOwnProperty('name')){
					return item['name'];
				}
				return item;
			},
			isItemChecked(item) {
				let currentValue;
				if (isObject(item) && item.hasOwnProperty('id')){
					currentValue = item['id'];
				} else{
					currentValue = item;
				}
				return (currentValue === this.value);
			},
		}
	};
</script>

<style lang="sass">
	.vue-form-generator .field-radios {

		.radio-list {
			label {
				display: block;
				input[type="radio"]{
					margin-right: 10px;
				}
			}
		}

	}
</style>
