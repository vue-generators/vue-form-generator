<template lang="pug">
	multiselect(
		:id="selectOptions.id",
		:options="options",
		:value="value",
		:multiple="selectOptions.multiple",
		:track-by="selectOptions.trackBy || null",
		:label="selectOptions.label || null",
		:searchable="selectOptions.searchable",
		:clear-on-select="selectOptions.clearOnSelect",
		:hide-selected="selectOptions.hideSelected",
		:placeholder="schema.placeholder",
		:allow-empty="selectOptions.allowEmpty",
		:reset-after="selectOptions.resetAfter",
		:close-on-select="selectOptions.closeOnSelect",
		:custom-label="customLabel",
		:taggable="selectOptions.taggable",
		:tag-placeholder="selectOptions.tagPlaceholder",
		:max="schema.max || null",
		:options-limit="selectOptions.optionsLimit",
		:group-values="selectOptions.groupValues",
		:group-label="selectOptions.groupLabel",
		:block-keys="selectOptions.blockKeys",
		:internal-search="selectOptions.internalSearch",
		:select-label="selectOptions.selectLabel",
		:selected-label="selectOptions.selectedLabel",
		:deselect-label="selectOptions.deselectLabel",
		:show-labels="selectOptions.showLabels",
		:limit="selectOptions.limit",
		:limit-text="selectOptions.limitText",
		:loading="selectOptions.loading",
		:disabled="disabled",
		:max-height="selectOptions.maxHeight",
		:show-pointer="selectOptions.showPointer",
		@input="updateSelected",
		@select="onSelect",
		@remove="onRemove",
		@search-change="onSearchChange",
		@tag="addTag",
		@open="onOpen",
		@close="onClose",
		:option-height="selectOptions.optionHeight",
	)
		span(slot="noResult").
			{{ selectOptions.noResult }}
</template>
<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],
	computed: {
		selectOptions() {
			return this.schema.selectOptions || {};
		},

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
				typeof this.schema.selectOptions !== "undefined" &&
				typeof this.schema.selectOptions.customLabel !== "undefined" &&
				typeof this.schema.selectOptions.customLabel === "function"
			) {
				return this.schema.selectOptions.customLabel;
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
			let onNewTag = this.selectOptions.onNewTag;
			if (typeof onNewTag == "function") {
				onNewTag(newTag, id, this.options, this.value);
			}
		},
		onSearchChange(searchQuery, id) {
			let onSearch = this.selectOptions.onSearch;
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
			console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
		}
	}
};
</script>
