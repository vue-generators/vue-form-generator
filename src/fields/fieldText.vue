<template lang="jade">
    div.input-wrapper(v-if="schema.leftText || schema.rightText" class="clearfix")
        label.left(v-if="schema.leftText" class="left fl") {{ schema.leftText }}
        input.form-control(class="left fl" type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :maxlength="schema.max", :pattern="schema.pattern", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
        label.right(class="fl" v-if="schema.rightText") {{ schema.rightText }}
    input.form-control(v-else type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :maxlength="schema.max", :pattern="schema.pattern", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ]
	};
	
</script>

<style lang="sass">
	.vue-form-generator .input-wrapper {
		label {
			line-height: 48px;
		}
		input[type=text] {
			width: 50%;
		}
	}
</style>
