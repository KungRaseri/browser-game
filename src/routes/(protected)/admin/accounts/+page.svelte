<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';

	import AccountPlus from 'svelte-material-icons-generator/svelte-material-icons/AccountPlus.svelte';
	import Account from 'svelte-material-icons-generator/svelte-material-icons/Account.svelte';

	export let data: PageData;

	const accountsDataHandler = new DataHandler(data.accounts, { rowsPerPage: 10 });
	const accounts = accountsDataHandler.getRows();
</script>

<div class="grid grid-cols-2 p-4">
	<h1>Accounts</h1>
</div>
<hr class="mx-2" />
<section class="p-4">
	{#if data.accounts.length}
		<Datatable handler={accountsDataHandler}>
			<table aria-describedby="accounts-header" class="table table-hover">
				<thead>
					<tr>
						<Th handler={accountsDataHandler} orderBy="id">ID</Th>
						<Th handler={accountsDataHandler} orderBy="email">Email</Th>
						<Th handler={accountsDataHandler} orderBy="role">Role</Th>
						<Th handler={accountsDataHandler} orderBy="createdAt">Created At</Th>
						<Th handler={accountsDataHandler} orderBy="updatedAt">Updated At</Th>
					</tr>
				</thead>
				<tbody>
					{#if $accounts}
						{#each $accounts as account}
							<tr>
								<td><a href="/admin/accounts/{account.id}">{account.id}</a></td>
								<td>{account.email}</td>
								<td>{account.role}</td>
								<td>{account.createdAt.toDateString()}</td>
								<td>{account.updatedAt.toDateString()}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</Datatable>
	{:else}
		<div class="justify-center items-center text-center">
			<div class="mx-auto w-min">
				<Account size={48} />
			</div>
			<h3 class="mt-2 text-sm font-semibold text-token">No servers</h3>
			<p class="mt-1 text-sm text-surface-500-400-token">Get started by creating a new server.</p>
			<div class="mt-6">
				<a href="servers/create" class="btn btn-sm variant-soft-primary">
					<AccountPlus size={24} />
					New Server
				</a>
			</div>
		</div>
	{/if}
</section>
