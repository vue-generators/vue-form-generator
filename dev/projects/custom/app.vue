<template>
	<div class="container">
		<h1>Custom label, help, hint and errors (with grouping)</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" tag="section">

					<template slot="label" slot-scope="{ field }">
						<h1>Custom label : {{ field.label }}</h1>
					</template>

					<template slot="help" slot-scope="{ field }">
						<span v-if='field.help' class="help">
							<span @click.prevent="testClick(field.help, $event)">Custom help</span>
							<i class="icon"></i>
						</span>
					</template>

					<template slot="hint" slot-scope="{ field, getValueFromOption }">
						<span>Custom hint</span>
						<div class="hint" v-html="getValueFromOption(field, 'hint', undefined)"></div>
					</template>

					<template slot="errors" slot-scope="{ errors, field, getValueFromOption }">
						<span>Custom errors</span>
						<table class="errors help-block">
							<tbody>
								<tr>
									<td v-for="(error, index) in errors" :key="index" v-html="error"></td>
								</tr>
							</tbody>
						</table>
					</template>

				</vue-form-generator>
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
				single: "blah",
				subname: ""
			},

			schema: {
				fields: [
					{
						type: "group",
						legend: "Contact Details",
						tag: "div",
						fields: [
							{
								type: "input",
								model: "name",
								label: "Name",
								fieldOptions: {
									inputType: "text"
								},
								required: true,
								validator: ["required"]
							},
							{
								type: "group",
								legend: "Subgroup",
								styleClasses: "subgroup",
								tag: "fieldset",
								fields: [
									{
										type: "input",
										model: "subname",
										label: "Name",
										fieldOptions: {
											inputType: "text"
										},
										required: true,
										validator: ["required"]
									}
								]
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
						type: "input",
						model: "single",
						label: "Single field (without group)",
						fieldOptions: {
							inputType: "text"
						},
						required: true,
						validator: ["string"]
					},
					{
						type: "group",
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
				]
			},

			formOptions: {
				validateAfterLoad: true,
				validateAfterChanged: true,
				fieldIdPrefix: "frm1-"
			}
		};
	},

	methods: {
		testClick(helpText, event) {
			console.log(helpText, event);
		}
	},

	created() {
		window.app = this;
	}
};
</script>

<style lang="scss">
@import "../../style.scss";
.field-group {
	border: 2px solid #bbb;
	padding: 8px;
	border-radius: 4px;
}
.subgroup {
	border-color: goldenrod;
	legend {
		color: #00268d;
	}
}
</style>
