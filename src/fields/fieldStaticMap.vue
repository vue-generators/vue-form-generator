<template lang="jade">
	img(:src="mapLink")
</template>

<script>
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],

		computed: {
			mapLink() {
				if (this.model.address && this.model.address.geo)
					return `http://maps.googleapis.com/maps/api/staticmap?center=${this.model.address.geo.lat},${this.model.address.geo.lng}&zoom=8&scale=false&size=800x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${this.model.address.city}`;
			}
		}
	};
</script>

<style lang="sass" scoped>
	img {
		display: block;
		width: auto;
		max-width: 100%;
	}
</style>
