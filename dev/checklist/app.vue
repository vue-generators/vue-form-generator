<template lang="html">
	<div>
		<vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
		<pre><code>{{ model }}</code></pre>
	</div>
</template>

<script>
import Vue from "vue";
import { validators } from "../../src";

export default {
	data () {
		return {
			model: {
				skills: ["Javascript", "VueJS"]
			},

			schema: {
				fields: [
					{
						type: "checklist",
						label: "Skills",
						model: "skills",
						required: true,
						inputName:"skill",
						min: 2,
						listBox: true,
						values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"],
						validator: validators.array,
						onChanged(model) {
							console.log("skills changed to", model.skills);
						},
						onValidated(model, errors) {
							console.log("skills validated:", errors);
						}
					}
				]
			},

			formOptions: {
				validateAfterChanged: true
			}
		}
	},

	created() {
		window.app = this;
	}
}
</script>