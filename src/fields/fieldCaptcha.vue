<template lang="jade">
	.captcha-container
		input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :maxlength="schema.max", :pattern="schema.pattern", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
		img(:src='src')
		span(@click='refresh()') 看不清楚? 换一个
</template>

<script>
	import abstractField from './abstractField';
	import isFunction from 'lodash/isFunction';

	export default {
		mixins: [ abstractField ],

		data: function() {
			return {
				src: ''
			}
		},

		mounted: function() {
			this.refresh()
		},

		methods: {
			refresh() {
				if (isFunction(this.schema.refresh)) {
					this.src = this.schema.refresh();
				}
			}
		}
	};

</script>

<style lang="sass">
	.vue-form-generator .captcha-container {
	    span {
		    cursor: pointer;
	    }
	}
</style>