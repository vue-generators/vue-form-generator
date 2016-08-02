<template lang="jade">
	multiselect(
		:id="schema.selectOptions.id", 
		:options="options",
		:multiple="schema.multiSelect", 
		:selected="value", 
		:key="schema.selectOptions.key || null", 
		:label="schema.selectOptions.label || null", 
		:searchable="schema.selectOptions.searchable", 
		:clear-on-select="schema.selectOptions.clearOnSelect", 
		:hide-selected="schema.selectOptions.hideSelected", 
		:placeholder="schema.placeholder", 
		:max-height="schema.selectOptions.maxHeight", 
		:allow-empty="schema.selectOptions.allowEmpty", 
		:reset-after="schema.selectOptions.resetAfter", 
		:close-on-select="schema.selectOptions.closeOnSelect", 
		:custom-label="schema.selectOptions.customLabel || null",
		:taggable="schema.selectOptions.taggable",
		:tag-placeholder="schema.selectOptions.tagPlaceholder",
		:max="schema.selectOptions.max",
		@update="updateSelected", 
		@select="onSelect", 
		@remove="onRemove", 
		@search-change="onSearchChange", 
		@tag="addTag", 
		@open="onOpen", 
		@close="onClose", 
		:show-labels="schema.selectOptions.showLabels"
		// TODO: add other options from multiSelectMixin
		)
</template>
<script>
import { isObject } from "lodash";
import abstractField from "./abstractField";
import Multiselect from 'vue-multiselect';

export default {
    mixins: [abstractField],
    components: {
        Multiselect
    },
    computed: {
        options() {
            let values = this.schema.values;
            if (typeof(values) == "function") {
                return values.apply(this, [this.model, this.schema]);
            } else {
                return values;
            }
        }
    },

    methods: {
        updateSelected(value, id) {
            this.value = value;
        },
        onSelect(selectedOption, id) {
            console.log("onSelect", selectedOption, id)
        },
        onRemove(removedOption, id) {
            console.log("onRemove", removedOption, id)
        },
        onSearchChange(searchQuery, id) {
            console.log("onSearchChange", searchQuery, id)
        },
        addTag(newTag, id) {
            console.log("addTag", newTag, id);
            // TODO: implement tag object by sending this function into schema definition
			/* const tag = {
                name: newTag,
                // Just for example needs as we use Array of Objects that should have other properties filled.
                // For primitive values you can simply push the tag into options and selected arrays.
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }*/
            this.options.push(newTag)
            this.value.push(newTag)
        },
        onOpen(id) {
            console.log("onOpen", id)
        },
        onClose(value, id) {
            console.log("onClose", value, id)
        },
    }
};
</script>
