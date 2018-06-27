<template>
	<div class="container">
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<data-table :rows="rows" :selected="selected" :select="selectRow"></data-table>
			</div>
		</div>
		<div v-show="model" class="row">
			<div class="col-md-5 col-md-offset-1">
				<div class="control-buttons text-center">
					<button @click="newModel" class="btn btn-default new">
						<i class="fa fa-plus"></i>New</button>
					<button @click="saveModel" class="btn btn-primary save">
						<i class="fa fa-floppy-o"></i>Save
						<i v-if="showWarning()" class="fa fa-warning"></i>
					</button>
					<button @click="deleteModel" class="btn btn-danger delete">
						<i class="fa fa-trash"></i>Delete</button>
				</div>
				<div class="errors text-center">
					<div v-for="(item, index) in validationErrors" :key="index" class="alert alert-danger">{{ item.field.label}}:
						<strong>{{ item.error }}</strong>
					</div>
				</div>
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" :multiple="selected.length > 1" ref="form" :is-new-model="isNewModel" @model-updated="modelUpdated" @validated="onValidated"></vue-form-generator>
			</div>
			<div class="col-md-6">
				<pre v-if="model" v-html="prettyModel"></pre>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "../../../src";
import DataTable from "./dataTable.vue";
import Fakerator from "fakerator";

import Schema from "./schema";
import { users } from "./data";
import mixinUtils from "../../mixins/utils.js";

import Multiselect from "vue-multiselect";
Vue.component("multiselect", Multiselect);

// Test custom field
import FieldAwesome from "./fieldAwesome.vue";
Vue.component("fieldAwesome", FieldAwesome);

import { each, cloneDeep, merge } from "lodash";

Vue.use(VueFormGenerator);

let fakerator = new Fakerator();

export default {
	components: {
		DataTable
	},

	mixins: [mixinUtils],

	data() {
		return {
			isNewModel: false,

			selected: [],

			model: null,

			rows: users,

			schema: Schema,

			formOptions: {
				validateAfterLoad: true,
				validateAfterChanged: true,
				validateBeforeSave: true
			}
		};
	},

	computed: {
		validationErrors() {
			if (this.$refs.form && this.$refs.form.errors) return this.$refs.form.errors;

			return [];
		}
	},

	methods: {
		showWarning() {
			if (this.$refs.form && this.$refs.form.errors) {
				return this.$refs.form.errors.length > 0;
			}
		},

		selectRow(event, row, add) {
			this.isNewModel = false;
			if (add || (event && event.ctrlKey)) {
				if (this.selected.indexOf(row) !== -1) {
					let index = this.selected.indexOf(row);
					this.selected.splice(index, 1);
				} else {
					this.selected.push(row);
				}
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

		onValidated(res, errors) {
			console.log("VFG validated:", res, errors);
		},

		generateModel() {
			if (this.selected.length === 1) {
				this.model = cloneDeep(this.selected[0]);
			} else if (this.selected.length > 1) {
				this.model = VueFormGenerator.schema.mergeMultiObjectFields(Schema, this.selected);
			} else {
				this.model = null;
			}
		},

		newModel() {
			console.log("Create new model...");
			this.selected.splice(0);
			console.log("VueFormGenerator.schema", VueFormGenerator);

			let newRow = VueFormGenerator.schema.createDefaultObject(Schema, { id: this.getNextID() });
			this.isNewModel = true;
			this.model = newRow;

			let el = document.querySelector("div.form input:nth-child(1):not([readonly]):not(:disabled)");
			if (el) el.focus();
		},

		saveModel() {
			console.log("Save model...");
			if (this.formOptions.validateBeforeSave === false || this.validate()) {
				this.mergeModelValues();

				if (this.isNewModel) {
					this.rows.push(this.model);
					this.selectRow(null, this.model, false);
				}
			} else {
				console.warn("Error saving model...");
				// Validation error
			}
		},

		mergeModelValues() {
			let model = this.model;
			if (model && this.selected.length > 0) {
				each(this.selected, row => {
					merge(row, model);
				});
			}
		},

		deleteModel() {
			if (this.selected.length > 0) {
				each(this.selected, row => {
					let index = this.rows.indexOf(row);
					this.rows.splice(index, 1);
				});
				this.clearSelection();
			}
		},

		getNextID() {
			let id = 0;

			each(this.rows, row => {
				if (row.id > id) id = row.id;
			});

			return ++id;
		},

		validate() {
			// console.log("validate", this.$refs.form, this.$refs.form.validate());
			return this.$refs.form.validate();
		},

		modelUpdated(newVal, schema) {
			console.log("main model has updated", newVal, schema);
		},

		getLocation(model) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(pos => {
					if (!model.address) model.address = {};
					if (!model.address.geo) model.address.geo = {};
					model.address.geo.latitude = pos.coords.latitude.toFixed(5);
					model.address.geo.longitude = pos.coords.longitude.toFixed(5);
				});
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		}
	},

	mounted() {
		this.$nextTick(function() {
			window.app = this;

			if (users.length > 0) {
				this.selectRow(null, fakerator.random.arrayElement(users));
			}

			// Localize validate errors
			// VueFormGenerator.validators.resources.fieldIsRequired = "Ezt a mezőt kötelező kitölteni!";
			// VueFormGenerator.validators.resources.textTooSmall = "A szöveg túl rövid! Jelenleg: {0}, minimum: {1}";
		});
	}
};

window.Vue = require("vue").default;
</script>

<style lang="scss">
@import "../../style.scss";
</style>
