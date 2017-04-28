<template lang="jade">

	.checkbox-list(:disabled="disabled")
		p(v-if="!items") {{ schema.placeholder }}
		label(v-else v-for="item in items")
			input(type="checkbox", :checked="getItemIsChecked(item)", :disabled="disabled", @change="onChanged($event, item)")
			| {{ getItemName(item) }}

</template>

<script>
	import isObject from 'lodash/isObject';
	import isNil from 'lodash/isNil';
	import abstractField from "./abstractField";
	
	export default {
		mixins: [ abstractField ],

		data() {
			return {
				comboExpanded: false
			};
		},

		computed: {
			items() {
				let values = this.schema.values;
				if (typeof(values) == "function") {
					return values.apply(this, [this.model, this.schema]);
				} else
					return values;
			},

			selectedCount() {
				if (this.value)
					return this.value.length;

				return 0;
			}   
		},

		methods: {
			getItemID(item) {
				if (isObject(item) && item.id)
					return item.id;

				return item;
			},

			getItemName(item) {
				if (isObject(item) && item.name)
					return item.name;

				return item;
			},

			getItemIsChecked(item) {
				return (this.value && this.value.indexOf(this.getItemID(item)) != -1);
			},

			onChanged(event, item) {
				if (isNil(this.value))
					this.value = [];

				if (event.target.checked)
					this.value.push(this.getItemID(item));
				else {
					this.value.splice(this.value.indexOf(this.getItemID(item)), 1);
				}
			},

			onExpandCombo() {
				this.comboExpanded = !this.comboExpanded;				
			}
		}
	};
</script>


<style lang="sass">
	.checkbox-list {
		label {
			display: block;
			input[type="checkbox"]{
				margin-right: 10px;
			}
		}
	}
</style>
