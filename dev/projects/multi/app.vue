<template>
	<div class="container">
		<h1>Multi</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="form1" :is-new-model="isNewModel" @model-updated="modelUpdated1" @validated="onValidated1"></vue-form-generator>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema2" :model="model" :options="formOptions" ref="form2" :is-new-model="isNewModel" @model-updated="modelUpdated2" @validated="onValidated2"></vue-form-generator>
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

export default {
	mixins: [mixinUtils],

	data() {
		return {
			isNewModel: false,

			selected: [],

			model: {
				first_name: "David",
				last_name: "Higgins",
				status: true
			},

			schema: {
				fields: [
					{
						type: "input",
						model: "first_name",
						label: "First Name",
						fieldOptions: {
							inputType: "text"
						},
						required: true,
						validator: ["string"],
						attributes: {
							input: {
								"data-toggle": "tooltip"
							},
							wrapper: {
								"data-target": "input"
							}
						}
					},
					{
						type: "input",
						label: "Color",
						model: "color",
						fieldOptions: {
							inputType: "color"
						},
						attributes: {
							input: {
								"data-target": "tooltip"
							}
						}
					}
				]
			},

			schema2: {
				fields: [
					{
						type: "checkbox",
						label: "Active",
						model: "status",
						required: true,
						validator: ["required"],
						attributes: {
							input: {
								"data-toggle": "tooltip"
							}
						}
					},
					{
						type: "input",
						model: "last_name",
						label: "Last Name",
						fieldOptions: {
							inputType: "text"
						},
						required: true,
						validator: ["string"]
					},
					{
						type: "submit",
						attributes: {
							input: {
								"data-target": "toggle"
							}
						},
						fieldOptions: {
							buttonText: "Change Previous Type",
							onSubmit: () => {
								// this.schema.fields[1].type = "input";
								if (this.schema.fields[1].fieldOptions.inputType === "color") {
									this.schema.fields[1].fieldOptions.inputType = "text";
								} else {
									this.schema.fields[1].fieldOptions.inputType = "color";
								}
							}
						}
					}
				]
			},

			formOptions: {
				validateAfterLoad: true,
				validateAfterChanged: true
			}
		};
	},

	methods: {
		onValidated1(res, errors) {
			console.log("VFG 1 validated:", res, errors);
		},
		onValidated2(res, errors) {
			console.log("VFG 2 validated:", res, errors);
		},

		modelUpdated1(newVal, schema) {
			console.log("main model has updated (from 1)", newVal, schema);
		},
		modelUpdated2(newVal, schema) {
			console.log("main model has updated (from 2)", newVal, schema);
		}
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
