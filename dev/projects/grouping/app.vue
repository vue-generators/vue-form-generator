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
				name: "",
				email: "brian@hawkman.mongo",
				others: {
					more: "More",
					things: "Things"
				},
				emptyother: {},
				single: "blah"
			},
			schema: {
				groups: [
					{
						legend: "Contact Details (not advance)",
						id: "SomeID",
						styleClasses: ";lkdsfjhg",
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
					},
					{
						legend: "Other Details",
						foldable: true,
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
					},
					{
						legend: "Empty Other Details",
						foldable: true,
						fields: [
							{
								type: "input",
								inputType: "text",
								label: "More",
								model: "emptyother.more"
							},
							{
								type: "input",
								inputType: "text",
								label: "Things",
								model: "emptyother.things"
							}
						],
						groups: [
							{
								legend: "wwww wwwww Details",
								foldable: true,
								fields: [
									{
										type: "input",
										inputType: "text",
										label: "More",
										model: "wwww.more"
									},
									{
										type: "input",
										inputType: "text",
										label: "Things",
										model: "www.things"
									}
								],
								groups: [
									{
										legend: "wwww wwwww Details",
										foldable: true,
										fields: [
											{
												type: "input",
												inputType: "text",
												label: "More",
												model: "wwww.more"
											},
											{
												type: "input",
												inputType: "text",
												label: "Things",
												model: "www.things"
											}
										]
									}
								]
							}
						]
					}
				],
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
