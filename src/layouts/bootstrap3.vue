<template lang="pug">
div.vue-form-generator(v-if='schema != null')
	fieldset(v-if="schema.fields", :is='tag')
		template(v-for='field in fields')
			.form-group(v-if='fieldVisible(field)', :class='getFieldRowClasses(field)')
				label(v-if="fieldTypeHasLabel(field)", :for="getFieldID(field)")
					| {{ field.label }}
					span.help(v-if='field.help')
						i.icon
						.helpText(v-html='field.help')
				.field-wrap
					component(:is='getFieldType(field)', :disabled='fieldDisabled(field)', :model='model', :schema='field', :formOptions='options', @model-updated='modelUpdated', @validated="onFieldValidated")
					.buttons(v-if='buttonVisibility(field)')
						button(v-for='btn in field.buttons', @click='buttonClickHandler(btn, field, $event)', :class='btn.classes') {{ btn.label }}
				.hint(v-if='field.hint') {{ field.hint }}
				.errors.help-block(v-if='fieldErrors(field).length > 0')
					span(v-for='(error, index) in fieldErrors(field)', track-by='index') {{ error }}

	template(v-for='group in groups')
		fieldset
			legend(v-if='group.legend') {{ group.legend }}
			template(v-for='field in group.fields')
				.form-group(v-if='fieldVisible(field)', :class='getFieldRowClasses(field)')
					label(v-if="fieldTypeHasLabel(field)", :for="getFieldID(field)")
						| {{ field.label }}
						span.help(v-if='field.help')
							i.icon
							.helpText(v-html='field.help')
					.field-wrap
						component(:is='getFieldType(field)', :disabled='fieldDisabled(field)', :model='model', :schema='field', :formOptions='options',@model-updated='modelUpdated', @validated="onFieldValidated")
						.buttons(v-if='buttonVisibility(field)')
							button(v-for='btn in field.buttons', @click='buttonClickHandler(btn, field, $event)', :class='btn.classes') {{ btn.label }}
					.hint(v-if='field.hint') {{ field.hint }}
					.errors.help-block(v-if='fieldErrors(field).length > 0')
						span(v-for='(error, index) in fieldErrors(field)', track-by='index') {{ error }}
</template>

<script>
	// import Vue from "vue";
	import {each, isFunction, isNil, isArray, isString} from "lodash";
	import { slugifyFormID } from "../utils/schema";
	import abstractLayout from "./abstractLayout";

	export default {
		mixins: [abstractLayout ]


	};
</script>

<style lang="sass">

	$errorColor: #F00;

	.vue-form-generator {

		* {
			box-sizing: border-box;
		}

		.form-control {
			// Default Bootstrap .form-control style
			display: block;
				&:not([class*=" col-"]){
					width: 100%;
				}
			padding: 6px 12px;
			font-size: 14px;
			line-height: 1.42857143;
			color: #555;
			background-color: #fff;
			background-image: none;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
			transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;

		} // .form-control

		span.help {
			margin-left: 0.3em;
			position: relative;

			.icon {
				display: inline-block;
				width: 16px;
				height: 14px;
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA+UlEQVQ4ja3TS0oDQRAG4C8+lq7ceICICoLGK7iXuNBbeAMJuPVOIm7cqmDiIncIggg+cMZFaqCnZyYKWtB0df31V1VXdfNH6S2wD9CP8xT3KH8T9BiTcE7XBMOfyBcogvCFO9ziLWwFRosyV+QxthNsA9dJkEYlvazsQdi3sBv6Ol6TBLX+HWT3fcQZ3vGM5fBLk+ynAU41m1biCXvhs4OPBDuBpa6GxF0P8YAj3GA1d1qJfdoS4DOIcIm1DK9x8iaWeDF/SP3QU6zRROpjLDFLsFlibx1jJaMkSIGrWKntvItcyTBKzCcybsvc9ZmYz3kz9Ooz/b98A8yvW13B3ch6AAAAAElFTkSuQmCC');
				background-repeat: no-repeat;
				background-position: center center;

			} // .icon

			.helpText {
				background-color: #444;
				bottom: 30px;
				color: #fff;
				display: block;
				left: 0px;
				//margin-bottom: 15px;
				opacity: 0;
				padding: 20px;
				pointer-events: none;
				position: absolute;
				text-align: justify;
				width: 300px;
				//transform: translateY(10%);
				transition: all .25s ease-out;
				box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
				border-radius: 6px;

				a {
					font-weight: bold;
					text-decoration: underline;
				} // a

			} // .helpText

			/* This bridges the gap so you can mouse into the tooltip without it disappearing */
			.helpText:before {
				bottom: -20px;
				content: " ";
				display: block;
				height: 20px;
				left: 0;
				position: absolute;
				width: 100%;
			}

			&:hover .helpText {
				opacity: 1;
				pointer-events: auto;
				transform: translateY(0px);
			}

		} // span.help

		.field-wrap {
			display: flex;

			.buttons {
				white-space: nowrap;
				margin-left: 4px;
			}

			button, input[type=submit] {
				// Default Bootstrap button style
				display: inline-block;
				padding: 6px 12px;
				margin: 0px;
				font-size: 14px;
				font-weight: normal;
				line-height: 1.42857143;
				text-align: center;
				white-space: nowrap;
				vertical-align: middle;
				touch-action: manipulation;
				cursor: pointer;
				user-select: none;
				color: #333;
				background-color: #fff;
				border: 1px solid #ccc;
				border-radius: 4px;

				&:not(:last-child) {
					margin-right: 4px;
				}

				&:hover {
					color: #333;
					background-color: #e6e6e6;
					border-color: #adadad;
				}

				&:active {
					color: #333;
					background-color: #d4d4d4;
					border-color: #8c8c8c;
					outline: 0;
					box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
				}

				&:disabled {
					opacity: 0.6;
					cursor: not-allowed;
				}

			} // button, input[submit]

		} // .field-wrap

		.hint {
			font-style: italic;
			font-size: 0.8em;

		} // .hint

		.form-group {
			display: inline-block;
			vertical-align: top;
			width: 100%;
			// margin: 0.5rem 0.26rem;
			margin-bottom: 1rem;

			label {
				font-weight: 400;
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

				input:not([type="checkbox"]), textarea, select {
					border: 1px solid $errorColor;
					background-color: rgba($errorColor, 0.15);
				}

				.errors {
					color: $errorColor;
					font-size: 0.80em;
					span {
						display: block;
						background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVR4Xt2TMQoCQQxF3xdhu72MpZU3GU/meBFLOztPYrVWsQmEWSaMsIXgK8P8RyYkMjO2sAN+K9gTIAmDAlzoUzE7p4IFytvDCQWJKSStYB2efcAvqZFM0BcstMx5naSDYFzfLhh/4SmRM+6Agw/xIX0tKEDFufeDNRUc4XqLRz3qabVIf3BMHwl6Ktexn3nmAAAAAElFTkSuQmCC');
						background-repeat: no-repeat;
						padding-left: 17px;
							padding-top: 0px;
							margin-top: 0.2em;
							font-weight: 600;
					}

				} // .errors

			} // .error

		} // .form-group

	} // fieldset
</style>
