<template lang="pug">
.wrapper
	input.form-control(
		id="ts01",
		type="file",
		:name="schema.inputName",
		@change="schema.onChange || null",	
		:accept="schema.accept",
		:multiple="schema.multiple",
		:placeholder="schema.placeholder",
		:readonly="schema.readonly",
		:required="schema.required",
		:disabled="disabled",)
</template>

<script>
import abstractField from "../abstractField";
import fecha from "fecha";

export default {
	mixins: [abstractField]
};

</script>

<style lang="sass">
	.vue-form-generator .field-input {
		.wrapper {
			width: 100%;
		}
		input[type="radio"] {
			width: 100%;
		}
		input[type="color"] {
			width: 60px;
		}
		input[type="range"] {
			padding: 0;
		}

		.helper {
			margin: auto 0.5em;
		}
	}
</style>
