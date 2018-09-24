<template lang="pug">
.wrapper(v-attributes="'wrapper'")
	input.form-control(
		:id="fieldID",
		type="file",
		:name="inputName",
		@change="onChange",
		:accept="fieldOptions.accept",
		:multiple="fieldOptions.multiple",
		:placeholder="placeholder",
		:readonly="readonly",
		:required="schema.required",
		:disabled="disabled",
		v-attributes="'input'")
</template>

<script>
import abstractField from "../abstractField";
import { isFunction } from "lodash";

export default {
	mixins: [abstractField],
	methods: {
		onChange($event) {
			if (isFunction(this.schema.onChanged)) {
				// Schema has defined onChange method.
				this.schema.onChanged.call(this, this.model, this.schema, $event, this);
			}
		}
	}
};
</script>

<style lang="scss">
.vue-form-generator .field-input {
	.wrapper {
		width: 100%;
	}
	.helper {
		margin: auto 0.5em;
	}
}
</style>
