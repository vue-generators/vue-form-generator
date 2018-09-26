<template>
	<fieldset v-if="fields" :is="tag" :class="[groupRowClasses, validationClass]" ref="group">

		<legend v-if="groupLegend">{{ groupLegend }}</legend>
		<template v-for="(field, index) in fields">
			<template v-if="fieldVisible(field)">
				<template v-if="field.type === 'group'">
					<form-group :fields="field.fields" :group="field" :tag="getGroupTag(field)" :model="model" :options="options" :errors="errors" :eventBus="eventBus" :key="index">
						<template slot="element" slot-scope="slotProps">
							<slot name="element" :field="slotProps.field" :model="slotProps.model" :options="slotProps.options" :errors="slotProps.errors" :eventBus="slotProps.eventBus"></slot>
						</template>
					</form-group>
				</template>
				<template v-else>
					<slot name="element" :field="field" :model="model" :options="options" :errors="errors" :eventBus="eventBus"></slot>
				</template>
			</template>
		</template>
	</fieldset>
</template>
<script>
import formMixin from "./formMixin.js";
import { get as objGet, isFunction, isNil } from "lodash";

export default {
	name: "form-group",
	mixins: [formMixin],
	props: {
		fields: { type: Array },
		group: { type: Object },
		tag: {
			type: String,
			default: "fieldset",
			validator(value) {
				return value.length > 0;
			}
		},

		model: {
			type: Object
		},
		options: {
			type: Object
		},
		errors: {
			type: Array
		},
		eventBus: {
			type: Object
		}
	},
	data() {
		return {
			validationClass: {}
		};
	},
	computed: {
		groupLegend() {
			if (this.group && this.group.legend) {
				return this.group.legend;
			}
		},
		groupRowClasses() {
			// TODO find a way to detect errors in child to add some classes (error/valid/etc)
			let baseClasses = {
				"field-group": true
			};
			if (!isNil(this.group)) {
				baseClasses = this.getStyleClasses(this.group, baseClasses);
			}
			return baseClasses;
		}
	},
	methods: {
		// Get visible prop of field
		fieldVisible(field) {
			if (isFunction(field.visible)) {
				return field.visible.call(this, this.model, field, this);
			}

			if (isNil(field.visible)) {
				return true;
			}

			return field.visible;
		},

		getGroupTag(field) {
			if (!isNil(field.tag)) {
				return field.tag;
			} else {
				return this.tag;
			}
		}
	},
	created() {
		this.eventBus.$on("field-validated", () => {
			this.$nextTick(() => {
				let containFieldWithError = this.$refs.group.querySelector(".form-element.error") !== null;
				this.validationClass = {
					[objGet(this.options, "validationErrorClass", "error")]: containFieldWithError,
					[objGet(this.options, "validationSuccessClass", "valid")]: !containFieldWithError
				};
			});
		});
	}
};
</script>
