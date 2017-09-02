<template lang="pug">
	component(:is="theme", :schema="schema", :model="model", :options="options", :multiple="multiple", :isNewModel="isNewModel", :tag="tag")
</template>

<script>
	// import Vue from "vue";
	import {each, isFunction, isNil, isArray, isString} from "lodash";
	import { slugifyFormID } from "./utils/schema";

	export default {
		props: {
			schema: Object,
			model: Object,
			theme: {
				type:String,
				default: "form-bootstrap3"
			},
			options: {
				type: Object,
				default()  {
					return {
						validateAfterLoad: false,
						validateAfterChanged: false,
						validationErrorClass: "error",
						validationSuccessClass: "",
					};
				}
			},
			multiple: {
				type: Boolean,
				default: false
			},
			isNewModel: {
				type: Boolean,
				default: false
			},
			tag: {
				type: String,
				default: "fieldset",
				validator: function (value) {
					return value.length > 0;
				}
			},
			errors: {
				type:Array
			}
		},

		data () {
			return {};
		}
	};

</script>

<style lang="sass">
</style>
