<template>
	<textarea class="form-control"
		v-model="value"
		:id="fieldID"
		:class="fieldClasses"
		:disabled="disabled"
		:maxlength="fieldOptions.max"
		:minlength="fieldOptions.min"
		:placeholder="placeholder"
		:required="required"
		:readonly="readonly"
		:rows="fieldOptions.rows || 2"
		:name="inputName"
		v-attributes="'input'"></textarea>
</template>

<script>
import abstractField from "../abstractField";

export default {
	name: "field-textArea",
	mixins: [abstractField]
};
</script>
