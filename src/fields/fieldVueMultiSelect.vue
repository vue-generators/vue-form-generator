<template lang="jade">
    multiselect( :selected="selected", :options="options", @update="updateSelected" )
</template>
<script>
import { isObject } from "lodash";
import abstractField from "./abstractField";
import Multiselect from 'vue-multiselect';

export default {
	mixins: [abstractField],
	components: { Multiselect },
	computed: {
		options() {
			let values = this.schema.values;
			if (typeof(values) == "function") {
				return values.apply(this, [this.model, this.schema]);
			} else
			return values;
		}
	},

	methods: {
		updateSelected (newSelected) {
			console.log(newSelected, this.selected)
			this.selected = newSelected
		}
	}
};
</script>
