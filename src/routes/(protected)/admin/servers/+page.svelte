<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';

	import ServerPlus from 'svelte-material-icons-generator/svelte-material-icons/ServerPlus.svelte';
	import ServerNetwork from 'svelte-material-icons-generator/svelte-material-icons/ServerNetwork.svelte';

	export let data: PageData;

	const serversDataHandler = new DataHandler(data.servers, { rowsPerPage: 10 });
	const servers = serversDataHandler.getRows();
</script>

<div class="grid grid-cols-2 p-4">
	<h1>Servers</h1>
	{#if data.servers.length}
		<div class="text-right">
			<a href="servers/create" class="btn btn-sm variant-soft-primary w-min rounded-md">
				<ServerPlus size={24} />
				New Server
			</a>
		</div>
	{/if}
</div>
<hr class="mx-2" />
<section class="p-4">
	{#if data.servers.length}
		<Datatable handler={serversDataHandler}>
			<table aria-describedby="servers-header" class="table table-hover">
				<thead>
					<tr>
						<Th handler={serversDataHandler} orderBy="id">ID</Th>
						<Th handler={serversDataHandler} orderBy="name">Name</Th>
						<Th handler={serversDataHandler} orderBy="hostname">Hostname</Th>
						<Th handler={serversDataHandler} orderBy="port">Port</Th>
						<Th handler={serversDataHandler} orderBy="createdAt">Created At</Th>
						<Th handler={serversDataHandler} orderBy="updatedAt">Updated At</Th>
					</tr>
				</thead>
				<tbody>
					{#if $servers}
						{#each $servers as server}
							<tr>
								<td><a href="/admin/servers/{server.id}">{server.id}</a></td>
								<td>{server.name}</td>
								<td>{server.hostname}</td>
								<td>{server.port}</td>
								<td>{server.createdAt.toDateString()}</td>
								<td>{server.updatedAt.toDateString()}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</Datatable>
	{:else}
		<div class="justify-center items-center text-center">
			<div class="mx-auto w-min">
				<ServerNetwork size={48} />
			</div>
			<h3 class="mt-2 text-sm font-semibold text-token">No servers</h3>
			<p class="mt-1 text-sm text-surface-500-400-token">Get started by creating a new server.</p>
			<div class="mt-6">
				<a href="servers/create" class="btn btn-sm variant-soft-primary">
					<ServerPlus size={24} />
					New Server
				</a>
			</div>
		</div>
	{/if}
</section>
