$(function() {
	console.log($.fn.selectpicker);
	let App = require("./App.vue");

	new Vue({
		el: "body",
		components: {
			App
		}
	});
});