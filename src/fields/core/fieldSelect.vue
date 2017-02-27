<template lang="pug">
	select.form-control(v-model="value", :disabled="disabled", :name="schema.inputName")
		option(:disabled="schema.required", :value="null", :selected="value == undefined") {{ selectOptions.noneSelectedText || "&lt;Nothing selected&gt;" }}
		option(v-for="item in items", :value="getItemID(item)") {{ getItemName(item) }}
</template>

<script>
	import {isObject} from "lodash";
	import abstractField from "../abstractField";
	
	export default {
		mixins: [ abstractField ],

		computed: {
			selectOptions() {
				return this.schema.selectOptions || {};
			},

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
		}
	};
</script>


<style lang="sass">
</style>
