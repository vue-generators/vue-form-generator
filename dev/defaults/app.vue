<template lang="html">
	<div>
		<vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
	</div>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect"
Vue.component("multiselect", Multiselect);

export default {
	data () {
		return {
			model: {
				skills: ["Javascript", "VueJS"],
				first_name: "Brian Blessed"
			},

			schema: {
				fields: [
					{
						label: "First Name"
					}
				]
			},

			formOptions: {}
		}
	},

	created() {
		window.app = this;
	}
}
</script>
