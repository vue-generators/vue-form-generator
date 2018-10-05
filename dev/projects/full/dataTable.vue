<template>
	<table class="table table-hover table-bordered">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Password </th>
				<th>Language</th>
				<th>Role</th>
				<th>Status</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(row, index) in rows"
				:key="index"
				@click="select($event, row)"
				:class="{ active: isSelected(row) }">
				<td>{{ row.id }}</td>
				<td>
					<img :src="row.avatar">
					{{ row.firstName + " " + row.lastName }} ({{ row.userName }})
					<div class="label label-warning"
						v-if="!row.status"> Inactive</div>
				</td>
				<td>{{ row.password }}</td>
				<td>{{ row.language }}</td>
				<td>{{ getRoleName(row) }}</td>
				<td>
					<i class="fa"
						:class="row.status? 'fa-check' : 'fa-ban'"></i>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { find } from "lodash";
import { roles } from "./data";

export default {
	props: {
		rows: {
			type: Array,
			default() {
				return [];
			}
		},
		selected: {
			type: Array,
			default() {
				return [];
			}
		},
		select: {
			type: Function,
			default() {
				return [];
			}
		}
	},

	methods: {
		isSelected(row) {
			return this.selected.indexOf(row) !== -1;
		},

		getRoleName(row) {
			let role = find(roles, (role) => role.id === row.role);
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
