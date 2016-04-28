<template lang="jade">
	select.selectpicker(v-model="value", :disabled="disabled", :multiple="schema.multiSelect",  :title="schema.placeholder", data-width="100%")
		option(v-for="item in items", :value="getItemID(item)") {{ getItemName(item) }}
</template>

<script>
	import {isObject} from "lodash";
	import abstractField from './abstractField';

	export default {
		mixins: [ abstractField ],

		computed: {
			items() {
				let values = this.schema.values;
				if (typeof(values) == "function") {
					return values.apply(this, [this.model, this.schema]);
				} else
					return values;
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
			}
		},

		watch: {
			model: function() {
				if ($.fn.selectpicker)
					$(this.$el).selectpicker("refresh");	
				else
					console.warn("selectpicker is not loaded!");
			}
		},

		ready() {
			if ($.fn.selectpicker)
				$(this.$el).selectpicker("destroy").selectpicker(this.schema.selectOptions);
			else
				console.warn("selectpicker is not loaded!");
		}
	}
</script>


<style lang="sass">
	.bootstrap-select {
		.dropdown-menu li.selected .text{
			font-weight: bold;
		}
	}
</style>
