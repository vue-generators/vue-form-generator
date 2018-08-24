<template>
	<div class="form-group" :class="getFieldRowClasses(field)">
		<label v-if="fieldTypeHasLabel(field)" :for="getFieldID(field)" :class="field.labelClasses">
			<span v-html="field.label"></span>
			<span v-if='field.help' class="help">
				<i class="icon"></i>
				<div class="helpText" v-html='field.help'></div>
			</span>
		</label>

		<div class="field-wrap">
			<component ref="child" :is="getFieldType(field)" :model="model" :schema="field" :formOptions="options"></component>
			<div v-if="buttonVisibility(field)" class="buttons">
				<button v-for="(btn, index) in field.buttons" @click="buttonClickHandler(btn, field, $event)" :class="btn.classes" :key="index" v-text="btn.label"></button>
			</div>
		</div>

		<div v-if="field.hint" class="hint" v-html="getValueFromOption(field, 'hint', undefined)"></div>

		<div v-if="fieldErrors().length > 0" class="errors help-block">
			<span v-for="(error, index) in fieldErrors()" :key="index" v-html="error"></span>
		</div>
	</div>
</template>
<script>
import { get as objGet, isNil } from "lodash";
import { slugifyFormID } from "./utils/schema";
import formMixin from "./formMixin.js";
import fieldComponents from "./utils/fieldsLoader.js";
// import { eventBus } from "./event-bus.js";

export default {
	name: "form-group",
	components: fieldComponents,
	mixins: [formMixin],
	props: {
		model: Object,
		options: {
			type: Object
		},
		field: {
			type: Object,
			required: true
		},
		errors: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		// Should field type have a label?
		fieldTypeHasLabel(field) {
			if (isNil(field.label)) return false;

			let relevantType = "";
			if (field.type === "input" && typeof this.getValueFromOption(field, "fieldOptions") !== "undefined") {
				relevantType = this.getValueFromOption(field, "fieldOptions").inputType;
			} else {
				relevantType = field.type;
			}

			switch (relevantType) {
				case "button":
				case "submit":
				case "reset":
					return false;
				default:
					return true;
			}
		},
		getFieldID(schema) {
			const idPrefix = objGet(this.options, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix);
		},
		// Get type of field 'field-xxx'. It'll be the name of HTML element
		getFieldType(fieldSchema) {
			return "field-" + fieldSchema.type;
		},
		// Child field executed validation
		// onFieldValidated(res, errors, field) {
		// 	this.$emit("validated", res, errors, field);
		// 	// eventBus.$emit("validated", res, errors, field);
		// },
		buttonVisibility(field) {
			return field.buttons && field.buttons.length > 0;
		},
		buttonClickHandler(btn, field, event) {
			return btn.onclick.call(this, this.model, field, event, this);
		}
	}
};
</script>
<style lang="scss">
$errorColor: #f00;

.form-group {
	display: inline-block;
	vertical-align: top;
	width: 100%;
	// margin: 0.5rem 0.26rem;
	margin-bottom: 1rem;

	label {
		font-weight: 400;
		& > :first-child {
			display: inline-block;
		}
	}

	&.featured {
		> label {
			font-weight: bold;
		}
	}

	&.required {
		> label:after {
			content: "*";
			font-weight: normal;
			color: Red;
			// position: absolute;
			padding-left: 0.2em;
			font-size: 1em;
		}
	}

	&.disabled {
		> label {
			color: #666;
			font-style: italic;
		}
	}

	&.error {
		input:not([type="checkbox"]),
		textarea,
		select {
			border: 1px solid $errorColor;
			background-color: rgba($errorColor, 0.15);
		}

		.errors {
			color: $errorColor;
			font-size: 0.8em;
			span {
				display: block;
				background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVR4Xt2TMQoCQQxF3xdhu72MpZU3GU/meBFLOztPYrVWsQmEWSaMsIXgK8P8RyYkMjO2sAN+K9gTIAmDAlzoUzE7p4IFytvDCQWJKSStYB2efcAvqZFM0BcstMx5naSDYFzfLhh/4SmRM+6Agw/xIX0tKEDFufeDNRUc4XqLRz3qabVIf3BMHwl6Ktexn3nmAAAAAElFTkSuQmCC");
				background-repeat: no-repeat;
				padding-left: 17px;
				padding-top: 0px;
				margin-top: 0.2em;
				font-weight: 600;
			}
		}
	}
}
</style>
