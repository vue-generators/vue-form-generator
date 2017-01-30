<template lang="html">
	<div>
		<vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
	</div>
</template>

<script>
import Multiselect from "vue-multiselect"
window.VueMultiselect = Multiselect

export default {
	components: { 
		Multiselect 
	},

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