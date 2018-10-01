import Vue from "vue";
import VueFormGenerator from "../../../src";
Vue.use(VueFormGenerator);

import App from "./app.vue";

new Vue({
	render: (h) => h(App)
}).$mount("#app");
