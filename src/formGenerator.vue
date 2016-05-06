<template lang="jade">
	table(v-if="schema != null")
		thead
		tbody
			tr(v-for="field in fields", v-if="fieldVisible(field)", :class="getFieldRowClasses(field)")
				td
					span.help(v-if="field.help")
						i.fa.fa-question-circle
						.helpText {{{field.help}}}
					| {{ field.label }}
				td
					.field-wrap
						component(:is="getFieldType(field)", :disabled="fieldDisabled(field)", :model.sync="model", :schema.sync="field")
						.buttons(v-if="field.buttons && field.buttons.length > 0")
							button.btn.btn-default(v-for="btn in field.buttons", @click="btn.onclick(model, field)", :class="btn.classes") {{ btn.label }}
					.hint(v-if="field.hint") {{ field.hint }}
					.errors(v-if="field.errors && field.errors.length > 0")
						span(v-for="error in field.errors") {{ error }}
</template>

<script>
	import Vue from "vue";
	//import Joi from "joi";
	import {each, isFunction, isNil, isArray, isString} from "lodash";

	// Load all fields from '../fields' folder
	let Fields = require.context("./fields/", false, /^\.\/field([\w-_]+)\.vue$/);
	let fieldComponents = {};
	each(Fields.keys(), (key) => {
		let compName = Vue.util.classify(key.replace(/^\.\//, "").replace(/\.vue/, ""));
		fieldComponents[compName] = Fields(key);
	});


	export default {
		components: fieldComponents,
		
		props: [
			"schema",
			"options",
			"model",
			"multiple",
			"isNewModel"
		],
		
		data () {
			return {
				errors: [] // Validation errors
			};
		},

		computed: {
			fields() {
				let res = [];
				if (this.schema) {
					each(this.schema.fields, (field) => {
						if (!this.multiple || field.multi === true)
							res.push(field);
					});
				}

				return res;
			}
		},

		watch: {
			// new model loaded
			model: function() {
				if (this.options.validateAfterLoad === true && !this.isNewModel)
					this.validate();
				else
					this.clearValidationErrors();
			}
		},

		ready() {
			// First load
			if (this.options && this.options.validateAfterLoad === true && !this.isNewModel)
				this.validate();
			else
				this.clearValidationErrors();
		},
	
		methods: {
			getFieldRowClasses(field) {
				let baseClasses = {
					error: field.errors && field.errors.length > 0, 
					disabled: this.fieldDisabled(field), 
					readonly: field.readonly, 
					featured: field.featured, 
					required: field.required
				};

				if (isArray(field.styleClasses)) {
					each(field.styleClasses, (c) => baseClasses[c] = true);
				}
				else if (isString(field.styleClasses)) {
					baseClasses[field.styleClasses] = true;
				}

				return baseClasses;
			},

			getFieldType(fieldSchema) {
				return "field-" + fieldSchema.type;
			},

			fieldDisabled(field) {
				if (isFunction(field.disabled))
					return field.disabled(this.model);

				if (isNil(field.disabled))
					return false;

				return field.disabled;
			},

			fieldVisible(field) {
				if (isFunction(field.visible))
					return field.visible(this.model);

				if (isNil(field.visible))
					return true;

				return field.visible;
			},		

			validate() {
				this.clearValidationErrors();

				each(this.$children, (child) => {
					if (isFunction(child.validate))
					{
						let err = child.validate();
						each(err, (err) => {
							this.errors.push({
								field: child.schema,
								error: err
							});
						});
					}
				});

				return this.errors.length == 0;
			},

			clearValidationErrors() {
				this.errors.splice(0);

				each(this.$children, (child) => {
					child.clearValidationErrors();
				});				
			}
		}
	};
	
</script>

<style lang="sass" scoped>
	
	$errorColor: lighten(#F00, 0%);

	table {
		width: 70%;
		min-width: 350px;
		margin: auto;
		
		input, select, textarea {
			border-radius: 4px;
			border: 1px solid #BBB;
			padding: 2px 5px;
		}
		
		td {
			padding: 0.3em 0.4em;
			
			&:nth-child(1) {
				text-align: right;
				vertical-align: top;
				padding: 0.8em 0.5em;

				span.help {
					margin-right: 0.3em;
					position: relative;

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
						}
					}

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

					/* CSS Triangles - see Trevor's post */
					/*.helpText:after {
						border-left: solid transparent 10px;
						border-right: solid transparent 10px;
						border-top: solid #1496bb 10px;
						bottom: -10px;
						content: " ";
						height: 0;
						left: 50%;
						margin-left: -13px;
						position: absolute;
						width: 0;
					}*/
						
					&:hover .helpText {
						opacity: 1;
						pointer-events: auto;
						transform: translateY(0px);
					}					
				}
			} // nth-child(1)

			&:nth-child(2) {	

				> .field-wrap {
					display: flex;

					.buttons {
						white-space: nowrap;
						button {
							display: inline-block;
							margin: 0 2px;
						}
					}
				}		

				.hint {
					font-style: italic;
					font-size: 0.8em;
				}

				.errors {

				}

			} // nth-child(2)

		} // td

		tr.featured {
			td:nth-child(1) {
				font-weight: bold;
			}			
		}

		tr.required {
			td:nth-child(1):after {
				content: "*";
				font-weight: normal;
				color: Red;
				padding-left: 0.1em;
				font-size: 0.8em;
				position: absolute;
				margin-top: -0.4em;
			}	
		}


		tr.disabled {
			td:nth-child(1) {
				color: #666;
				font-style: italic;
			}			
		}

		tr.company {
			/* csak teszt */
			background-color: #EEE;

		}

		tr.error {

			td:nth-child(1) {
				//color: $errorColor;
			}			

			td:nth-child(2) {
				input:not([type="checkbox"]), textarea, select {
					border: 1px solid $errorColor;
					background-color: rgba($errorColor, 0.15);
				}
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


		} // tr.error

	} // table
</style>