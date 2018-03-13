<template lang="pug">
	span(:id="getFieldID(schema)", :class="schema.fieldClasses", v-attributes="'label'") {{ value }}
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>

<style lang="scss">
.vue-form-generator .field-label span {
	display: block;
	width: 100%;
	margin-left: 12px;
}
</style>
