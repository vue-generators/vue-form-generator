<template>
	<div class="container">
		<h1>Dev Project</h1>
		<ul>
			<li v-for="link in devProject" :key="link" >
				<a :href="'/' + link" v-text="link"></a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "index",
	data() {
		return {
			devProject: JSON.parse(process.env.VUE_APP_DEV_PROJECT)
		};
	}
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
