<template>
	<div class="container">
		<h1>Grouping</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" tag="section"></vue-form-generator>
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
import mixinUtils from "../../mixins/utils.js";

export default {
	mixins: [mixinUtils],

	data() {
		return {
			model: {
				name: "Brian Blessed",
				email: "brian@hawkman.mongo",
				others: {
					more: "More",
					things: "Things"
				},
				single: "blah"
			},

			schema: {
				groups: [
					{
						legend: "Contact Details",
						fields: [
							{
								type: "input",
								model: "name",
								label: "Name",
								fieldOptions: {
									inputType: "text"
								}
							},
							{
								type: "input",
								model: "email",
								label: "Email",
								fieldOptions: {
									inputType: "email"
								}
							}
						]
					},
					{
						legend: "Other Details",
						fields: [
							{
								type: "input",
								model: "others.more",
								label: "More",
								fieldOptions: {
									inputType: "text"
								}
							},
							{
								type: "input",
								model: "others.things",
								label: "Things",
								fieldOptions: {
									inputType: "text"
								}
							}
						]
					}
				],
				fields: [
					{
						type: "input",
						model: "single",
						label: "Single field (without group)",
						fieldOptions: {
							inputType: "text"
						}
					}
				]
			},

			formOptions: {
				fieldIdPrefix: "frm1-"
			}
		};
	},

	created() {
		window.app = this;
	}
};
</script>

<style lang="scss">
@import "../../style.scss";
</style>
