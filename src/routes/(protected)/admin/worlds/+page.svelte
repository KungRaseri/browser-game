<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';

	import WebPlus from 'svelte-material-icons-generator/svelte-material-icons/WebPlus.svelte';
	import Web from 'svelte-material-icons-generator/svelte-material-icons/Web.svelte';

	export let data: PageData;

	const worldsDataHandler = new DataHandler(data.worlds, { rowsPerPage: 10 });
	const worlds = worldsDataHandler.getRows();
</script>

<div class="grid grid-cols-2 p-4">
	<h1>Worlds</h1>
	{#if data.worlds.length}
		<div class="text-right">
			<a href="worlds/create" class="btn btn-sm variant-soft-primary w-min rounded-md">
				<WebPlus size={24} />
				New World
			</a>
		</div>
	{/if}
</div>
<hr class="mx-2" />
<section class="p-4">
	{#if data.worlds.length}
		<Datatable handler={worldsDataHandler}>
			<table aria-describedby="worlds-header" class="table table-hover">
				<thead>
					<tr>
						<Th handler={worldsDataHandler} orderBy="id">ID</Th>
						<Th handler={worldsDataHandler} orderBy="name">Name</Th>
						<Th handler={worldsDataHandler} orderBy="serverId">Server ID</Th>
						<Th handler={worldsDataHandler} orderBy="createdAt">Created At</Th>
						<Th handler={worldsDataHandler} orderBy="updatedAt">Updated At</Th>
					</tr>
				</thead>
				<tbody>
					{#if $worlds}
						{#each $worlds as world}
							<tr>
								<td><a href="/admin/worlds/{world.id}">{world.id}</a></td>
								<td>{world.name}</td>
								<td>{world.serverId}</td>
								<td>{world.createdAt.toDateString()}</td>
								<td>{world.updatedAt.toDateString()}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</Datatable>
	{:else}
		<div class="justify-center items-center text-center">
			<div class="mx-auto w-min">
				<Web size={48} />
			</div>
			<h3 class="mt-2 text-sm font-semibold text-token">No worlds</h3>
			<p class="mt-1 text-sm text-surface-500-400-token">Get started by creating a new world.</p>
			<div class="mt-6">
				<a href="worlds/create" class="btn btn-sm variant-soft-primary">
					<WebPlus size={24} />
					New World
				</a>
			</div>
		</div>
	{/if}
</section>
