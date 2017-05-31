<template lang="html">
	<form>
		<vue-form-generator :schema="schema" :model="model" :options="formOptions" tag="section"></vue-form-generator>
		<pre>{{ model }}</pre>
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
				others: {
					more: "More",
					things: "Things"
				},
				single: 'blah'
			},

			schema: {
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
                            model: "others.more"
                        },
                        {
                            type: "input",
                            inputType: "text",
                            label: "Things",
                            model: "others.things"
                        }
                    ]
                }],
				fields: [
					{
						type: "input",
						inputType: "text",
						label: "Single field (without group)",
						model: "single"
					}
				]
			},

			formOptions: {
				fieldIdPrefix: 'frm1-'
			}
		}
	},

	created() {
		window.app = this;
	}
}
</script>
