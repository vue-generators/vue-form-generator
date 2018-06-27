<template>
	<div class="container">
		<h1>Basic</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="form" :is-new-model="isNewModel" @model-updated="modelUpdated" @validated="onValidated"></vue-form-generator>
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
						inputType: "text",
						label: "First Name",
						model: "first_name",
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
						type: "checkbox",
						label: "Active",
						model: "status",
						attributes: {
							input: {
								"data-toggle": "tooltip"
							}
						}
					},
					{
						type: "input",
						inputType: "color",
						label: "Color",
						model: "color",
						attributes: {
							input: {
								"data-target": "tooltip"
							}
						}
					},
					{
						type: "submit",
						buttonText: "Change Previous Type",
						attributes: {
							input: {
								"data-target": "toggle"
							}
						},
						onSubmit: () => {
							// this.schema.fields[2].type = "input";
							if (this.schema.fields[2].inputType === "color") {
								this.schema.fields[2].inputType = "text";
							} else {
								this.schema.fields[2].inputType = "color";
							}
						}
					}
				]
			},

			formOptions: {
				validateAfterLoad: true,
				validateAfterChanged: true,
				validateBeforeSave: true
			}
		};
	},

	methods: {
		showWarning() {
			if (this.$refs.form && this.$refs.form.errors) {
				return this.$refs.form.errors.length > 0;
			}
		},

		onValidated(res, errors) {
			console.log("VFG validated:", res, errors);
		},

		modelUpdated(newVal, schema) {
			console.log("main model has updated", newVal, schema);
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
