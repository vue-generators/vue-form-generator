<template lang="pug">
	input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName",  debounce="500", @focus="geolocate()", :id="getFieldID(schema)")
</template>

<script>
	/**
	 * Based on gocanto"s Google Autocomplete library
	 * https://github.com/gocanto/google-autocomplete
	 */

	import abstractField from "../abstractField";
	import { isFunction } from "lodash";

	/* global google */
	export default {
		mixins: [ abstractField ],

		data: function ()
		{
			return {
				//google autocomplete object
				"autocomplete": "",

				//google inputs retrieved
				"inputs": {
					street_number: "long_name",
					route: "long_name",
					country: "long_name",
					administrative_area_level_1: "long_name",
					administrative_area_level_2: "long_name",
					locality: "long_name",
					postal_code: "short_name"
				}
			};
		},

		mounted() {
			this.$nextTick(function () {
				if (window.google && window.google.maps && window.google.maps.places && window.google.maps.places.Autocomplete) {
					this.autocomplete = new google.maps.places.Autocomplete(this.$el,	{
						types: ["geocode"]
					});

					this.autocomplete.addListener("place_changed", this.pipeAddress);
				} else {
					console.warn("Google Maps API is missing. Please add https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places script in the HTML head section!");
				}
			});
		},

		methods: {
			/**
			 * Look up places and dispatch an event.
			 * @return void
			 */
			pipeAddress: function () {

				let place = this.autocomplete.getPlace();
				if (place) {

					this.value = place.formatted_address;

					let data  = {};
					if (place.address_components !== undefined) {
						for (let i = 0; i < place.address_components.length; i++) {
							let input = place.address_components[i].types[0];
							if (this.inputs[input]) {
								data[input] = place.address_components[i][this.inputs[input]];
							}
						}

					}

					// Call event in schema
					if (isFunction(this.schema.onPlaceChanged))
						this.schema.onPlaceChanged(this.value, data, place, this.model, this.schema);
				}
			},

			/**
			 * Get the user location.
			 * @return void
			 */
			geolocate: function(){

				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((position) => {

						let geolocation = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};

						let circle = new window.google.maps.Circle({
							center: geolocation,
							radius: position.coords.accuracy
						});

						this.autocomplete.setBounds(circle.getBounds());
					});
				}
			}
		}
	};
</script>

<style lang="sass">
</style>
