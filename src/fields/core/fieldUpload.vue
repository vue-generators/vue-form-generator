<template lang="pug">
.wrapper
	input.form-control(
		id="getFieldID(schema)",
		type="file",
		:name="schema.inputName",
		@change="onChange",
		:accept="schema.accept",
		:multiple="schema.multiple",
		:placeholder="schema.placeholder",
		:readonly="schema.readonly",
		:required="schema.required",
		:disabled="disabled",)
</template>

<script>
import abstractField from "../abstractField";
import { isFunction } from "lodash";

export default {
	mixins: [abstractField],
	methods: {
		onChange(){
			if(isFunction(this.schema.onChanged)){
				// Schema has defined onChange method.
				this.schema.onChanged.call(this, this.model, this.schema, event, this);
			}
		}
	}
};

</script>

<style lang="sass">
	.vue-form-generator .field-input {
		.wrapper {
			width: 100%;
		}
		.helper {
			margin: auto 0.5em;
		}
	}
</style>
