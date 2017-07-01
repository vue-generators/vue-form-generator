<template lang="pug">
	select.selectpicker(v-model="value", :disabled="disabled", :multiple="schema.multiSelect", :title="schema.placeholder", data-width="100%", :name="schema.inputName")
		option(:disabled="schema.required", v-if="schema.multiSelect !== true", :value="null", :selected="value == undefined")
		option(v-for="item in items", :value="getItemValue(item)") {{ getItemName(item) }}
</template>

<script>
	/* global $ */
	import {isObject} from "lodash";
	import abstractField from "../abstractField";

	export default {
		mixins: [ abstractField ],

		computed: {
			items() {
				let values = this.schema.values;
				if (typeof(values) == "function") {
					return values.apply(this, [this.model, this.schema]);
				} else
					return values;
			}      
		},

		methods: {
			getItemValue(item) {
				if (isObject(item)){
					if (typeof this.schema["selectOptions"] !== "undefined" && typeof this.schema["selectOptions"]["value"] !== "undefined") {
						return item[this.schema.selectOptions.value];
					} else {
						// Use 'id' instead of 'value' cause of backward compatibility
						if (typeof item["id"] !== "undefined") {
							return item.id;
						} else {
							throw "`id` is not defined. If you want to use another key name, add a `value` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
						}
					}
				} else {
					return item;
				}
			},

			getItemName(item) {
				if (isObject(item)){
					if (typeof this.schema["selectOptions"] !== "undefined" && typeof this.schema["selectOptions"]["name"] !== "undefined") {
						return item[this.schema.selectOptions.name];
					} else {
						if (typeof item["name"] !== "undefined") {
							return item.name;
						} else {
							throw "`name` is not defined. If you want to use another key name, add a `name` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
						}
					}
				} else {
					return item;
				}
			}
		},

		watch: {
			model: function() {
				if ($.fn.selectpicker)
					$(this.$el).selectpicker("refresh");	
			}
		},

		mounted() {
			this.$nextTick(function () {
				if ($.fn.selectpicker) {
					$(this.$el).selectpicker("destroy").selectpicker(this.schema.selectOptions);
				} else {
					console.warn("Bootstrap-select library is missing. Please download from https://silviomoreto.github.io/bootstrap-select/ and load the script and CSS in the HTML head section!");
				}
			});

		},

		beforeDestroy() {
			if ($.fn.selectpicker) 
				$(this.$el).selectpicker("destroy");
		}
	};
</script>


<style lang="sass">
	.vue-form-generator .field-selectEx .bootstrap-select {
		.dropdown-menu li.selected .text{
			font-weight: bold;
		}
	}
</style>
