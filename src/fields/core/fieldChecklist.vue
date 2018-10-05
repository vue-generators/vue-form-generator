<template>
	<div class="wrapper"
		v-attributes="'wrapper'">
		<div class="listbox form-control"
			v-if="useListBox"
			:disabled="disabled">
			<div class="list-row"
				v-for="item in items"
				:key="getItemValue(item)"
				:class="{'is-checked': isItemChecked(item)}">
				<label>
					<input :id="fieldID"
						type="checkbox"
						:checked="isItemChecked(item)"
						:disabled="disabled"
						@change="onChanged($event, item)"
						:name="getInputName(item)"
						v-attributes="'input'">{{ getItemName(item) }}
				</label>
			</div>
		</div>
		<div class="combobox form-control"
			v-if="!useListBox"
			:disabled="disabled">
			<div class="mainRow"
				@click="onExpandCombo"
				:class="{ expanded: comboExpanded }">
				<div class="info"> {{ selectedCount }} selected</div>
				<div class="arrow"></div>
			</div>

			<div class="dropList">
				<div class="list-row"
					v-if="comboExpanded"
					v-for="item in items"
					:key="getItemValue(item)"
					:class="{'is-checked': isItemChecked(item)}">
					<label>
						<input :id="fieldID"
							type="checkbox"
							:checked="isItemChecked(item)"
							:disabled="disabled"
							@change="onChanged($event, item)"
							:name="getInputName(item)"
							v-attributes="'input'" >
						{{ getItemName(item) }}
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { isObject, isNil, clone } from "lodash";
import abstractField from "../abstractField";
import { slugify } from "../../utils/schema";

export default {
	name: "field-checklist",
	mixins: [abstractField],

	data() {
		return {
			comboExpanded: false
		};
	},

	computed: {
		items() {
			let values = this.schema.values;
			if (typeof values == "function") {
				return values.apply(this, [this.model, this.schema]);
			} else return values;
		},
		selectedCount() {
			if (this.value) return this.value.length;

			return 0;
		},
		useListBox() {
			return this.fieldOptions.listBox;
		}
	},

	methods: {
		getInputName(item) {
			if (this.inputName && this.inputName.length > 0) {
				return slugify(this.inputName + "_" + this.getItemValue(item));
			}
			return slugify(this.getItemValue(item));
		},

		getItemValue(item) {
			if (isObject(item)) {
				if (typeof this.fieldOptions["value"] !== "undefined") {
					return item[this.fieldOptions.value];
				} else {
					if (typeof item["value"] !== "undefined") {
						return item.value;
					} else {
						throw "`value` is not defined. If you want to use another key name, add a `value` property under `fieldOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},
		getItemName(item) {
			if (isObject(item)) {
				if (typeof this.fieldOptions["name"] !== "undefined") {
					return item[this.fieldOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `fieldOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},

		isItemChecked(item) {
			return this.value && this.value.indexOf(this.getItemValue(item)) !== -1;
		},

		onChanged(event, item) {
			let isChecked = event.target.checked;
			if (isNil(this.value) || !Array.isArray(this.value)) {
				this.value = [];
			}

			if (isChecked) {
				// Note: If you modify this.value array, it won't trigger the `set` in computed field
				const arr = clone(this.value);
				arr.push(this.getItemValue(item));
				this.value = arr;
			} else {
				// Note: If you modify this.value array, it won't trigger the `set` in computed field
				const arr = clone(this.value);
				arr.splice(this.value.indexOf(this.getItemValue(item)), 1);
				this.value = arr;
			}
		},

		onExpandCombo() {
			this.comboExpanded = !this.comboExpanded;
		}
	}
};
</script>


<style lang="scss">
.vue-form-generator .field-checklist {
	.listbox,
	.dropList {
		height: auto;
		max-height: 150px;
		overflow: auto;

		.list-row {
			label {
				font-weight: initial;
			}

			input {
				margin-right: 0.3em;
			}
		}
	}

	.combobox {
		height: initial;
		overflow: hidden;

		.mainRow {
			cursor: pointer;
			position: relative;
			padding-right: 10px;

			.arrow {
				position: absolute;
				right: -9px;
				top: 3px;
				width: 16px;
				height: 16px;

				transform: rotate(0deg);
				transition: transform 0.5s;

				background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGdJREFUOI3tzjsOwjAURNGDUqSgTxU5K2AVrJtswjUsgHSR0qdxAZZFPrS+3ZvRzBsqf9MUtBtazJk+oMe0VTriiZCFX8nbpENMgfARjsn74vKj5IFruhfc8d6zIF9S/Hyk5HS4spMVeFcOjszaOwMAAAAASUVORK5CYII=");
				background-repeat: no-repeat;
			}

			&.expanded {
				.arrow {
					transform: rotate(-180deg);
				}
			}
		}

		.dropList {
			transition: height 0.5s;
			//margin-top: 0.5em;
		}
	}
}
</style>
