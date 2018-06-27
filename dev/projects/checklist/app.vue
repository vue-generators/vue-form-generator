<template>
	<div class="container">
        <h1>Checklist</h1>
		<div class="row">
            <div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
            </div>
        </div>
		<div class="row">
            <div class="col-sm-12">
                <pre v-if="model" v-html="prettyModel"></pre>
            </div>
        </div>
	</div>
</template>

<script>
import { validators } from "../../../src";
import mixinUtils from "../../mixins/utils.js";

export default {
	mixins: [mixinUtils],

	data() {
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
						inputName: "skill",
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
		};
	},

	mounted() {
		this.$nextTick(function() {
			window.app = this;
		});
	}
};
</script>

<style lang="scss">
@import "../../style.scss";
</style>
