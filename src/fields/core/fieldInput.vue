<template lang="pug">
.wrapper
	input.form-control(
		:type="schema.inputType", 
		:value="value",
		@input="value = $event.target.value",
		:disabled="disabled",
		:accept="schema.accept",
		:alt="schema.alt",
		:autocomplete="schema.autocomplete",
		:checked="schema.checked",
		:dirname="schema.dirname",
		:formaction="schema.formaction",
		:formenctype="schema.formenctype",
		:formmethod="schema.formmethod",
		:formnovalidate="schema.formnovalidate",
		:formtarget="schema.formtarget",
		:height="schema.height",
		:list="schema.list",
		:max="schema.max",
		:maxlength="schema.maxlength",
		:min="schema.min",
		:multiple="schema.multiple",
		:name="schema.inputName",
		:pattern="schema.pattern",
		:placeholder="schema.placeholder",
		:readonly="schema.readonly",
		:required="schema.required",
		:size="schema.size",
		:src="schema.src",
		:step="schema.step",
		:width="schema.width",
		:files="schema.files")
	span.helper(v-if="schema.inputType === 'color' || schema.inputType === 'range'") {{ value }}
</template>

<script>
	import abstractField from "../abstractField";
	import fecha from "fecha";

	export default {
		mixins: [ abstractField ],
		methods: {
			formatValueToField(value) {
				if (value != null) {
					switch(this.schema.inputType){
					case "date":
						return fecha.format(value, "YYYY-MM-DD");
					case "datetime":
						return fecha.format(value, "YYYY-MM-DD HH:mm:ss");
					case "datetime-local":
						return fecha.format(value, "YYYY-MM-DDTHH:mm:ss");
					}
				}
				
				return value;
			},
			formatValueToModel(value) {
				if (value != null) {
					switch (this.schema.inputType){
					case "date":
						return fecha.parse(value, "YYYY-MM-DD");
					case "datetime":
						return fecha.parse(value, "YYYY-MM-DD HH:mm:ss");
					case "datetime-local":
						return fecha.parse(value, "YYYY-MM-DDTHH:mm:ss");
					case "number":
						return Number(value);
					}
				}
				
				return value;
			}
		}
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
