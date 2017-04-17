<template lang="jade">
	select.selectpicker(v-model="value", :disabled="disabled", :multiple="schema.multiSelect", :title="schema.placeholder", data-width="100%", :name="schema.inputName")
		option(:disabled="schema.required", v-if="schema.multiSelect !== true", :value="null", :selected="value == undefined") {{ schema.selectOptions.noneSelectedText }}
		option(v-for="item in items", :value="getItemID(item)") {{ getItemName(item) }}
</template>

<script>
	/* global $ */
	import isObject from 'lodash/isObject';
	import abstractField from './abstractField';

	export default {
		mixins: [ abstractField ],

		computed: {
			items() {
				let values = this.schema.values;
				if (typeof(values) == "function") {
					var that = this;
					setTimeout(function() {
						$(that.$el).selectpicker("refresh");
					});
					return values.apply(this, [this.model, this.schema]);
				} else
					return values;
			}      
		},

		methods: {
			getItemID(item) {
				if (isObject(item) && item.hasOwnProperty('id'))
					return item.id;

				return item;
			},

			getItemName(item) {
				if (isObject(item) && item.hasOwnProperty('name'))
					return item.name;

				return item;
			}
		},

		watch: {
			model: function() {
				this.$nextTick(function () {
					if ($.fn.selectpicker) {
						$(this.$el).selectpicker("refresh");
					}
				})
			},
			value: function(value) {
				this.$nextTick(function () {
					$(this.$el).selectpicker("val", value);
				})
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
