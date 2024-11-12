<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';

	import ServerPlus from 'svelte-material-icons-generator/svelte-material-icons/ServerPlus.svelte';
	import ServerNetwork from 'svelte-material-icons-generator/svelte-material-icons/ServerNetwork.svelte';

	export let data: PageData;

	const tilesDataHandler = new DataHandler(data.tiles, { rowsPerPage: 10 });
	const tiles = tilesDataHandler.getRows();
</script>

<div class="grid grid-cols-2 p-4">
	<h1>Tiles</h1>
</div>
<hr class="mx-2" />
<section class="p-4">
	{#if data.tiles.length}
		<Datatable handler={tilesDataHandler}>
			<table aria-describedby="tiles-header" class="table table-hover">
				<thead>
					<tr>
						<Th handler={tilesDataHandler} orderBy="id">ID</Th>
						<Th handler={tilesDataHandler} orderBy="Region">Region</Th>
						<Th handler={tilesDataHandler} orderBy="type">Type</Th>
					</tr>
				</thead>
				<tbody>
					{#if $tiles}
						{#each $tiles as tile}
							<tr>
								<td><a href="/admin/tiles/{tile.id}">{tile.id}</a></td>
								<td>[{tile.Region.xCoord}, {tile.Region.yCoord}]</td>
								<td>{tile.type}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</Datatable>
	{:else}
		<div class="justify-center items-center text-center">
			<h3 class="mt-2 text-sm font-semibold text-token">No tiles</h3>
		</div>
	{/if}
</section>
