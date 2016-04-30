<template lang="jade">
	table.table.table-hover.table-bordered
		thead
			tr
				th ID
				th Name
				th E-mail
				th Country

		tbody
			tr(v-for="row in rows", @click="select($event, row)", :class="{ active: isSelected(row) }")
				td {{ row.id }}
				td 
					| {{ row.name }} 
					.label.label-warning(v-if="!row.status") Inactive
				td {{ row.email }}
				td {{ row.address.country }}
</template>

<script>
	import Vue from "vue";
	import VueFormGenerator from "../src";
	import Schema from "./schema";
	import { users } from "./data";

	export default {
		props: [
			"rows",
			"selected",
			"select"
		],

		methods: {
			isSelected(row) {
				return this.selected.indexOf(row) != -1;
			}			
		}
	}
</script>

<style lang="sass" scoped>


	.table {
		tr {
			cursor: pointer;
		}
	}

</style>