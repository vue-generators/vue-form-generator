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
						styleClasses: "grid-horizontal",
						fields: [
							{
								type: "input",
								inputType: "text",
								label: "Effective Date or Tenor",
								model: "effective_date",
								required: true
							},
							{
								type: "input",
								inputType: "text",
								label: "Maturity Date or Tenor",
								model: "maturity_date",
								required: true
							},
							{
								type: "select",
								label: "Direction",
								values: ["Buy", "Sell"],
								required: true,
								model: "direction"
							},
							{
								type: "input",
								inputType: "text",
								label: "Currency",
								model: "currency",
								required: true
							},
							{
								type: "input",
								inputType: "number",
								label: "Notional",
								model: "notional",
								required: true
							},
							{
								type: "input",
								inputType: "number",
								label: "Rate",
								model: "rate",
								step: "0.001"
							}
						]
					},
					{
						advance: true,
						legend: "Advanced",
						foldable: true,
						styleClasses: "advance",

						groups: [
							{
								legend: "Fixed Leg",
								styleClasses: ["leg", "leg-fixed"],
								fields: [
									{
										type: "input",
										inputType: "text",
										label: "Paiement frequency",
										model: "paiement_frequency"
									},
									{
										type: "input",
										inputType: "text",
										label: "Day count",
										model: "day_count"
									}
								]
							},
							{
								legend: "Floating Leg",
								styleClasses: ["leg", "leg-float"],
								fields: [
									{
										type: "input",
										inputType: "text",
										label: "Reset frequency",
										model: "reset_frequency"
									},
									{
										type: "input",
										inputType: "text",
										label: "Paiement frequency",
										model: "paiement_frequency"
									},
									{
										type: "input",
										inputType: "text",
										label: "Day count",
										model: "day_count"
									}
								]
							}
						]
					}
				]
				// groups: [
				// 	{
				// 		legend: "Contact Details (not advance)",
				// 		id: "SomeID",
				// 		styleClasses: ";lkdsfjhg",
				// 		fields: [
				// 			{
				// 				type: "input",
				// 				inputType: "text",
				// 				label: "Name",
				// 				model: "name"
				// 			},
				// 			{
				// 				type: "input",
				// 				inputType: "email",
				// 				label: "Email",
				// 				model: "email"
				// 			}
				// 		]
				// 	},
				// 	{
				// 		legend: "Other Details",
				// 		foldable: true,
				// 		fields: [
				// 			{
				// 				type: "input",
				// 				inputType: "text",
				// 				label: "More",
				// 				model: "others.more"
				// 			},
				// 			{
				// 				type: "input",
				// 				inputType: "text",
				// 				label: "Things",
				// 				model: "others.things"
				// 			}
				// 		]
				// 	},
				// 	{
				// 		legend: "Empty Other Details",
				// 		foldable: true,
				// 		fields: [
				// 			{
				// 				type: "input",
				// 				inputType: "text",
				// 				label: "More",
				// 				model: "emptyother.more"
				// 			},
				// 			{
				// 				type: "input",
				// 				inputType: "text",
				// 				label: "Things",
				// 				model: "emptyother.things"
				// 			}
				// 		],
				// 		groups: [
				// 			{
				// 				legend: "wwww wwwww Details",
				// 				foldable: true,
				// 				fields: [
				// 					{
				// 						type: "input",
				// 						inputType: "text",
				// 						label: "More",
				// 						model: "wwww.more"
				// 					},
				// 					{
				// 						type: "input",
				// 						inputType: "text",
				// 						label: "Things",
				// 						model: "www.things"
				// 					}
				// 				],
				// 				groups: [
				// 					{
				// 						legend: "wwww wwwww Details",
				// 						foldable: true,
				// 						fields: [
				// 							{
				// 								type: "input",
				// 								inputType: "text",
				// 								label: "More",
				// 								model: "wwww.more"
				// 							},
				// 							{
				// 								type: "input",
				// 								inputType: "text",
				// 								label: "Things",
				// 								model: "www.things"
				// 							}
				// 						]
				// 					}
				// 				]
				// 			}
				// 		]
				// 	}
				// ],
				// fields: [
				// 	{
				// 		type: "input",
				// 		inputType: "text",
				// 		label: "Single field (without group)",
				// 		model: "single"
				// 	}
				// ]
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
