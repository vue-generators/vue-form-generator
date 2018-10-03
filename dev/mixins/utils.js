export default {
	computed: {
		prettyModel() {
			return JSON.stringify(this.model, null, 4);
		}
	}
};
