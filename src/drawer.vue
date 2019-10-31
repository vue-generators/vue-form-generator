<template lang="pug">
	section.foldable-container
		.underline-hover(@click.prevent="toggle")
			.toggle
				template(v-if="opened")  
					| ▽  
				template(v-else) 
					| ▷  
			.title-container
				slot(name="title")
		slot(name="content" v-if="opened")
</template>

<script>
export default {
	mounted() {
		if (this.some) {
			this.opened = true;
		}
	},
	props: ["group", "model"],
	data() {
		return {
			opened: false
		};
	},
	methods: {
		toggle() {
			this.opened = !this.opened;
		},
		deepGet(keys) {
			let pos = this.model;
			for (let key of keys) {
				if (pos[key]) {
					pos = pos[key];
				} else {
					pos = false;
					break;
				}
			}
			return pos;
		}
	},
	computed: {
		some() {
			if (this.group && this.group.fields) {
				return this.group.fields.map((x) => this.deepGet(x.model.split("."))).some((x) => x);
			}
		}
	}
};
</script>

<style lang="scss">
</style>