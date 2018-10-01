<template>
	<div class="container">
		<h1>Picker</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<pre v-highlightjs="prettyModel"><code class="json"></code></pre>
			</div>
		</div>
	</div>
</template>

<script>
import mixinUtils from "../../mixins/utils.js";

export default {
	mixins: [mixinUtils],

	data() {
		return {
			model: {},

			schema: {
				fields: [
					{
						type: "dateTimePicker",
						label: "DT",
						model: "dt",
						dateTimePickerOptions: {
							format: "YYYY-MM-DD HH:mm:ss"
						}
					}
				]
			},

			formOptions: {}
		};
	},

	created() {
		window.app = this;
	}
};
</script>

<style lang="scss">
@import "../../style.scss";
</style>
