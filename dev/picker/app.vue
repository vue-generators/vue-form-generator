<template lang="html">
	<div class="wrapper">
		<div class="panel panel-default">
			<div class="panel-heading">Form</div>
			<div class="panel-body">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
			</div>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">Model</div>
			<div class="panel-body">
				<pre v-if="model">{{ model }}</pre>
			</div>
		</div>	
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
				
			},

			schema: {
				fields: [
					{
						type: "dateTimePicker",
						/*type: "input",
						inputType: "date",*/
						label: "DT",
						model: "dt",
						dateTimePickerOptions: {
							format: "YYYY-MM-DD HH:mm:ss"
						}
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

<style>
	.wrapper {
		width: 500px;
		margin: 0 auto;
	}
</style>