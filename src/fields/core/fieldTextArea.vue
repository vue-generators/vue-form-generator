<template lang="pug">
	textarea.form-control(
		v-model="value",
		:id="getFieldID(schema)",
		:class="fieldClasses",
		:disabled="disabled",
		:maxlength="fieldOptions.max",
		:minlength="fieldOptions.min",
		:placeholder="placeholder",
		:readonly="readonly",
		:rows="fieldOptions.rows || 2",
		:name="inputName",
		v-attributes="'input'")
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>
