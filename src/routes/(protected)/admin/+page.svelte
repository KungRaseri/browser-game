<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="grid grid-cols-2 p-4">
	<h1 class="h1">Admin Dashboard</h1>
	<p class="text-sm text-right">Welcome, {$page.data.account.email}</p>
</header>
<hr />
<section class="p-4">
	<div class="card">
		<header class="card-header">
			<h1 class="h1">Details</h1>
		</header>
		<section class="p-4">
			{#each data.servers as server}
				<div class="card">
					<header class="card-header">{`${server.name} [${server.id}]`}</header>
					<section class="p-4" />
				</div>
			{/each}
		</section>
		<footer class="card-footer">
			
		</footer>
	</div>
</section>

<footer />
