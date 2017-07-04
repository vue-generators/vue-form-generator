<template lang="pug">
.wrapper
	input.form-control(
		:id="getFieldID(schema)",
		:type="schema.inputType",
		:value="value",
		@input="value = $event.target.value",
		@change="onChange",
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
			onChange(event){
				if (this.schema.inputType === "file") {
					this.value = event.target.files;
				}
			},
			
			formatValueToField(value) {
				if (value != null) {
					let dt;
					switch(this.schema.inputType){
					case "date":
						dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DD");
					case "datetime":
						dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DD HH:mm:ss");
					case "datetime-local":
						dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DDTHH:mm:ss");
					}
				}
				
				return value;
			},

			formatValueToModel(value) {
				if (value != null) {
					let m;
					switch (this.schema.inputType){
					case "date":
						m = fecha.parse(value, "YYYY-MM-DD");
						if (m !== false) {
							if (this.schema.format)
								value = fecha.format(m, this.schema.format);
							else
								value = m.valueOf();
						}
						break;
					case "datetime":
						m = fecha.parse(value, "YYYY-MM-DD HH:mm:ss");
						if (m !== false) {
							if (this.schema.format)
								value = fecha.format(m, this.schema.format);
							else
								value = m.valueOf();
						}
						break;
					case "datetime-local":
						m = fecha.parse(value, "YYYY-MM-DDTHH:mm:ss");
						if (m !== false) {
							if (this.schema.format)
								value = fecha.format(m, this.schema.format);
							else
								value = m.valueOf();
						}
						break;
					case "number":
						return Number(value);					
					case "range":
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
