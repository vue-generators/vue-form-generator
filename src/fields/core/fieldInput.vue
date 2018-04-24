<template lang="pug">
.wrapper
	input.form-control(
		:id="getFieldID(schema)",
		:type="schema.inputType.toLowerCase()",
		:value="value",
		@input="onInput",
		@blur="onBlur",
		:class="schema.fieldClasses",
		@change="schema.onChange || null",
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
		:minlength="schema.minlength",
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
	span.helper(v-if="schema.inputType.toLowerCase() === 'color' || schema.inputType.toLowerCase() === 'range'") {{ value }}
</template>

<script>
import abstractField from "../abstractField";
import { debounce, get as objGet, isFunction, isNumber } from "lodash";
import fecha from "fecha";

const DATETIME_FORMATS = {
	"date": "YYYY-MM-DD",
	"datetime": "YYYY-MM-DD HH:mm:ss",
	"datetime-local": "YYYY-MM-DDTHH:mm:ss",
};

export default {
	mixins: [abstractField],
	methods: {
		formatValueToModel(value) {
			if (value != null) {
				switch (this.schema.inputType.toLowerCase()) {
					case "date":
					case "datetime":
					case "datetime-local":
					case "number":
					case "range":
						// debounce
						return (newValue, oldValue) => {
							this.debouncedFormatFunc(value, oldValue);
						};
				}
			}

			return value;
		},
		formatDatetimeToModel(newValue, oldValue) {
			let defaultFormat = DATETIME_FORMATS[this.schema.inputType.toLowerCase()];
			let m = fecha.parse(newValue, defaultFormat);
			if (m !== false) {
				if (this.schema.format) {
					newValue = fecha.format(m, this.schema.format);
				} else {
					newValue = m.valueOf();
				}
			}
			this.updateModelValue(newValue, oldValue);
		},
		formatNumberToModel(newValue, oldValue) {
			if(!isNumber(newValue)) {
				newValue = NaN;
			}
			this.updateModelValue(newValue, oldValue);
		},
		onInput($event) {
			let value = $event.target.value;
			switch(this.schema.inputType.toLowerCase()) {
				case "number":
				case "range":
					if(isNumber($event.target.valueAsNumber)) {
						value = $event.target.valueAsNumber;
					}
					break;
			}
			this.value = value;
		},
		onBlur() {
			if(isFunction(this.debouncedFormatFunc)) {
				this.debouncedFormatFunc.flush();
			}
		}
	},

	mounted () {
		switch(this.schema.inputType.toLowerCase()) {
			case "number":
			case "range":
				this.debouncedFormatFunc = debounce((newValue, oldValue) => {
					this.formatNumberToModel(newValue, oldValue);
				}, parseInt(objGet(this.schema, "debounceFormatTimeout", 1000)), {
					trailing: true,
					leading: false
				});
				break;
			case "date":
			case "datetime":
			case "datetime-local":
				// wait 1s before calling 'formatDatetimeToModel' to allow user to input data
				this.debouncedFormatFunc = debounce((newValue, oldValue) => {
					this.formatDatetimeToModel(newValue, oldValue);
				}, parseInt(objGet(this.schema, "debounceFormatTimeout", 1000)), {
					trailing: true,
					leading: false
				});
				break;
		}
	},

	created () {
		if(this.schema.inputType.toLowerCase() == "file") {
			console.warn("The 'file' type in input field is deprecated. Use 'file' field instead.");
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
