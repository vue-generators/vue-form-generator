<template>
	<multiselect
		:id="fieldOptions.id"
		:options="options"
		:value="value"
		:multiple="fieldOptions.multiple"
		:track-by="fieldOptions.trackBy || null"
		:label="fieldOptions.label || null"
		:searchable="fieldOptions.searchable"
		:clear-on-select="fieldOptions.clearOnSelect"
		:hide-selected="fieldOptions.hideSelected"
		:placeholder="placeholder"
		:allow-empty="fieldOptions.allowEmpty"
		:reset-after="fieldOptions.resetAfter"
		:close-on-select="fieldOptions.closeOnSelect"
		:custom-label="customLabel"
		:taggable="fieldOptions.taggable"
		:tag-placeholder="fieldOptions.tagPlaceholder"
		:max="fieldOptions.max || null"
		:options-limit="fieldOptions.optionsLimit"
		:group-values="fieldOptions.groupValues"
		:group-label="fieldOptions.groupLabel"
		:block-keys="fieldOptions.blockKeys"
		:internal-search="fieldOptions.internalSearch"
		:select-label="fieldOptions.selectLabel"
		:selected-label="fieldOptions.selectedLabel"
		:deselect-label="fieldOptions.deselectLabel"
		:show-labels="fieldOptions.showLabels"
		:limit="fieldOptions.limit"
		:limit-text="fieldOptions.limitText"
		:loading="fieldOptions.loading"
		:disabled="disabled"
		:max-height="fieldOptions.maxHeight"
		:show-pointer="fieldOptions.showPointer"
		@input="updateSelected"
		@select="onSelect"
		@remove="onRemove"
		@search-change="onSearchChange"
		@tag="addTag"
		@open="onOpen"
		@close="onClose"
		:option-height="fieldOptions.optionHeight">
		<span slot="noResult">
			{{ fieldOptions.noResult }}
		</span>
	</multiselect>
</template>
<script>
import abstractField from "../abstractField";

export default {
	name: "field-vueMultiSelect",
	mixins: [abstractField],
	computed: {
		options() {
			let values = this.schema.values;
			if (typeof values == "function") {
				return values.apply(this, [this.model, this.schema]);
			} else {
				return values;
			}
		},
		customLabel() {
			if (
				typeof this.fieldOptions.customLabel !== "undefined" &&
				typeof this.fieldOptions.customLabel === "function"
			) {
				return this.fieldOptions.customLabel;
			} else {
				// this will let the multiselect library use the default behavior if customLabel is not specified
				return undefined;
			}
		}
	},
	methods: {
		updateSelected(value /* , id*/) {
			this.value = value;
		},
		addTag(newTag, id) {
			let onNewTag = this.fieldOptions.onNewTag;
			if (typeof onNewTag == "function") {
				onNewTag(newTag, id, this.options, this.value);
			}
		},
		onSearchChange(searchQuery, id) {
			let onSearch = this.fieldOptions.onSearch;
			if (typeof onSearch == "function") {
				onSearch(searchQuery, id, this.options);
			}
		},
		onSelect(/* selectedOption, id */) {
			// console.log("onSelect", selectedOption, id);
		},
		onRemove(/* removedOption, id */) {
			// console.log("onRemove", removedOption, id);
		},
		onOpen(/* id */) {
			// console.log("onOpen", id);
		},
		onClose(/* value, id */) {
			// console.log("onClose", value, id);
		}
	},
	created() {
		// Check if the component is loaded globally
		if (!this.$root.$options.components["multiselect"]) {
			console.error(
				"'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!"
			);
		}
	}
};
</script>
