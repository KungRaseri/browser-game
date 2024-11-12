<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';

	export let data: PageData;

	let plotsDataHandler = new DataHandler(data.plots, {
		rowsPerPage: 20
	});

	const plots = plotsDataHandler.getRows();
</script>

<div class="grid grid-cols-2 p-4">
	<h1>Plots</h1>
</div>
<hr class="mx-2" />
<section class="p-4">
	<Datatable handler={plotsDataHandler}>
		<table aria-describedby="plots-header" class="table table-hover">
			<thead>
				<tr>
					<Th handler={plotsDataHandler} orderBy="id">ID</Th>
					<Th handler={plotsDataHandler} orderBy="tileId">Tile ID</Th>
					<Th handler={plotsDataHandler} orderBy="area">Area</Th>
					<Th handler={plotsDataHandler} orderBy="solar">Solar</Th>
					<Th handler={plotsDataHandler} orderBy="wind">Wind</Th>
					<Th handler={plotsDataHandler} orderBy="food">Food</Th>
					<Th handler={plotsDataHandler} orderBy="water">Water</Th>
					<Th handler={plotsDataHandler} orderBy="wood">Wood</Th>
					<Th handler={plotsDataHandler} orderBy="stone">Stone</Th>
					<Th handler={plotsDataHandler} orderBy="ore">Ore</Th>
				</tr>
			</thead>
			<tbody>
				{#if $plots}
					{#each $plots as plot}
						<tr>
							<td><a href="/admin/plots/{plot.id}">{plot.id}</a></td>
							<td>{plot.tileId}</td>
							<td>{plot.area}</td>
							<td>{plot.solar}</td>
							<td>{plot.wind}</td>
							<td>{plot.food}</td>
							<td>{plot.water}</td>
							<td>{plot.wood}</td>
							<td>{plot.stone}</td>
							<td>{plot.ore}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</Datatable>
</section>
