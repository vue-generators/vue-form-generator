<template lang="pug">
    div
        template(v-for='group in groups'  v-if="groupVisible(group)")
            drawer(v-if="groupFoldable(group)", :group="group", :model="model")
                fieldset(slot="title")
                    legend {{ group.legend }}
                template(slot="content")
                    fieldset(:is='tag', :id="group.id")
                        template(v-for='field in group.fields')
                            form-field(v-if='fieldVisible(field)', :vfg="vfg", :field="field", :errors="errors", :model="model", :options="options", @validated="onFieldValidated", @model-updated="onModelUpdated")
                    form-group(:options="options", :tag="tag", :groups="group.groups", :model="model", :vfg="vfg", @validated="onFieldValidated", @model-updated="onModelUpdated")
            div(v-else)
                fieldset(:is='tag', :class='getFieldRowClasses(group)', :id="group.id")
                    legend(v-if='group.legend') {{ group.legend }}
                    template(v-for='field in group.fields')
                        form-field(v-if='fieldVisible(field)', :vfg="vfg", :field="field", :errors="errors", :model="model", :options="options", @validated="onFieldValidated", @model-updated="onModelUpdated")
                    form-group(:options="options", :tag="tag", :groups="group.groups", :model="model", :vfg="vfg", @validated="onFieldValidated", @model-updated="onModelUpdated")
</template>

<script>
import { get as objGet, forEach, isFunction, isNil, isArray } from "lodash";
import drawer from "./drawer";
import formMixin from "./formMixin.js";
import formField from "./formField.vue";

export default {
	name: "form-group",
	components: { drawer, formField },
	mixins: [formMixin],
	props: {
		vfg: Object,
		model: Object,
		groups: Array,
		tag: String,
		options: Object
	},
	data() {
		return {
			errors: [] // Validation errors
		};
	},
	methods: {
		fieldVisible(field) {
			if (isFunction(field.visible)) return field.visible.call(this, this.model, field, this);

			if (isNil(field.visible)) return true;

			return field.visible;
		},
		groupVisible(group) {
			return this.fieldVisible(group);
		},

		groupFoldable(group) {
			if (isFunction(group.foldable)) return group.foldable.call(this, this.model, group, this);

			if (isNil(group.foldable)) return false;

			return group.foldable;
		},
		onFieldValidated(value) {
			this.$emit("onFieldValidated", value);
		},
		onModelUpdated(value) {
			this.$emit("onModelUpdated", value);
		}
	}
};
</script>

<style lang="scss">
</style>