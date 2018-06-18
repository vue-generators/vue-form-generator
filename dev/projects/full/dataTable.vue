<template lang="pug">
	table.table.table-hover.table-bordered
		thead
			tr
				th ID
				th Name
				th E-mail
				th Country
				th Role
				th Status

		tbody
			tr(v-for="row in rows", @click="select($event, row)", :class="{ active: isSelected(row) }")
				td {{ row.id }}
				td
					img(:src="row.avatar")
					| {{ row.firstName + " " + row.lastName }} ({{row.userName}})
					.label.label-warning(v-if="!row.status") Inactive
				td {{ row.email }}
				td(v-if="row.address") {{ row.address.country }}
				td {{ getRoleName(row) }}
				td
					i.fa(:class=" row.status? 'fa-check' : 'fa-ban' ")
</template>

<script>
import { find } from "lodash";
import { roles } from "./data";

export default {
	props: ["rows", "selected", "select"],

	methods: {
		isSelected(row) {
			return this.selected.indexOf(row) !== -1;
		},

		getRoleName(row) {
			let role = find(roles, role => role.id === row.role);
			return role ? role.name : "";
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	tr {
		cursor: pointer;

		td {
			img {
				width: 32px;
				height: 32px;
				border-radius: 100%;
				margin-right: 0.4em;
			}
		}
	}
}
</style>
