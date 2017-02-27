<template lang="pug">
	.radio-list(:disabled="disabled")
		label(v-for="item in items")
			input(type="radio", :disabled="disabled", :name="id", @click="onSelection(item)", :value="getItemValue(item)", :checked="isItemChecked(item)" )
			| {{ getItemName(item) }}

</template>

<script>
	import {isObject} from "lodash";
	import abstractField from "../abstractField";
	
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
				if (isObject(item) && this.schema.radiosOptions.value && item[this.schema.radiosOptions.value]){
					this.value = item[this.schema.radiosOptions.value];
				} else{
					this.value = item;
				}
			},
			getItemValue(item) {
				if (isObject(item) && this.schema.radiosOptions.value && item[this.schema.radiosOptions.value]){
					return item[this.schema.radiosOptions.value];
				}

				return item;
			},
			getItemName(item) {
				if (isObject(item) && this.schema.radiosOptions.name && item[this.schema.radiosOptions.name]){
					return item[this.schema.radiosOptions.name];
				}

				return item;
			},
			isItemChecked(item) {
				let currentValue;
				if (isObject(item) && this.schema.radiosOptions.value && item[this.schema.radiosOptions.value]){
					currentValue = item[this.schema.radiosOptions.value];
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
					margin-right: 5px;
				}
			}
		}

	}
</style>
