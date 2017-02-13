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
				skills: ["Javascript", "VueJS"]
			},

			schema: {
				fields: [
					{
						type: "vueMultiSelect",
						multiSelect: true,
						label: "Skills",
						model: "skills",
						values: ["Javascript", "VueJS", "CSS3", "HTML5"]
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