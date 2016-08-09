<template lang="jade">
	label
		input(type="checkbox", v-model="value", :disabled="disabled")
		span.label(:data-on="schema.textOn || 'On'", :data-off="schema.textOff || 'Off'")
		span.handle
</template>

<script>
	import abstractField from "./abstractField";
	
	export default {
		mixins: [ abstractField ],

		methods: {
			
			formatValueToField(value) {
				if (value != null && this.schema.valueOn)
					return value == this.schema.valueOn;

				return value;
			},

			formatValueToModel(value) {
				if (value != null && this.schema.valueOn) {
					if (value)
						return this.schema.valueOn;
					else
						return this.schema.valueOff;
				}

				return value;
			}		
		}
	};
</script>

<style lang="sass">

$field-switch-width: 120px;

.vue-form-generator .field-switch { 
	.field-wrap label {
		position: relative;
		display: block;
		vertical-align: top;
		width: $field-switch-width;
		height: 30px;
		padding: 3px;
		margin: 0 10px 10px 0;
		background: linear-gradient(to bottom, #eeeeee, #FFFFFF 25px);
		background-image: -webkit-linear-gradient(top, #eeeeee, #FFFFFF 25px);
		border-radius: 18px;
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
	.label:before, .label:after {
		position: absolute;
		top: 50%;
		margin-top: -.5em;
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
		color: #FFFFFF;
		text-shadow: 0 1px rgba(0, 0, 0, 0.2);
		opacity: 0;
	}
	input:checked ~ .label {
		background: #E1B42B;
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
		top: 4px;
		left: 4px;
		width: 28px;
		height: 28px;
		background: linear-gradient(to bottom, #FFFFFF 40%, #f0f0f0);
		background-image: -webkit-linear-gradient(top, #FFFFFF 40%, #f0f0f0);
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
		background: linear-gradient(to bottom, #eeeeee, #FFFFFF);
		background-image: -webkit-linear-gradient(top, #eeeeee, #FFFFFF);
		border-radius: 6px;
		box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
	}
	input:checked ~ .handle {
		left: $width - 26px;
		box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
	}
	 
	/* Transition
	========================== */
	.label, .handle {
		transition: all 0.3s ease;
	}
}
</style>