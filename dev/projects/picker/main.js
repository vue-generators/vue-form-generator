import Vue from "vue";

import VueFormGenerator from "@";
import { fieldDateTimePicker } from "@/utils/fieldsLoader.js";
Vue.use(VueFormGenerator, {
	fields: [fieldDateTimePicker]
});

import VueHighlightJS from "vue-highlightjs";
Vue.use(VueHighlightJS);

import App from "./app.vue";

new Vue({
	render: (h) => h(App)
}).$mount("#app");
