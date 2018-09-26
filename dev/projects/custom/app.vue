<template>
	<div class="container">
		<h1>Custom label, help, hint and errors (with grouping)</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" tag="section">

					<template slot="label" slot-scope="{ field, getValueFromOption }">
						<h3><i :class="`fa fa-${getIcon(field, getValueFromOption)}`"></i> {{ field.label }}</h3>
					</template>

					<template slot="help" slot-scope="{ field }">
						<span v-if='field.help' class="help">
							<span @click.prevent="testClick(field.help, $event)">Need help</span>
							<i class="fa fa-question"></i>
							<vue-markdown class="helpText" :source="field.help"></vue-markdown>
						</span>
					</template>

					<template slot="hint" slot-scope="{ field, getValueFromOption }">
						<div class="hint hint--info">
							<i class="fa fa-info-circle"></i>
							<span v-html="getValueFromOption(field, 'hint', undefined)"></span>
						</div>
					</template>

					<template slot="errors" slot-scope="{ errors, field, getValueFromOption }">
						<span>Custom errors</span>
						<table class="errors help-block">
							<tbody>
								<thead>
									<tr>
										<th scope="col" id="">Index</th>
										<th scope="col" id="">Error</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(error, index) in errors" :key="index">
										<td>{{index}}</td>
										<td v-html="error"></td>
									</tr>
								</tbody>
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
/* eslint no-console: 0 */
import mixinUtils from "../../mixins/utils.js";
import VueMarkdown from "vue-markdown";

export default {
	mixins: [mixinUtils],
	components: {
		VueMarkdown
	},
	data() {
		return {
			model: {
				name: "Brian Blessed",
				email: "brian@hawkman.mongo",
				others: {
					more: "",
					things: 2
				},
				single: "blah",
				color: ""
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
										model: "color",
										label: "Some color",
										fieldOptions: {
											inputType: "color"
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
								hint: "We will not share your email with third-party",
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
								help: `
Welcome to this *custom help*

	some code example


You need a modern browser to fill this field in the best condition.
* test1
* test2

https://google.com/

# Markdown !
								`,
								fieldOptions: {
									inputType: "date"
								}
							},
							{
								type: "input",
								model: "others.things",
								label: "Things",
								fieldOptions: {
									inputType: "number"
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
		},
		getIcon(field, getValueFromOption) {
			let fieldType = getValueFromOption(field, "type");
			let fieldOptions = getValueFromOption(field, "fieldOptions");
			let icons = {
				email: "at",
				number: "calculator",
				date: "calendar-alt",
				color: "palette"
			};
			if (fieldType === "input" && typeof icons[fieldOptions.inputType] !== "undefined") {
				return icons[fieldOptions.inputType];
			} else {
				return "file-alt";
			}
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
.hint {
	&--info {
		color: #339af0;
	}
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}
thead th {
	background-color: #efdddd;
	border: solid 1px #eedddd;
	color: #6b3333;
	padding: 10px;
	text-align: left;
	text-shadow: 1px 1px 1px #fff;
}
tbody td {
	border: solid 1px #eedddd;
	color: #333;
	padding: 10px;
	text-shadow: 1px 1px 1px #fff;
}
</style>
