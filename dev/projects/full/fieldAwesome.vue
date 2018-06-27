<template lang="pug">
	input.form-control(type="text", v-model="value", :maxlength="schema.max", :readonly="schema.readonly", :disabled="disabled", :placeholder="schema.placeholder")
</template>

<script>
import VueFormGenerator from "../../../src";

export default {
	mixins: [VueFormGenerator.abstractField]
};
</script>

<style lang="scss" scoped>
input {
	background-color: lighten(blue, 40%) !important;
	font-weight: bold;
}
</style>
