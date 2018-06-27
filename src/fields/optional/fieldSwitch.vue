<template lang="pug">
	label
		input(type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName", :id="getFieldID(schema)")
		span.label(:data-on="schema.textOn || 'On'", :data-off="schema.textOff || 'Off'", :for="getFieldID(schema)")
		span.handle
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],

	methods: {
		formatValueToField(value) {
			if (value != null && this.schema.valueOn) return value === this.schema.valueOn;

			return value;
		},

		formatValueToModel(value) {
			if (value != null && this.schema.valueOn) {
				if (value) return this.schema.valueOn;
				else return this.schema.valueOff;
			}

			return value;
		}
	}
};
</script>

<style lang="scss">
$field-switch-width: 120px;
$field-switch-height: 30px;

.vue-form-generator .field-switch {
	.field-wrap label {
		position: relative;
		display: block;
		width: $field-switch-width;
		height: $field-switch-height;
		padding: 0;
		margin: 0 10px 10px 0;
		border-radius: $field-switch-height / 2;
		box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);
		cursor: pointer;
	}
	input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
	.label {
		position: relative;
		display: block;
		height: inherit;
		font-size: 10px;
		text-transform: uppercase;
		background: #eceeef;
		border-radius: inherit;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
	}
	.label:before,
	.label:after {
		position: absolute;
		top: 50%;
		margin-top: -0.5em;
		line-height: 1;
		-webkit-transition: inherit;
		-moz-transition: inherit;
		-o-transition: inherit;
		transition: inherit;
	}
	.label:before {
		content: attr(data-off);
		right: 11px;
		color: #aaaaaa;
		text-shadow: 0 1px rgba(255, 255, 255, 0.5);
	}
	.label:after {
		content: attr(data-on);
		left: 11px;
		color: #ffffff;
		text-shadow: 0 1px rgba(0, 0, 0, 0.2);
		opacity: 0;
	}
	input:checked ~ .label {
		background: #e1b42b;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);
	}
	input:checked ~ .label:before {
		opacity: 0;
	}
	input:checked ~ .label:after {
		opacity: 1;
	}

	.handle {
		position: absolute;
		top: 1px;
		left: 1px;
		width: $field-switch-height - 2px;
		height: $field-switch-height - 2px;
		background: linear-gradient(to bottom, #ffffff 40%, #f0f0f0);
		background-image: -webkit-linear-gradient(top, #ffffff 40%, #f0f0f0);
		border-radius: 100%;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
	}
	.handle:before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -6px 0 0 -6px;
		width: 12px;
		height: 12px;
		background: linear-gradient(to bottom, #eeeeee, #ffffff);
		background-image: -webkit-linear-gradient(top, #eeeeee, #ffffff);
		border-radius: 6px;
		box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
	}
	input:checked ~ .handle {
		left: $field-switch-width - ($field-switch-height - 1px);
		left: calc(100% - (#{$field-switch-height} - 1px));
		box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
	}

	/* Transition
		========================== */
	.label,
	.handle {
		transition: all 0.3s ease;
	}
}
</style>
