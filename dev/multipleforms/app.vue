<template lang="html">
	<form>
		<vue-form-generator :schema="section1" :model="model" :options="formOptions"></vue-form-generator>
		<vue-form-generator :schema="section2" :model="model" :options="formOptions"></vue-form-generator>
	</form>
</template>

<script>
import Vue from "vue";

export default {
	data () {
		return {
			model: {
				name: 'Brian Blessed',
				email: "brian@hawkman.mongo",
				pref_1: 'blah'
			},

			section1: {
			    groups:[{
                    legend: "Contact Details",
                    fields: [
                        {
                            type: "input",
                            inputType: "text",
                            label: "Name",
                            model: "name"
                        },
                        {
                            type: "input",
                            inputType: "email",
                            label: "Email",
                            model: "email"
                        }
                    ]
				},{
                    legend: "Other Details",
                    fields: [
                        {
                            type: "input",
                            inputType: "text",
                            label: "More",
                            model: "more"
                        },
                        {
                            type: "input",
                            inputType: "text",
                            label: "Things",
                            model: "things"
                        }
                    ]
                }]

			},

			section2: {
				fields: [
					{
						type: "input",
						inputType: "text",
						label: "Pref 1",
						model: "pref_1"
					}
				]
			},

			formOptions: {
				fieldIdPrefix: 'frm1_'
			}
		}
	},

	created() {
		window.app = this;
	}
}
</script>
