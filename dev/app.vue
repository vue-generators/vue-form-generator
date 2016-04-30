<template lang="jade">
		.row
			.col-md-10.col-md-offset-1
				data-table(:rows="rows", :selected="selected", :select="selectRow")

		.row(v-show="model")
			.col-md-6
				.buttons.text-center
					button.btn.btn-default.new(@click="newModel") New
					button.btn.btn-primary.save(@click="saveModel") 
						| Save
						i.fa.fa-warning(v-if="showWarning()")
					button.btn.btn-danger.delete(@click="deleteModel") Delete

				.errors.text-center
					div.alert.alert-danger(v-for="item in validationErrors") {{ item.field.label}}: 
						strong {{ item.error }}

				vue-form-generator(:schema='schema', :model='model', :options='formOptions', :multiple="selected.length > 1", v-ref:form, :is-new-model="isNewModel")


			.col-md-6
				pre(v-if='model') {{{ model | prettyJSON }}}   

</template>

<script>
	import Vue from "vue";
	import VueFormGenerator from "../src";
	import DataTable from "./dataTable.vue";

	import Schema from "./schema";
	import { users } from "./data";
	import { filters } from "./utils";

	import {each, isFunction, cloneDeep, merge} from 'lodash';	

	export default {
		components: {
			"VueFormGenerator": VueFormGenerator.component,
			DataTable
		},

		filters: filters,

		data() {
			return {
				isNewModel: false, 

				selected: [],

				model: null,

				rows: users,

				schema: Schema,

				formOptions: {
					validateAfterLoad: true,
					validateAfterChanged: false,
					validateBeforeSave: true
				}
			}
		},

		computed: {
			validationErrors() {
				if (this.$refs.form && this.$refs.form.errors) 
					return this.$refs.form.errors;

				return [];
			}
		},

		methods: {
			showWarning() { 
				if (this.$refs.form && this.$refs.form.errors) {
					return this.$refs.form.errors.length > 0 
				}
			},

			selectRow(event, row, add) {
				this.isNewModel = false;
				if ( (add || (event && event.ctrlKey))) {
					if (this.selected.indexOf(row) != -1)
						this.selected.$remove(row);
					else
						this.selected.push(row);
				} else {
					this.clearSelection();
					this.selected.push(row);
				}
				this.generateModel();
			},

			clearSelection() {
				this.selected.splice(0);
				this.generateModel();
			},			

			generateModel() {
				if (this.selected.length == 1) {
					this.model = cloneDeep(this.selected[0]);
				}
				else if (this.selected.length > 1) {
					this.model = VueFormGenerator.schema.mergeMultiObjectFields(Schema, this.selected);
				}
				else
					this.model = null;				
			},

			newModel() {
				console.log("Create new model...");
				this.selected.splice(0);
				let newRow = VueFormGenerator.schema.createDefaultObject(Schema, { id: this.getNextID() })
				this.isNewModel = true;
				this.model = newRow;

				let el = document.querySelector("div.form input:nth-child(1):not([readonly]):not(:disabled)");
				if (el)
					el.focus()

			},			

			saveModel() {
				console.log("Save model...");
				if (this.formOptions.validateBeforeSave === false ||  this.validate()) {
					this.mergeModelValues();

					if (this.isNewModel) {
						this.rows.push(this.model);
						this.selectRow(null, this.model, false);
					}

				} else {
					// Validation error
				}
			},

			mergeModelValues() {
				let model = this.model;
				if (model && this.selected.length > 0) {
					each(this.selected, (row) => {
						merge(row, model);
					});
				}
			},

			deleteModel() {
				if (this.selected.length > 0) {
					each(this.selected, (row) => {
						this.rows.$remove(row);
					})
					this.clearSelection();
				}
			},

			getNextID() {
				let id = 0;

				each(this.rows, (row) => {
					if (row.id > id)
						id = row.id;
				});

				return ++id;
			},

			validate()	{
				return this.$refs.form.validate();
			}

			 
		},
		
		ready() {
			window.app = this;
		}
	}

	window.Vue = require('vue');
</script>

<style lang="sass">
	@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700|Open+Sans+Condensed:300&subset=latin,latin-ext);

	html {
		font-family: "Open Sans";
				font-size: 14px;
	}

	* {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	pre {
		overflow: auto;
		
		.string { color: #885800; }
		.number { color: blue; }
		.boolean { color: magenta; }
		.null { color: red; }
		.key { color: green; }    	
	} 

	.buttons {
		button {
			margin: 0.2em 0.3em;
			padding: 6px 20px;
			position: relative;
		}

		i.fa.fa-warning {
			position: absolute;
			top: 0px;
			right: 0px;
			color: Orange;			
		}
	}

</style>