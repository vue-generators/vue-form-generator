<template lang="jade">
	img(:src="mapLink")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],

		computed: {
			mapLink() {
				if (this.value && this.value.lat && this.value.lng)
					return `http://maps.googleapis.com/maps/api/staticmap?center=${this.value.lat},${this.value.lng}&zoom=8&scale=false&size=800x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000`;
			}
		}
	};
</script>

<style lang="sass">
	img {
		display: block;
		width: auto;
		max-width: 100%;
	}
</style>
