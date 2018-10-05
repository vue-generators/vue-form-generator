import Vue from "vue";

import VueFormGenerator from "@";
import {
	fieldCheckbox,
	fieldChecklist,
	fieldInput,
	fieldLabel,
	fieldRadios,
	fieldSelect,
	fieldSubmit,
	fieldTextArea,
	fieldUpload,
	fieldCleave,
	fieldDateTimePicker,
	fieldGoogleAddress,
	fieldImage,
	fieldMasked,
	fieldNoUiSlider,
	fieldPikaday,
	fieldRangeSlider,
	fieldSelectEx,
	fieldSpectrum,
	fieldStaticMap,
	fieldSwitch,
	fieldVueMultiSelect
} from "@/utils/fieldsLoader.js";
// Test custom field
import fieldAwesome from "./fieldAwesome.vue";

Vue.use(VueFormGenerator, {
	fields: [
		fieldAwesome,
		fieldCheckbox,
		fieldChecklist,
		fieldInput,
		fieldLabel,
		fieldRadios,
		fieldSelect,
		fieldSubmit,
		fieldTextArea,
		fieldUpload,
		fieldCleave,
		fieldDateTimePicker,
		fieldGoogleAddress,
		fieldImage,
		fieldMasked,
		fieldNoUiSlider,
		fieldPikaday,
		fieldRangeSlider,
		fieldSelectEx,
		fieldSpectrum,
		fieldStaticMap,
		fieldSwitch,
		fieldVueMultiSelect
	]
});

import VueHighlightJS from "vue-highlightjs";
Vue.use(VueHighlightJS);

import App from "./app.vue";

new Vue({
	render: (h) => h(App)
}).$mount("#app");
