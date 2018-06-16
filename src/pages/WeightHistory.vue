<template>
	<div>
		<h1>Weight history</h1>
		<table id="weight_table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Weight</th>
					<!-- <th>Weight difference</th>
					<th>Total weight lost</th> -->
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</template>

<script>
import $ from "jquery";
import "datatables.net";
import moment from "moment";

export default {
	mounted() {
		this.renderTable();
	},
	computed: {
		tableData() {
			return this.$store.getters.getTableData;
		}
	},
	methods: {
		renderTable() {
			$("#weight_table").dataTable({
				searching: false,
				data: this.tableData,
				deferRender: true,
				scrollY: 200,
				scrollCollapse: true,
				scroller: true,
				info: false,
				paging: false,
				columns: [
					{
						data: "timeStamp",
						render: datum => moment(datum).format("L")
					},
					{
						data: "weight"
					}//,
					// { data: "weightDiff" },
					// { data: "weightLost" }
				]
			});
		}
	}
}
</script>

<style lang="less">
	@import "../styles/general.less";

	.table-entry() {
		.standard-font;
		border-left: @table-border;
		background-color: @table-background-color;
		padding: 4px;
		text-align: center;
	}

	#weight_table_wrapper {
		margin: 32px;
	}

	#weight_table, .dataTable {
		border-spacing: 0px;
		width: 400px;
		border: @table-border;
	}

	.dataTable {
		border-bottom: 0;
	}

	.dataTables_length label {
		width: 100%;
	}

	#weight_table td, .dataTable th {
		.table-entry;
		
		&:first-child {
			border-left: none;
		}
	}
</style>

